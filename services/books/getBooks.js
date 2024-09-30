// import bookData from "../../data/books.json" assert { type: "json" };

// const getBooks = (genre, available) => {
//   let books = bookData.books;

//   if (genre) {
//     books = books.filter((book) => book.genre === genre);
//   }

//   if (available !== undefined) {
//     books = books.filter((book) => book.available === JSON.parse(available));
//   }

//   return books;
// };

// export default getBooks;

import { PrismaClient } from "@prisma/client";

const getBooks = (genre, available) => {
  const prisma = new PrismaClient();

  return prisma.book.findMany({
    where: {
      genre,
      available,
    },
  });
};

export default getBooks;
