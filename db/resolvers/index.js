
// Usuario
import { obtenerUsuario } from './usuario/UsuarioQuerys'
import { nuevoUsuario, autenticarUsuario } from './usuario/UsuarioMutations'

// producto
import { nuevoProducto, actualizarProducto } from './productos/ProductosMutations'
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
    nuevoProducto,
    actualizarProducto
  }
}

export default resolvers
