import express from "express";
import logger from "morgan";
import { assistantRequest } from "./services/gemini-api/ai_logic.js";

const port = process.env.PORT ?? 3000;
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(process.cwd() + "/public"));

app.post("/chat", async (req, res) => {
  let message_body = req.body.message;
  console.log("Mensaje ha llegado al back-end: " + message_body);
  //send message to AI
  let ai_result = await assistantRequest(message_body);
  if (!ai_result) {
    console.log(
      "IA no ha respondido correctamente | resultado vacio o indefinido.",
    );
    return res
      .status(500)
      .json({ error: "IA no ha respondido correctamente." });
  }
  //send AI Json to Koha's API to find coincidences
  try {
    let ai_response = JSON.parse(ai_result);
    console.log(ai_response);
  } catch (error) {
    console.error("JSON invalido: ", ai_result);
    return res
      .status(500)
      .json({ error: "IA no ha respondido correctamente." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Server corriendo en el puerto ${port}`);
});
