import express from "express";
import logger from "morgan";
import { assistantRequest, aiResponse } from "./api/gemini/ai_logic.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT ?? 3000;
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(process.cwd() + "/public"));
app.use(cors());

app.post("/chat", async (req, res) => {
  const message_body = req.body.message;
  //send message to AI
  const ai_result = await assistantRequest(message_body);
  if (!ai_result.success) {
    return res.status(500).json({ response: "Fallo en Inteligencia Artificial"});
  }

  //Get data from AI response & send it to Koha's API to find coincidences
  try {
    const messageData = ai_result.data;
    const queryParams = buildQuery(messageData);

    //Fetch request to Koha API (Mocked)
    const kohaQuery = await fetch(
      `${process.env.KOHA_API_URL}/biblios/search?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if(!kohaQuery.ok){
      return res.status(500).json({ response: "Fallo en establecer conexion con Koha API [MOCKED]"});
    }
    //Send Koha query response to AI one again
    const kohaData = await kohaQuery.json();
    const ai_message = await aiResponse(message_body, messageData, kohaData.results);

    if(!ai_message.success){
      return res.status(500).json({response:"Fallo en comunicarse con Inteligencia Artificial"});
    }

    return res.json({
      response: ai_message.data,
      metadata: messageData,
    });
  } catch (error) {
    return res.status(500).json({ response: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server corriendo en el puerto ${port}`);
});

function buildQuery(message) {
  const queryParams = new URLSearchParams();
  const searchTerms = [message.title, message.theme].filter(Boolean).join(" ");
  if (searchTerms) queryParams.append("q", searchTerms);
  if (message.author) queryParams.append("author", message.author);
  if (message.isbn) queryParams.append("isbn", message.isbn);
  if (message.id) queryParams.append("biblionumber", message.id);

  return queryParams;
}
