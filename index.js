import { ApolloServer } from 'apollo-server'
import typeDefs from './db/schema'
import resolvers from './db/resolvers'
import conectarDB from './config/db'

import { verifyToken } from './utils/utilsToken'

// conectar a la base de datos
conectarDB()

// server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = (req.headers.authorization || '')
    if (token) {
      try {
        return { usuario: await verifyToken(token.split(' ')[1]) }
      } catch (e) {
        return { usuario: null }
      }
    }
    return { usuario: null }
  }
})

// Iniciar servidor
server.listen().then(({ url }) => {
  console.log(`Servidor listo en el puerto: ${url}`)
})
