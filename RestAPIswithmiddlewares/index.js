const books = require("./books.json");
const book = require("./book.json");

const express = require("express");
const app = express();




app.get("/books", allBooks, (req, res) => {
    return res.send(books);
});

app.get("/book/:name", singleBook, (req, res) => {
    return res.send(book[req.name]);
});

function allBooks(res, req, next) {
    console.log("Fetching all books");
    next();
}

function singleBook(res, req, next) {
    res.name = res.params.name;
    next();
}


app.listen(4000, () => {
    console.log("listening on port 4000");
});