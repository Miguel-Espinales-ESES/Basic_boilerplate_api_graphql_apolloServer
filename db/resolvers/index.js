
// Usuario
import { obtenerUsuario, mejoresVendedores } from './usuario/UsuarioQuerys'
import { nuevoUsuario, autenticarUsuario } from './usuario/UsuarioMutations'

// producto
import { nuevoProducto, actualizarProducto, eliminarProducto } from './productos/ProductosMutations'
import { obtenerProductos, obtenerProductoPorId, buscarProducto } from './productos/ProductosQuerys'

// cliente
import { nuevoCliente, actualizarCliente, eliminarcliente } from './Cliente/ClienteMutations'
import { obtenerCliente, obtenerClienteVendedor, clienteById, mejoresClientes } from './Cliente/ClienteQueys'

// Pedidos
import { nuevoPedido, PedidoFechaField, actualizarPedido, eliminarPedido } from './Pedidos/PedidosMutations'
import { obtenerPedidos, obtenerPedidoVendedor, obtenerPedidoPorId } from './Pedidos/PedidosQueys'

// global Field Resolver
import { vendedorField, clienteField } from '../resolvers/globalFieldResolver'

// Resolver
const resolvers = {
  Query: {
    // usuario
    obtenerUsuario,
    mejoresVendedores,
    // producto
    obtenerProductos,
    obtenerProductoPorId,
    buscarProducto,
    // cliente
    obtenerCliente,
    obtenerClienteVendedor,
    clienteById,
    mejoresClientes,
    // pedidos
    obtenerPedidos,
    obtenerPedidoVendedor,
    obtenerPedidoPorId
  },
  Mutation: {
    // usuario
    nuevoUsuario,
    autenticarUsuario,
    // Producto
    nuevoProducto,
    actualizarProducto,
    eliminarProducto,
    // cliente
    nuevoCliente,
    actualizarCliente,
    eliminarcliente,
    // pedidos
    nuevoPedido,
    actualizarPedido,
    eliminarPedido
  },
  // Field Resolvers
  cliente: {
    vendedor: vendedorField
  },
  clienteVendedor: {
    // empresa: (_) => {
    //   return `${_.nombre}@${_.id}`
    // },
    vendedor: vendedorField
  },
  pedido: {
    vendedor: vendedorField,
    cliente: clienteField,
    fecha: PedidoFechaField
  },
  TopClientes: {
    cliente: (_) => {
      return { ..._.cliente, id: _.cliente._id }
    }
  },
  TopVendedor: {
    vendedor: (_) => {
      return { ..._.vendedor, id: _.vendedor._id }
    }
  }
}

export default resolvers
