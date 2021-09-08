
// Usuario
import { obtenerUsuario } from './usuario/UsuarioQuerys'
import { nuevoUsuario, autenticarUsuario } from './usuario/UsuarioMutations'

// producto
import { nuevoProducto, actualizarProducto, eliminarProducto } from './productos/ProductosMutations'
import { obtenerProductos, obtenerProductoPorId } from './productos/ProductosQuerys'

// cliente
import { nuevoCliente } from './Cliente/ClienteMutations'
import { obtenerCliente, obtenerClienteVendedor } from './Cliente/ClienteQueys'

// Resolver
const resolvers = {
  Query: {
    obtenerUsuario,
    obtenerProductos,
    obtenerProductoPorId,
    obtenerCliente,
    obtenerClienteVendedor
  },
  Mutation: {
    nuevoUsuario,
    autenticarUsuario,
    nuevoProducto,
    actualizarProducto,
    eliminarProducto,
    nuevoCliente
  }
}

export default resolvers
