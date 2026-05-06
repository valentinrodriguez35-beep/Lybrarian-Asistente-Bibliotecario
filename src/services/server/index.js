import express from "express";
import logger from "morgan";
import { assistantRequest } from "./api/gemini/ai_logic.js";
import cors from "cors";

const port = process.env.PORT ?? 3000;
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(process.cwd() + "/public"));
app.use(cors())

app.post("/chat", async (req, res) => {
  let message_body = req.body.message;
  console.log("Mensaje ha llegado al back-end: " + message_body);
  //send message to AI
  const ai_result = await assistantRequest(message_body);
  if (!ai_result.success) {
    console.log(
      "IA no ha respondido correctamente | resultado vacio o indefinido.",
    );
    return res
      .status(500)
      .json({ error: "IA no ha respondido correctamente." });
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
    let ai_response = ai_result;
    console.log(ai_response);
  } catch (error) {
    console.error("JSON invalido: ", ai_result);
    return res
      .status(500)
      .json({ error: "IA no ha respondido correctamente." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

app.listen(port, () => {
  console.log(`Server corriendo en el puerto ${port}`);
});
