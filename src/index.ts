import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import { TrainingResolver } from "./resolvers/training.resolver";

async function main() {
  const connection = await createConnection()
  const schema = await buildSchema({
    resolvers: [UserResolver, TrainingResolver]
  })
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
}
main()