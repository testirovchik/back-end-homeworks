const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const db = require("./models");
const typeDefs = require("./api/typeDefs");
const resolvers = require("./api/resolvers");

async function start() {
  await db.sequelize.sync({ alter: true });
  console.log("DB SYNCED");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });

  console.log(`GraphQL Server ready at: ${url}`);
}

start();
