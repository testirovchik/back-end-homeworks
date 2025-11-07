const db = require("../models");
const { Book, Author } = db;

module.exports = {
  Query: {
    books: async () => {
      return await Book.findAll({});
    },
    book: async (parent, args) => {
        const books = await Book.findAll();
        return books.find(book => book.id == args.id)
    },
    author: async(_,args) => {
        const authors = await Author.findAll();
        return authors.find(author => author.id == args.id);
    }
  },
  Book: {
    author: async (parent) => {
        const authors = await Author.findAll();
        return authors.find(author => author.id == parent.authorId);
    }
  },
  Author: {
    books: async(parent) => {
        const books = await Book.findAll();
        return books.filter(book => book.authorId == parent.id);
    }
  },
  Mutation: {
    addAuthor: async(_,{name, surname, age}) => {
        const newAuthor = await Author.create({name, surname, age});
        return newAuthor;
    },
    deleteAuthor:async(_,{name, surname}) => {
        const deleted = await Author.destroy({where: {name, surname}})
        return {name, surname};
    }
  }
};
