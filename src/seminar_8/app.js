import express from 'express';
import Book from './Books.js'
import router from './router.js';
const app = express()
const port = 3000


const bookRouter = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', bookRouter)
app.use('/status', router)

let books = [new Book(1, "Dune", "sf", "Frank Herbert"),
new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
new Book(3, "Foundation", "sf", "Asimov")]

bookRouter.route('/books')
    //Step 1 - GET request
    .get((req, res) => {
        let filteredBooks = [];
        if (req.query.genre) {
            filteredBooks = books.filter(x => x.genre === req.query.genre)
        }
        else {
            filteredBooks = books;
        }
        res.json(filteredBooks);
    })
    .post((req, res) => {
        if (Number.isNaN(Number(req.body.id)) || !req.body.id || !req.body.name || !req.body.genre || !req.body.author)
        {
            return res.status(400).json({
            error: "Missing required fields"
            });
        }
        else 
        {
            let newBook = new Book(req.body.id, req.body.name, req.body.genre, req.body.author);

            books.push(newBook);
            console.log(books);
            return res.json(newBook);
        }
    });
    
bookRouter.delete('/books/:id', (req, res) => {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) 
        {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const index = books.findIndex(book => book.id === id);

        if (index === -1) 
        {
            return res.status(404).json({ error: "Book not found" });
        }

        const deletedBook = books.splice(index, 1)[0];

        res.json({
            message: "Book deleted successfully",
            deleted: deletedBook
        });
    });

bookRouter.route('/alphabetical')
    .get((req, res) => {
        let output = books.sort((a, b) => a.name.localeCompare(b.name));
        res.json(output);
    })

// app.get('/', (req, res) => {
//     res.send('Welcome to my API')
// })

app.listen(port, () => {
    console.log('Running on the port ' + port)
})