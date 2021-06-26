
// Usuario
import { obtenerUsuario } from './usuario/UsuarioQuerys'
import { nuevoUsuario, autenticarUsuario } from './usuario/UsuarioMutations'

// producto
import { nuevoProducto } from './productos/ProductosMutations'
import { obtenerProductos, obtenerProductoPorId } from './productos/ProductosQuerys'

// Resolver
const resolvers = {
  Query: {
    obtenerUsuario,
    obtenerProductos,
    obtenerProductoPorId
  },
  Mutation: {
    nuevoUsuario,
    autenticarUsuario,
    nuevoProducto
  }
}

export default resolvers
