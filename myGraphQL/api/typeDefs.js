module.exports = `
  type Book {
    id: Int
    title: String
    price: Int
    pages: Int
    author: Author
  }

  type Author {
    id: Int
    name: String
    surname: String
    age: Int
    books: [Book]
  }

  type Query {
    books: [Book]
    book(id: Int): Book
    authors: [Author]
    author(id: Int): Author
  }

  type Mutation {
    addAuthor(name:String!,surname:String!,age:Int!):Author
    deleteAuthor(name:String!, surname:String!):Author
  }
`;
