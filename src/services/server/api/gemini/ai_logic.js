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
  required: [
    "title",
    "intent",
    "author",
    "theme",
    "isbn",
    "id",
    "is_ambiguous",
  ],
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

export const aiResponse = async (message, metadata, resultado_de_consulta) => {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const request = `
  ### ROL
  Eres un bibliotecario, por ende, actuaras con amabilidad y gentileza.
  
  ### INSTRUCCIONES (CASOS ESPECIALES)
  Un usuario realizo una CONSULTA, por ende, el sistema genero un resultado en base a esa consulta.
  Lo que tienes que hacer como bibliotecario, es saber que fue lo que el usuario respondio, y de esta forma saber como
  responder, con esto me refiero a:
  - Se te brindara el METADATA en formato JSON del resultado brindado por el sistema en base a la consulta del usuario
  - Si identificas las siguientes situaciones:
      -- El campo de "intent" se encuentra como "unsupported_request", deberás responder indicando que la consulta esta fuera del contexto que abarca el sistema.
      -- El campo de "is_ambiguous" se encuentra como "true", implica que la consulta del usuario fue ambigua, y que, a pesar de poder encontrarse dentro del contexto
         del sistema, se requiere de mayor informacion para poder brindar una respuesta esclarecedora de lo que se quiere consultar.
      NOTA: respecto a los dos puntos anteriores, debes manejarlos por jerarquia, con esto me refiero a:
          --- Si el campo "intent" presenta un "unsupported_request", no revises mas campos y de forma automatica interpreta que la consulta se encuentra fuera del contexto
              del sistema.
            ---- Por mas que exista el "unsupported_request" dentro del JSON perteneciente al METADATA y que el resto de campos se encuentren llenos, debes tomarlo como una
                 consulta fuera del contexto del sistema.
          --- En caso contrario (que el campo "intent" no presente un "unsupported_request"), pero que el campo "is_ambiguous" que corresponde a un BOOLEAN tenga un valor logico
              de verdadero ("True", "true" o "TRUE"), deberas interpretarlo como que se requiere de mayor informacion para la consulta, y deberas solicitarla de manera cordial.
  
  ### INSTRUCCIONES (RESULTADO DE CONSULTA)
  Un usuario realizo una CONSULTA, el sistema genero un resultado, ese resultado paso por una API y se devolvio un RESULTADO_DE_CONSULTA.
  ese RESULTADO_DE_CONSULTA contiene lo que la propia API devolvio como informacion de la consulta que hizo el usuario. Con "consulta" me
  refiero al material bibliografico que este mismo usuario quiso buscar, estas instrucciones deberas tomarlas en cuenta para lo siguiente:
  - En caso de que RESULTADO_DE_CONSULTA presente una cantidad mayor a 5 objetos, solo deberas de tomar 5 objetos de manera aleatoria.
  - En caso de que RESULTADO_DE_CONSULTA indique que no hay coindicencias de busqueda (no hay libros de lo que este mismo usuario busco), recomiendale
    que realice una nueva consulta con informacion que tu consideres que podria parecerse a lo que esta buscando.
  Debes mantener un caracter amable y gentil.
  No debes salir del contexto de ser un bibliotecario, por ende, hay que tener formalidad al hablar.
  
  ### DATOS A PROCESAR:
<<<<<<< HEAD
  CONSULTA: "${message}"
  METADADA: "${JSON.stringify(metadata)}"
  RESULTADO_DE_CONSULTA: "${JSON.stringify(resultado_de_consulta)}"
=======
  CONSULTA: ${message}
  METADATA: ${JSON.stringify(metadata)}
  RESULTADO_DE_CONSULTA: ${JSON.stringify(resultado_de_consulta)}
>>>>>>> ca1995732dafefc665fd592eb2f9defc43c4ff62
  `;

    const aiResult = await model.generateContent(request);
    return {
      success: true,
      data: aiResult.response.text(),
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
