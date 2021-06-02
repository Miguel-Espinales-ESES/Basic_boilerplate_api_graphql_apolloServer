
// Usuario
import { obtenerUsuario } from './usuario/UsuarioQuerys'
import { nuevoUsuario, autenticarUsuario } from './usuario/UsuarioMutations'

// Resolver
const resolvers = {
  Query: {
    obtenerUsuario
  },
  Mutation: {
    nuevoUsuario,
    autenticarUsuario
  }
}

export default resolvers
