
const express = require('express')
const app = express();
const books = require('./books.json')


app.get("", (req, res) => {
    res.send("hello")
})


app.get("/books", (req, res) => {
    res.send(books)
})

app.listen(4000);
