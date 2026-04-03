import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

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
        "seach_book",
        "check_availability",
        "general_question",
        "unsupported_request",
      ],
    },
    title: { type: SchemaType.STRING, nullable: true },
    author: { type: SchemaType.STRING, nullable: true },
    subject: { type: SchemaType.STRING, nullable: true },
    isbn: { type: SchemaType.STRING, nullable: true },
    id: { type: SchemaType.STRING, nullable: true },
  },
};

export async function assistantRequest(message) {
  const model = await ai.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  try {
    const aiResult = await model.generateContent(message);
    const aiResponse = aiResult.response;

    return JSON.parse(aiResponse.text());
  } catch (error) {
    return;
  }
}
