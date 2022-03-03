
const express = require('express')
const app = express();


app.get("", (req, res) => {
    res.send("hello")
})

let books = [{
    name: "One Hundred Years Of Solitude",
    author: "Gabriel Garcia Marquez"
},
{
    name: "Digital Fortress",
    author: "Stephen Brown"
},
{
    name: "Crime And Punishment",
    author: "Fyodor Dostoevsky"
},
{
    name: "Notes from Underground",
    author: "Fyodor Dostoevsky"
}]

app.get("/books", (req, res) => {
    res.send(JSON.stringify(books))
})

app.listen(4000, () => {
    console.log("listening on port 4000");
});
