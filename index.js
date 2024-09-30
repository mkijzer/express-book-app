import "./instrument.js"; // Import Sentry initialization at the top
import express from "express";
import booksRouter from "./routes/books.js";
import recordsRouter from "./routes/records.js";
import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleware.js";
import "dotenv/config";
import * as Sentry from "@sentry/node"; // Ensure we're importing Sentry

const app = express();

app.use(express.json());

app.use(log);

app.use("/books", booksRouter);
app.use("/records", booksRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Error-handling middleware
app.use((err, req, res, next) => {
  // Capture the exception using Sentry
  Sentry.captureException(err);

  // Log the error to the console
  console.error(err);

  // Send a custom error response to the client
  res.status(500).json({
    message: "Oops! Something went wrong. Please try again later.", // Custom message
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
