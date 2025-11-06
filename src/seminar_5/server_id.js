import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

let app = express();
let router = express.Router();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

let resurse = [
    { id: 1, name: "resursa1.jpg"},
    { id: 2, name: "resursa2.gif"},
    { id: 3, name: "resursa3.json"}
];

router.get('/resursa/:id', (req, res) =>
{
    const id = parseInt(req.params.id);
    const resursa = resurse.find(r => r.id === id);

    if(resursa) {
        res.json(resursa);
    }
    else
    {
        res.status(404).json({message: "Resursa nu a fost gasita"});
    }
});

const PORT = 3000;
app.listen(PORT, () => 
{
    console.log("Serverul ruleaza pe portul " + PORT);
})

