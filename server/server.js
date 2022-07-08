const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

// Import ApolloServer
const {ApolloServer}  = require('apollo-server-express');
// Import typeDefs and Resolvers
const {typeDefs, resolvers} = require('./schemas');
// Use the typeDefs and resolvers to create a new schema
 const server = new ApolloServer({
   typeDefs,
   resolvers
 });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create a new instance of the apollo server with the defined schema.
const startApolloServer = async (typeDefs, resolvers) => {
await server.start();

  //Integrate server with express application
server.applyMiddleware({ app });

    db.once('open', () => {
      app.listen(PORT, () => {
            console.log(`🌍 Now listening on localhost:${PORT}`)

        // Display path to test GQL Api
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

// start the server
startApolloServer(typeDefs, resolvers);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

