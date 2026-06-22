let books = [
  { id: 1, title: "The Pragmatic Programmer", author: "David Thomas", genre: "Tech", available: true },
  { id: 2, title: "Educated", author: "Tara Westover", genre: "Memoir", available: true },
  { id: 3, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", available: false },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", available: true },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", available: true },
];

let nextId = 6; // use this for any new book you create

const express = require ("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Books API is running"));

app.get("/api/books", (req, res) => res.json(books));

app.get("/api/books/:id", (req, res) => {
    
  const webId = Number(req.params.id) 

  const book = books.find((book) => book.id === webId)

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
    
  res.json(book);
    })

app.listen(8080, () => console.log("Server running on port 8000"));