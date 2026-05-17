import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";
import { sendEvent } from "../../../eventHandler.js";

dotenv.config();
const ai = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const alternative_schema = {
  type: "object",
  properties: {
    intent: {
      type: "string",
      enum: [
        "search_book",
        "check_availability",
        "general_question",
        "unsupported_request",]
    },
    title:{type: ["string", "null"]},
    author:{type: ["string", "null"]},
    theme:{type: ["string", "null"]},
    isbn:{type: ["string", "null"]},
    id:{type: ["string", "null"]},
    location:{type: ["string", "null"]},
    is_ambiguous:{type: "boolean"},
  },
  required: ["intent", "title", "author", "theme", "isbn", "id", "location", "is_ambiguous"],
};

const schema = {
  description:
    "Como asistente, deberas extraer la intencion y datos de la consulta que el usuario realiza",
  type: SchemaType.OBJECT,
  properties: {
    intent: {
      type: SchemaType.STRING,
      description: "Que es lo que el usuario necesita",
      nullable: true,
      enum: [
        "search_book",
        "check_availability",
        "general_question",
        "unsupported_request",
      ],
    },
    title: {
      type: SchemaType.STRING,
      nullable: true,
      description:
        "Titulo del material bibliográfico consultado por el usuario",
    },
    author: {
      type: SchemaType.STRING,
      nullable: true,
      description: "Autor del material bibliográfico consultado por el usuario",
    },
    theme: {
      type: SchemaType.STRING,
      nullable: true,
      description: "Tema del material bibliografico consultado por el usuario",
    },
    isbn: {
      type: SchemaType.STRING,
      nullable: true,
      description:
        "ISBN proveido por el usuario de longitud mayor o igual a 10 digitos",
    },
    id: {
      type: SchemaType.STRING,
      nullable: true,
      description:
        "(biblionumber) Identificador del material bibliografico consultado por el usuario",
    },
    location: {
      type: SchemaType.STRING,
      nullable: true,
      description:
        "Lugar, Biblioteca o sitio en general consultado por el usuario (Ejemplo: Biblioteca Central Tijuana)",
    },
    is_ambiguous: {
      type: SchemaType.BOOLEAN,
      description:
        "TRUE solo si la consulta realizada por el usuario es muy general, de manera que tiene muchas interpretaciones.",
    },
  },
  required: ["intent", "title", "author", "theme", "isbn", "id", "location", "is_ambiguous"],
};

const schema_prompt = (message) => { return `
  Extrae información de la siguiente consulta de biblioteca.
  Responde ÚNICAMENTE con el JSON solicitado, sin texto adicional.

  ### CONSULTA A PROCESAR
  ${message}
`};

const request = (message, metadata, resultsAbstract) => { return `
  Eres un bibliotecario virtual. Respondes siempre en español, formato Markdown, tono formal y amable.

  ### RESTRICCIONES
  - Sin saludos ni despedidas
  - Sin explicar el funcionamiento del sistema
  - Máximo 120 palabras

  ### RESPUESTA (seguir en orden estricto)
  1. METADATA.intent === "unsupported_request" → consulta fuera de contexto. Detente aquí.
  2. METADATA.is_ambiguous === true → solicita más información al usuario.
  3. RESULTADO_DE_CONSULTA vacío → sugiere títulos similares a la consulta.
  4. Default → presenta resultados: título, autor, ejemplares disponibles, ubicación.

  ### DATOS
  CONSULTA: ${message}
  METADATA: ${JSON.stringify(metadata)}
  RESULTADO_DE_CONSULTA: ${JSON.stringify(resultsAbstract)}
`;
}

const alternative_model = async (prompt, res) => {
  const model = await fetch("http://localhost:11434/api/generate",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      model: process.env.CUSTOM_MODEL ?? process.env.OLLAMA_MODEL ?? "lybrarian-assistant",
      prompt: prompt,
      stream: false,
      format: alternative_schema,
      options: {
        think: false,
        repeat_penalty: 1.3,
        temperature: 0.1,
        num_predict: 500,
      }
    })
  });

  if(!model.ok){
    sendEvent(res, "status", { step: "Alternative Failure"});
    throw new Error("Modelo Alternativo ha fallado");
  }
  const data = await model.json();
  return JSON.parse(data.response);
};

const alternative_model_stream = async function* (prompt, res){
    const model = await fetch("http://localhost:11434/api/generate",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      model: process.env.CUSTOM_MODEL ?? process.env.OLLAMA_MODEL ?? "lybrarian-assistant",
      prompt: prompt,
      stream: true,
      options: {
        think: false,
        repeat_penalty: 1.3,
        temperature: 0.7,
        num_predict: 500,
      }
    })
  });

  if(!model.ok){
    sendEvent(res, "status", { step: "Alternative Failure"});
    throw new Error("Modelo Alternativo ha fallado");
  }

  const reader = model.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while(true){
    const {done, value} = await reader.read();
    if(done) 
      break;

    buffer += decoder.decode(value, {stream: true});
    let boundary = buffer.indexOf("\n");

    while(boundary !== -1){
      const line = buffer.slice(0, boundary).trim();
      buffer = buffer.slice(boundary + 1);
      if(line){
        try{
          const json = JSON.parse(line);
          if(json.response){
            yield { text: () => json.response };
          }
        }catch(e){
          console.error("Error: ",e);
        }
      }
      boundary = buffer.indexOf("\n");
    }
  }
};

export async function assistantRequest(message, res) {
  if (!message || typeof message !== "string" || message.trim().length === 0)
    return {
      success: false,
      error: "empty user message",
    }

  try {
    const model = await ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const aiResult = await model.generateContent(message);
    const aiResponse = aiResult.response;
    const dataResponse = JSON.parse(aiResponse.text());
    return {
      success: true,
      data: dataResponse,
    };
  } catch (error) {
    console.error("Error con inteligencia artificial: ", error);
    try{
      sendEvent(res, "status", {step: "Changing Model"});
      const result = await alternative_model(schema_prompt(message), res);
      return {
        data: result, 
        success: true,
      };
    }catch(error){
      return {
        error: error.message,
        success: false,
      };
    }
  }
}

export const aiResponse = async (message, metadata, resultado_de_consulta, res) => {
  //Limit the results to five coincidences
  const results = Array.isArray(resultado_de_consulta) ? resultado_de_consulta : (resultado_de_consulta?.results || []);

  const limitedResults = results.slice(0, 5);

  const resultsAbstract = limitedResults.map(b => ({
    title: b.title,
    author: b.author,
    available: b.available,
    location: b.location,
  }));

  try {
    const model = await ai.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const aiResult = await model.generateContentStream(request(message, metadata, resultsAbstract));
    return {
      success: true,
      data: aiResult.stream,
    };
  } catch (error) {
    console.error("Error con inteligencia artificial: ", error);
    try{
      sendEvent(res, "status", {step: "Changing Model"});
      const ollamaResult = alternative_model_stream(request(message, metadata, resultsAbstract),res);
      return {
        data: ollamaResult,
        success: true,
      };
    }catch(error){
      return {
        error: error.message,
        success: false,
      };
    }
  }
};