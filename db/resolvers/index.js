
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
import { nuevoPedido, PedidoFechaField, actualizarPedido, eliminarPedido } from './Pedidos/PedidosMutations'
import { obtenerPedidos, obtenerPedidoVendedor, obtenerPedidoPorId } from './Pedidos/PedidosQueys'

// global Field Resolver
import { vendedorField, clienteField } from '../resolvers/globalFieldResolver'

// Resolver
const resolvers = {
  Query: {
    // usuario
    obtenerUsuario,
    // producto
    obtenerProductos,
    obtenerProductoPorId,
    // cliente
    obtenerCliente,
    obtenerClienteVendedor,
    clienteById,
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
  }
}

export default resolvers
