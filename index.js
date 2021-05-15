import { ApolloServer } from 'apollo-server'
import typeDefs from './db/schema'
import resolvers from './db/resolvers'
import conectarDB from './config/db'

// conectar a la base de datos
conectarDB()

// server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// Iniciar servidor
server.listen()
  .then(({ url }) => {
    console.log(`Servidor listo en el puerto: ${url}`)
  })
