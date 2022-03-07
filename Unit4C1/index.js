
const express = require('express')
const app = express();


app.get("/books", logger, (req, res) => {
    return res.send({ route: "/books"});
})

app.get("/libraries", logger, checkPermission('librarian'), (req, res) => {
    if (req.permission == true) {
        return res.send({ route: "/libraries", permission: true});
    }
})


app.get("/authors", logger, checkPermission('author'), (req, res) => {
    if (req.permission == true) {
        return res.send({ route: "/authors", permission: true});
    }
})



function logger(req, res, next) {
    console.log(req.path)
    next();
}

function checkPermission(a){
    return (req,res,next) => {
        if(a == 'librarian'){
            req.permission = true;
            next();
        } else if(a == 'author'){
            req.permission = true;
            next()
        } else{
            res.send('Permission Denied');
            next();
        }
    }
}


app.listen(4000, () => {
    console.log('listening on port 4000')
})