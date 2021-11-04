
// Usuario
import { obtenerUsuario } from './usuario/UsuarioQuerys'
import { nuevoUsuario, autenticarUsuario } from './usuario/UsuarioMutations'

// producto
import { nuevoProducto, actualizarProducto, eliminarProducto } from './productos/ProductosMutations'
import { obtenerProductos, obtenerProductoPorId } from './productos/ProductosQuerys'

// cliente
import { nuevoCliente, actualizarCliente, eliminarcliente } from './Cliente/ClienteMutations'
import { obtenerCliente, obtenerClienteVendedor, clienteById } from './Cliente/ClienteQueys'

// Pedidos
import { nuevoPedido } from './Pedidos/PedidosMutations'

//
import { vendedorField, clienteField } from '../resolvers/globalFieldResolver '

// Resolver
const resolvers = {
  Query: {
    obtenerUsuario,
    obtenerProductos,
    obtenerProductoPorId,
    obtenerCliente,
    obtenerClienteVendedor,
    clienteById
  },
  Mutation: {
    nuevoUsuario,
    autenticarUsuario,
    nuevoProducto,
    actualizarProducto,
    eliminarProducto,
    nuevoCliente,
    actualizarCliente,
    eliminarcliente,
    nuevoPedido
  },
  clienteVendedor: {
    // empresa: (_) => {
    //   return `${_.nombre}@${_.id}`
    // },
    vendedor: vendedorField
  },
  pedido: {
    vendedor: vendedorField,
    cliente: clienteField
  }
}

export default resolvers
