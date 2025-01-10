//? Importing the epress 
import express from "express";
//? importing sql
import mysql from "mysql2";
import cors from "cors";
//? calling the a
const app = express();

// this const contating the info to connect at mysql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "book",// name of the database
});

//! if any aith problem use = ALTER USER 'root' @ localhost IDENTIFIED WITH mysql_native_password BY 'root';

app.use(express.json())// It permits the sending of any JSON file 
// Why do you need it?
// Without CORS, a request from http://localhost:3000 to http://localhost:8800 
// would be blocked by the browser because the domains are different (it's a cross-origin request). 
// CORS helps allow or restrict which external domains can access the resources on your server.

app.use(cors())


// to reach the backend server  use the get metod ("/") = fro use when is the frist pague 
// (req, res) req = reques , res = respond on this way we creating app request from express server 
app.get("/", (req, res) => {
    res.json("Conectado desde el backend!");
});


//  creating a get request ("/books") =  end point. RMB req (Request):, res (Response):
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";// this query is to get all books fron the sql
    //! remeber to add the .query when you gonna do any query
    db.query(q, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error getting the data " });
        }
        return res.json(data);// it send all data as a format JSON
    });
});
   //* this code is to add a book at the sql use post , use postman to make sure it`s work well (200) for the port 
  //! to send the data as the user on the postman use the body secciton ,raw ,JSON 
app.post("/books", (req, res) => {
    console.log("Request body:", req.body); // Debug
    const { title, desc, price, cover } = req.body;
    //! make sure is the same as on the basedate , use ? to provide seguirity 
    const query = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?, ?, ?, ?)";
    const values = [title, desc, price, cover];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(201).json("Book has been created successfully.");
    });
  });
  

  //! TO DELETE THE BOOK , (req,res) recres , respond , rmb and the id 
  app.delete("/books/:id",(req,res)=> {
    //* the params reference to the /books/ it means it takes all books , 
    const bookId = req.params.id
    //* addong the ?  as a markerd to preven injection of sql  
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId],(err,data)=> {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
          }
          return res.status(201).json("Book has been delete successfully.");
    })
  })

  //! To update the book, use the .put method.

  app.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const { title, desc, price, cover } = req.body;
    const q = 'UPDATE books SET `title` = ?, `desc`= ?, `price` = ?, `cover` = ? WHERE `id` = ?';
  
    try {
      const result = await db.query(q, [title, desc, price, cover, bookId]);
      res.json(result);
      console.log('book been updated successfully')
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//? to be avaleible to run de app, use a console.log() to be sure it run 
//! it will give a err, so it need to change pack.json to  "type": "module", 
app.listen(8800, () => {
    console.log("Conectado desde el backend!");
});
