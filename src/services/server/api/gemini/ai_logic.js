import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const ai = new GoogleGenerativeAI(process.env.GEMINI_KEY);

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
    is_ambiguous: {
      type: SchemaType.BOOLEAN,
      description:
        "TRUE solo si la consulta realizada por el usuario es muy general, de manera que tiene muchas interpretaciones.",
    },
  },
  required: ["intent", "author", "theme", "isbn", "id", "is_ambiguous"],
};

export async function assistantRequest(message) {
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
    console.error("Error con inteligencia artificial: " + error);
    return {
      success: false,
    };
  }
}
