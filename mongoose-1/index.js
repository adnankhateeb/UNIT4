const express = require("express");
const mongoose = require("mongoose");

const app = express();

// to make data usable json
app.use(express.json());

// connect database
const connect = () => {
  return mongoose.connect(
    "mongodb+srv://adnan:adnan@cluster0.rlrcf.mongodb.net/library?retryWrites=true&w=majority"
  );
};

/////////////////// SECTION PART //////////////////////////

// initialize schema

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// create section model
const Section = mongoose.model("section", sectionSchema);

//---// CRUD FOR SECTION //---//

//Find all sections

app.get("/sections", async (req, res) => {
  try {
    const section = await Section.find().lean().exec();

    return res.status(200).send({ section }); // []
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});

// Add to sections

app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return res.status(201).send(section);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// app.get("/sections/:id", async (req, res) => {
//   try {
//     const section = await Section.findById(req.params.id).lean().exec();

//     return res.status(200).send(section);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });

/////////////////// BOOK PART //////////////////////////

// initialize schema

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    body: { type: String, require: true },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    authorId2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: false,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

// create book model
const Book = mongoose.model("book", bookSchema);

//---// CRUD FOR BOOKS //---//

//Find all books

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find()
      .populate("sectionId")
      .populate("authorId")
      .populate("authorId2")
      .lean()
      .exec();

    return res.status(200).send({ books }); // []
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});

//Add books

app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(200).send(book);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});

/////////////////// AUTHOR PART //////////////////////////

// first always create schema

const authorSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// next create the model

const Author = mongoose.model("author", authorSchema);

// next create the crud operations

// find one first

app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find().lean().exec();
    return res.status(200).send({ authors });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});

// create one now

app.post("/authors", async (req, res) => {
  try {
    const author = await Author.create(req.body);
    return res.status(200).send(author);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

////////////////////// -- API Endpoints -- \\\\\\\\\\\\\\\\\\\\\\\\\

// end point to find all books written by one author
app.get("/author/:authorId/books", async (req, res) => {
  try {
    const books = await Book.find({ authorId: req.params.authorId })
      .populate("authorId")
      .populate("sectionId")
      .lean()
      .exec();
    return res.status(200).send(books);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});


//find books in a section

app.get("/section/:sectionId/books", async (req, res) => {
  try {
    const books = await Book.find({ sectionId: req.params.sectionId })
      .lean()
      .exec();
    return res.status(200).send(books);
  } catch (error) {
    return res.status(500).send({ error: err.message });
  }
})

//find books of 1 author inside a section Optional

app.get("/:sectionId/:authorId/books", async(req, res) => {

  try {
    const books = await Book.find({sectionId : req.params.sectionId, authorId: req.params.authorId})
    return res.status(200).send(books);
    
  } catch (error) {
    return res.status(500).send({ error: err.message });

  }


})




// Open the server on port
const port = 5000;

app.listen(port, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }

  console.log(`listening on port ${port}`);
});
