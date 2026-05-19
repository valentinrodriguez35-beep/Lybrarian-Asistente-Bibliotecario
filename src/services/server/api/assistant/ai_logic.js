import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";
import { sendEvent } from "../../eventHandler.js";
import { Ollama } from "ollama";
import { HeuristicAnalizer } from "./heuristic-extractor.js";
dotenv.config();

const ollama = new Ollama({
  host: `${process.env.OLLAMA_URL}` ?? "http://127.0.0.1:11434",
});

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
        "unsupported_request"]
    },
    title:{
      type: "string",
      description: "Titulo del material bibliográfico consultado por el usuario",
    },
    author:{
      type: "string",
      description: "Autor del material bibliográfico consultado por el usuario",
    },
    theme:{
      type: "string",
      description: "Tema, género literario, materia o conceptos asociados al contenido buscado (ej: tecnología, computación, astronomía, ciencia, terror, miedo, fantasía, magia, clásica, etc.). Debe inferirse del contexto si el usuario menciona palabras clave relacionadas.",
    },
    isbn:{
      type: "string",
      description: "ISBN proveido por el usuario de longitud mayor o igual a 10 digitos",
    },
    id:{
      type: "string",
      description: "(biblionumber) Identificador del material bibliografico consultado por el usuario",
    },
    location:{
      type: "string",
      description: "Lugar, Biblioteca o sitio en general consultado por el usuario (Ejemplo: Biblioteca Central Tijuana)",
    },
    is_ambiguous:{
      type: "boolean",
      description: "TRUE solo si la consulta realizada por el usuario es muy general, de manera que tiene muchas interpretaciones.",
    },
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
      description: "Tema, género literario, materia o conceptos asociados al contenido buscado (ej: tecnología, computación, astronomía, ciencia, terror, miedo, fantasía, magia, clásica, etc.). Debe inferirse del contexto si el usuario menciona palabras clave relacionadas.",
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

const schema_prompt = (message) => `
Eres un extractor de información bibliográfica.

Tu tarea es analizar la consulta del usuario y devolver EXCLUSIVAMENTE un JSON válido.

REGLAS OBLIGATORIAS:
- NO expliques nada
- NO agregues texto fuera del JSON
- TODOS los campos deben existir
- Usa null si el dato NO fue mencionado explícitamente por el usuario
- NUNCA inventes ni asumas información que no esté en la consulta

CRITERIOS:
- title = nombre del libro mencionado literalmente. Si no se menciona → null
- author = autor mencionado literalmente. Si no se menciona → null
- theme = tema, género, materia o conceptos asociados que definan la categoría de búsqueda (por ejemplo, si menciona 'computadoras' o 'programación' el tema es 'tecnología'; si menciona 'estrellas' o 'planetas' es 'astronomía'; si menciona 'miedo' o 'fantasmas' es 'terror'; si menciona 'magia' o 'dragones' es 'fantasía'; si menciona 'canción' o 'instrumentos' es 'música'). Si no hay ningún tema o concepto → null
- isbn = ISBN numérico provisto. Si no se provee → null
- id = identificador bibliográfico provisto. Si no se provee → null
- location = biblioteca o lugar mencionado literalmente. Si no se menciona → null
- is_ambiguous = true solo si la consulta es demasiado general

EJEMPLO:
Consulta: "¿Tienen el libro Dune?"
Respuesta correcta: {"intent":"check_availability","title":"Dune","author":null,"theme":null,"isbn":null,"id":null,"location":null,"is_ambiguous":false}

CONSULTA:
"${message}"
`;

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
  try{
    const response = await ollama.chat({
      model: process.env.CUSTOM_MODEL ?? process.env.OLLAMA_MODEL ?? "lybrarian-assistant",
      messages: [{ role: "user", content: prompt}],
      format: alternative_schema,
      options: {
        repeat_penalty: 1.3,
        temperature: 0.05,
        num_predict: 500,
      }
    })    
    const parsedData = JSON.parse(response.message.content);
    const validatedData = HeuristicAnalizer(parsedData);
    if(!validatedData.success)
      throw new Error("Fallo en validacion de metadata generada por IA: ", validatedData.error.format());

    return validatedData;
  }catch(error){
    sendEvent(res, "status", { step: "Alternative Failure" });
    throw new Error("Modelo Alternativo ha fallado");
  }
};

const alternative_model_stream = async function* (prompt, res){
  try{
    const response = await ollama.chat({
      model: process.env.CUSTOM_MODEL ?? process.env.OLLAMA_MODEL ?? "lybrarian-assistant",
      messages: [{ role: "user", content: prompt}],
      stream: true,
      options: {
        repeat_penalty: 1.3,
        temperature: 0.7,
        num_predict: 500,
      }
    })
    for await (const chunk of response){
      if(chunk.message?.content){
        yield { text: () => chunk.message?.content };
      }
    }
  }catch(error){
    sendEvent(res, "status", { step: "Alternative Failure"});
    throw new Error("Modelo Alternativo ha fallado");
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
      systemInstruction: "Eres un extractor de información bibliográfica y de intenciones. Tu tarea es analizar la consulta del usuario y extraer los datos requeridos. Para el campo 'theme' (tema), debes identificar temas, materias, géneros literarios o conceptos clave (como 'magia', 'física', 'computadoras', 'fantasmas') e inferir el tema o género correspondiente (fantasía, ciencia, tecnología, terror, etc.).",
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
    try{
      sendEvent(res, "status", {step: "Changing Model"});
      const result = await alternative_model(schema_prompt(message), res);
      return {
        data: result.data, 
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
    sendEvent(res, "status", {step: "Changing Model"});
    const ollamaStream = alternative_model_stream(request(message, metadata, resultsAbstract),res);
    return {
      data: ollamaStream,
      success: true,
    };
  }
};