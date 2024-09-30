import express from "express";
import getBooks from "../services/books/getBooks.js";
import createBook from "../services/books/createBook.js";
import getBookById from "../services/books/getBookById.js";
import updateBookById from "../services/books/updateBookById.js";
import deleteBook from "../services/books/deleteBook.js";
import advancedAuth from "../middleware/auth.js"; // Keep using advancedAuth

// import authMiddleware from "../middleware/auth.js";  // Commenting this out for now

const router = express.Router();

// No auth needed for GET
router.get("/", async (req, res) => {
  try {
    const { genre, available } = req.query;
    const books = await getBooks(genre, available);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting list of books!");
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await getBookById(id);

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }
  // notFoundErrorHandler
);

// Protected route (POST) using advancedAuth
router.post("/", advancedAuth, (req, res) => {
  try {
    const { title, author, isbn, pages, available, genre } = req.body;
    const newBook = createBook(title, author, isbn, pages, available, genre);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating a new book!");
  }
});

// Protected route (PUT) using advancedAuth
router.put("/:id", advancedAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, pages, available, genre } = req.body;
    const updatedBook = updateBookById(
      id,
      title,
      author,
      isbn,
      pages,
      available,
      genre
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while updating book by id!");
  }
});

// Protected route (DELETE) using advancedAuth
router.delete("/:id", advancedAuth, (req, res) => {
  try {
    const { id } = req.params;
    const deletedBookId = deleteBook(id);

    if (!deletedBookId) {
      res.status(404).send(`Book with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Book with id ${deletedBookId} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while deleting book by id!");
  }
});

export default router;
