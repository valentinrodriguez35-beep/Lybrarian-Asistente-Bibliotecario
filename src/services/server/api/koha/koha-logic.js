//Mock server --> Made it for testing
import express from "express";
import logger from "morgan";

const port = 4000;
const app = express();

const books = [
  {
    biblionumber: "1001",
    title: "El camino de los reyes",
    author: "Brandon Sanderson",
    isbn: "9788401352836",
    year: 2010,
    location: "Biblioteca Central Tijuana",
    total_items: 2,
    available: 1,
  },
  {
    biblionumber: "1002",
    title: "El nombre del viento",
    author: "Patrick Rothfuss",
    isbn: "9788401337208",
    year: 2007,
    location: "Biblioteca Central Tijuana",
    total_items: 1,
    available: 1,
  },
  {
    biblionumber: "1003",
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    isbn: "9788437604947",
    year: 1967,
    location: "Biblioteca Central Tijuana",
    total_items: 2,
    available: 0,
  },
  {
    biblionumber: "1004",
    title: "1984",
    author: "George Orwell",
    isbn: "9788499890944",
    year: 1949,
    location: "Piso 1",
    total_items: 1,
    available: 1,
  },
  {
    biblionumber: "1005",
    title: "Dune",
    author: "Frank Herbert",
    isbn: "9788466338295",
    year: 1965,
    location: "Piso 2",
    total_items: 3,
    available: 2,
  },
  {
    biblionumber: "1006",
    title: "El señor de los anillos",
    author: "J.R.R. Tolkien",
    isbn: "9788445071434",
    year: 1954,
    location: "Piso 1",
    total_items: 4,
    available: 2,
  },
  {
    biblionumber: "1007",
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    isbn: "9788478884452",
    year: 1997,
    location: "Piso 2",
    total_items: 5,
    available: 3,
  },
  {
    biblionumber: "1008",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    isbn: "9788445077092",
    year: 1953,
    location: "Piso 3",
    total_items: 2,
    available: 1,
  },
  {
    biblionumber: "1009",
    title: "Crimen y castigo",
    author: "Fiódor Dostoyevski",
    isbn: "9788420674223",
    year: 1866,
    location: "Piso 3",
    total_items: 1,
    available: 0,
  },
  {
    biblionumber: "1010",
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    isbn: "9788498381498",
    year: 1943,
    location: "Piso 1",
    total_items: 6,
    available: 4,
  },
  {
    biblionumber: "1011",
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    isbn: "9788467032185",
    year: 1605,
    location: "Piso 3",
    total_items: 3,
    available: 1,
  },
  {
    biblionumber: "1012",
    title: "Sapiens: De animales a dioses",
    author: "Yuval Noah Harari",
    isbn: "9788499926223",
    year: 2011,
    location: "Piso 2",
    total_items: 2,
    available: 2,
  },
  {
    biblionumber: "1013",
    title: "El código Da Vinci",
    author: "Dan Brown",
    isbn: "9788408176091",
    year: 2003,
    location: "Piso 1",
    total_items: 3,
    available: 0,
  },
  {
    biblionumber: "1014",
    title: "Orgullo y prejuicio",
    author: "Jane Austen",
    isbn: "9788467033793",
    year: 1813,
    location: "Piso 3",
    total_items: 2,
    available: 1,
  },
  {
    biblionumber: "1015",
    title: "El alquimista",
    author: "Paulo Coelho",
    isbn: "9788408052944",
    year: 1988,
    location: "Piso 1",
    total_items: 4,
    available: 3,
  },
  {
    biblionumber: "1016",
    title: "Ficciones",
    author: "Jorge Luis Borges",
    isbn: "9788420633138",
    year: 1944,
    location: "Piso 3",
    total_items: 1,
    available: 1,
  },
  {
    biblionumber: "1017",
    title: "El juego de Ender",
    author: "Orson Scott Card",
    isbn: "9788498890945",
    year: 1985,
    location: "Piso 2",
    total_items: 2,
    available: 1,
  },
  {
    biblionumber: "1018",
    title: "Neuromante",
    author: "William Gibson",
    isbn: "9788466662574",
    year: 1984,
    location: "Piso 2",
    total_items: 1,
    available: 0,
  },
  {
    biblionumber: "1019",
    title: "Beloved",
    author: "Toni Morrison",
    isbn: "9780307740922",
    year: 1987,
    location: "Piso 3",
    total_items: 2,
    available: 2,
  },
  {
    biblionumber: "1020",
    title: "Pedro Páramo",
    author: "Juan Rulfo",
    isbn: "9786071600004",
    year: 1955,
    location: "Piso 1",
    total_items: 3,
    available: 2,
  },
];

app.post("/api/mock", async (req, res) => {
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
    let ai_response = ai_result;
    console.log(ai_response);
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
