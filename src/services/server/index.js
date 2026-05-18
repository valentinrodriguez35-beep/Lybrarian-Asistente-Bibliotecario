import { generate_metadata, generate_response } from "./ai.js";
import { query_request } from "./koha.js";
import { sendEvent } from "../eventHandler.js";
import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.SERVER_PORT ?? 3000;
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(process.cwd() + "/public"));
app.use(cors());

app.get("/chat/stream", async (req, res) => {
  try{
    //SSE --> Set Headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); //Envio los headers al cliente

    const message_body = req.query.message;
    sendEvent(res, "status", {step: "Message Received"});
    if(!message_body){
      sendEvent(res, "status", {step: "Message Failure"});
      return res.end();
    }
    //Pipeline of functions
    //1.- Extraction of parameters
    sendEvent(res, "status", {step: "Extracting"});
    const ai_metadata = await generate_metadata(message_body, res);
    if(ai_metadata.error){
      sendEvent(res, "status", {step: "Extracting Failure"});
      return res.end();
    }
    //2.- Searching for coincidences
    sendEvent(res, "status", {step: "Searching"});
    const koha_request = await query_request(ai_metadata.response);
    if(koha_request.error){
      sendEvent(res, "status", {step: "Searching Failure"});
      return res.end();
    }
    //3.- Creating response
    sendEvent(res, "status", {step: "Responding"});
    const ai_response = await generate_response(message_body, ai_metadata.response, koha_request.response, res)
    if(ai_response.error){
      sendEvent(res, "status", {step: "Responding Failure"});
      return res.end();
    }
    //4.- Streaming Response by Chunks
    sendEvent(res, "status", {step: "Streaming Response"});
    for await (const chunk of ai_response.response.data){
      const streamed_chunk = chunk.text();
      sendEvent(res, "chunk", {text: streamed_chunk});
    }
    sendEvent(res, "status", {step: "Success"});
    sendEvent(res, "result", {item: koha_request.response});
    return res.end();  //End Streaming
  }catch(error){
    sendEvent(res, "status", {step: "Critical Failure"});
    return res.end();
  }
});

app.listen(port, () => {
  console.log(`Server corriendo en el puerto ${port}`);
});