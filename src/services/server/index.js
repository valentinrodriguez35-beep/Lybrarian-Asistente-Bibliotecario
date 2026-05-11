import express from "express";
import logger from "morgan";
import { assistantRequest, aiResponse } from "./api/gemini/ai_logic.js";
import cors from "cors";

const port = process.env.PORT ?? 3000;
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(process.cwd() + "/public"));
app.use(cors());

app.post("/chat", async (req, res) => {
  let message_body = req.body.message;
  console.log("Mensaje ha llegado al back-end: " + message_body);
  //send message to AI
  const ai_result = await assistantRequest(message_body);
  if (!ai_result.success) {
    throw new Error(
      "Fallo en generacion de resultado por la Inteligencia Artificial",
    );
  }

  //Get data from AI response
  const messageData = ai_result.data;
  if (messageData.is_ambiguous) {
    return res.json({
      response:
        "La consulta que haz realizado es muy ambigua para poder ser respondida de forma esclarecedora, ¿Podrías proporcionamre más información del material que buscas?",
      metadata: messageData,
    });
  }

  if (messageData.intent === "unsupported_request") {
    return res.json({
      response:
        "Lo siento. La consulta o respuesta que haz enviado se encuentra fuera del contexto de la aplicación.",
      metadata: messageData,
    });
  }
  //send AI Json to Koha's API to find coincidences
  try {
    const ai_response = ai_result;
    console.log("AI Response to question:" + ai_response);
    const queryParams = buildQuery(messageData);

    //Fetch request to Koha API (Mocked)
    const kohaQuery = await fetch(
      `http://localhost:4000/api/v1/biblios/search?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    //Send Koha query response to AI one again
    const kohaData = await kohaQuery.json();
    console.log("KOHA Response to query:" + kohaData);
    const ai_message = await aiResponse(message_body, messageData, kohaData);
    return res.json({
      response: ai_message.data,
      metadata: messageData,
    });
  } catch (error) {
    return res.status(500).json({ response: error.message });
  }
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

app.listen(port, () => {
  console.log(`Server corriendo en el puerto ${port}`);
});

function buildQuery(message) {
  const queryParams = new URLSearchParams();
  if (message.title) queryParams.append("q", message.title);
  if (message.author) queryParams.append("author", message.author);
  if (message.theme) queryParams.append("q", message.theme);
  if (message.isbn) queryParams.append("isbn", message.isbn);
  if (message.id) queryParams.append("biblionumber", message.id);

  return queryParams;
}
