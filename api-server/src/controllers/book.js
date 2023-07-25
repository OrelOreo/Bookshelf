const Book = require("../models/Book");
const fs = require("fs").promises;
const path = require("path");

exports.createOneBook = async (req, res) => {
  const bookObject = req.body;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  try {
    const savedBook = await book.save();
    res.status(201).json({ savedBook });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: "Livre introuvable" });
    }
    if (book.userId !== req.auth.userId) {
      return res.status(403).json({ message: "Requête non autorisée" });
    }

    const filename = book.image.split("/images/")[1];
    await fs.unlink(path.join("images", filename));
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Objet supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'objet" });
  }
};

exports.modifyBook = async (req, res) => {
  try {
    const bookObject = req.file
      ? {
          ...req.body.book,
          image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        }
      : { ...req.body };

    const book = await Book.findOne({ _id: req.params.id });
    if (book.userId != req.auth.userId) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, bookObject, {
      new: true,
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.postCommentary = async (req, res) => {
  try {
    const newComment = req.body;
    await Book.updateOne({ _id: req.params.id }, { $push: { comments: newComment } });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error });
  }
};
