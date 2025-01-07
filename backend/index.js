import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "book",
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Conectado desde el backend!");
});



app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al obtener los datos" });
        }
        return res.json(data);
    });
});
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?, ?, ?)";
    // const values = ["title from backend", "desc from backend", "cover picture from the backend"];
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]


    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        // return res.json(data);
        return res.json('book creado ');
    });
});


app.listen(8800, () => {
    console.log("Conectado desde el backend!");
});
