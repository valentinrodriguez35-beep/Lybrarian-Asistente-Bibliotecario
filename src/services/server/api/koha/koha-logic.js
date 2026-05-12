//Mock server --> Made it for testing
import express from "express";
import logger from "morgan";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.KOHA_PORT;
const app = express();
app.use(logger("dev"));
app.use(express.json());

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
    location: "Biblioteca Central Tijuana",
    total_items: 1,
    available: 1,
  },
  {
    biblionumber: "1005",
    title: "Dune",
    author: "Frank Herbert",
    isbn: "9788466338295",
    year: 1965,
    location: "Biblioteca Central Mexicali",
    total_items: 3,
    available: 2,
  },
  {
    biblionumber: "1006",
    title: "El señor de los anillos",
    author: "J.R.R. Tolkien",
    isbn: "9788445071434",
    year: 1954,
    location: "Biblioteca Central Tijuana",
    total_items: 4,
    available: 2,
  },
  {
    biblionumber: "1007",
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    isbn: "9788478884452",
    year: 1997,
    location: "Biblioteca Central Mexicali",
    total_items: 5,
    available: 3,
  },
  {
    biblionumber: "1008",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    isbn: "9788445077092",
    year: 1953,
    location: "Biblioteca Valle Dorado",
    total_items: 2,
    available: 1,
  },
  {
    biblionumber: "1009",
    title: "Crimen y castigo",
    author: "Fiódor Dostoyevski",
    isbn: "9788420674223",
    year: 1866,
    location: "Biblioteca Valle Dorado",
    total_items: 1,
    available: 0,
  },
  {
    biblionumber: "1010",
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    isbn: "9788498381498",
    year: 1943,
    location: "Biblioteca Central Tijuana",
    total_items: 6,
    available: 4,
  },
  {
    biblionumber: "1011",
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    isbn: "9788467032185",
    year: 1605,
    location: "Biblioteca Valle Dorado",
    total_items: 3,
    available: 1,
  },
  {
    biblionumber: "1012",
    title: "Sapiens: De animales a dioses",
    author: "Yuval Noah Harari",
    isbn: "9788499926223",
    year: 2011,
    location: "Biblioteca Central Mexicali",
    total_items: 2,
    available: 2,
  },
  {
    biblionumber: "1013",
    title: "El código Da Vinci",
    author: "Dan Brown",
    isbn: "9788408176091",
    year: 2003,
    location: "Biblioteca Central Tijuana",
    total_items: 3,
    available: 0,
  },
  {
    biblionumber: "1014",
    title: "Orgullo y prejuicio",
    author: "Jane Austen",
    isbn: "9788467033793",
    year: 1813,
    location: "Biblioteca Valle Dorado",
    total_items: 2,
    available: 1,
  },
  {
    biblionumber: "1015",
    title: "El alquimista",
    author: "Paulo Coelho",
    isbn: "9788408052944",
    year: 1988,
    location: "Biblioteca Central Tijuana",
    total_items: 4,
    available: 3,
  },
  {
    biblionumber: "1016",
    title: "Ficciones",
    author: "Jorge Luis Borges",
    isbn: "9788420633138",
    year: 1944,
    location: "Biblioteca Valle Dorado",
    total_items: 1,
    available: 1,
  },
  {
    biblionumber: "1017",
    title: "El juego de Ender",
    author: "Orson Scott Card",
    isbn: "9788498890945",
    year: 1985,
    location: "Biblioteca Central Mexicali",
    total_items: 2,
    available: 1,
  },
  {
    biblionumber: "1018",
    title: "Neuromante",
    author: "William Gibson",
    isbn: "9788466662574",
    year: 1984,
    location: "Biblioteca Central Mexicali",
    total_items: 1,
    available: 0,
  },
  {
    biblionumber: "1019",
    title: "Beloved",
    author: "Toni Morrison",
    isbn: "9780307740922",
    year: 1987,
    location: "Biblioteca Valle Dorado",
    total_items: 2,
    available: 2,
  },
  {
    biblionumber: "1020",
    title: "Pedro Páramo",
    author: "Juan Rulfo",
    isbn: "9786071600004",
    year: 1955,
    location: "Biblioteca Central Tijuana",
    total_items: 3,
    available: 2,
  },
];

app.get("/api/v1/biblios/search", (req, res) => {
  const { q, author, isbn, biblionumber } = req.query;

  let results = books;

  if (biblionumber){
    results = results.filter((b) => b.biblionumber === biblionumber);
  }
  if (q) {
    results = results.filter((b) =>
      b.title.toLowerCase().includes(q.toLowerCase()),
    );
  }
  if (author) {
    results = results.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase()),
    );
  }
  if (isbn) {
    results = results.filter((b) => b.isbn === isbn);
  }

  return res.json({ total: results.length, results });
});

app.listen(port, () => {
  console.log(`Mock Koha corriendo en el puerto ${port}`);
});
