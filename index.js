import express from "express";
import booksRouter from "./routes/books.js";
import recordsRouter from "./routes/records.js";
import log from "./middleware/logMiddleware.js";
import logger from "./utils/log.js";

const app = express();
app.use(express.json());

app.use(log);

app.use("/books", booksRouter);
app.use("/records", recordsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info("Server is listening on port 3000");
});
