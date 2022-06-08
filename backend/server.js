import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import connectDb from "./src/Db/db.js";
import { resolvers } from "./src/resolvers/resolvers.js";
import { typeDefs } from "./src/SchemaGQL/schemaGQL.js";
import { context } from "./src/middleware/context.js";
import express from "express";
import http from "http";
import path from "path";
const __dirname = path.resolve()
// create instance of apollo server
connectDb();
const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV !== "production"
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
  ],
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static('frontend/build'))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}

await server.start();
server.applyMiddleware({ app, path: "/graphql" });
httpServer.listen({ port: PORT }, () => {
  console.log(`server is running at ${PORT} ${server.graphqlPath}`);
});
