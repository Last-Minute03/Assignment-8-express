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

app.get("/api/books", (req, res) => {
    console.log("i am getting all the books")
    res.json(books)      //.json( {an object can be put here like books was} )
}); 

app.post("/api/books", (req, res) => {
    console.log('REQ BODY>>>>>>' , req.body)
    const {title, author, genre} = req.body
    const newBook = {
        id : nextId,
        title: title,
        author: author,
        genre: genre,
        available : false
    }
    nextId++

    books.push(newBook)

    res.status(201).json({
        done: "done",
        newBook,
        books
    })
})

app.patch('/api/books/:bookId' , (req,res)=>{
    const id = Number(req.params.bookId)
    const { title, author } = req.body
    
    const mybook = null
    books = books.map((book) => {
        if (book.id === id){
            return {...book, title: title, author: author} //dont forget to us {} since its an object
        }
        return books
    })

    if (!mybook) {
        return res.status(404).json({ message: "Book not found" });
    }
})

app.delete('/api/books/:bookId', (req, res) => {
    const id = Number(req.params.bookId)

    books = books.filter((book)=>{
        return book.id !== id
    })

    res.json({
        delete: "well done",
        books
    })
})

app.get("/api/books/:id", (req, res) => {  //the :id can be named anything this is the dynamic segment
    
  const webId = Number(req.params.id) // req.params."dynamic segment" in this case its id

  const book = books.find((book) => book.id === webId)
 // const mybook = null   another way to do this ^
 // books.forEach(book => {
 // if (book.id === webId) {
 //     mybook = book; }})
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // if (mybook == null) { return res.status(404).json({ message: "Book not found"}) } can be written this way too
    
  res.json(book);
    })



app.listen(8080, () => console.log("Server running on port 8000"));