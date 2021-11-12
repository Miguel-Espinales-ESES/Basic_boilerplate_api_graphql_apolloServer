import PedidoModelo from '../../../models/Pedidos'
// import ClienteModel from '../../../models/Cliente'
// import ProductoModelo from '../../../models/Producto'
import isEmpty from 'lodash/isEmpty'

export const obtenerPedidos = async (_, {}, context) => {
  const { usuario: usuarioContext } = context
  if (!isEmpty(usuarioContext)) {
    try {
      return await PedidoModelo.find({})
    } catch (e) {
      console.log(e)
      throw new Error('Error al obtener los pedidos')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}

export const obtenerPedidoVendedor = async (_, {}, context) => {
  const { usuario: usuarioContext } = context
  if (!isEmpty(usuarioContext)) {
    try {
      return await PedidoModelo.find({ vendedor: usuarioContext.id })
    } catch (e) {
      console.log(e)
      throw new Error('Error al obtener los pedidos')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}

export const obtenerPedidoPorId = async (_, { id }, context) => {
  const { usuario: usuarioContext } = context
  if (!isEmpty(usuarioContext)) {
    try {
      // verificar si el pedido existe
      const pedidoExsit = await PedidoModelo.findById(id)
      if (!pedidoExsit) {
        throw new Error('Pedido no encontrado')
      }
      // verificar el creador del pedido
      if (pedidoExsit.vendedor.toString() !== usuarioContext.id) {
        throw new Error('no tienes los permisos necesario')
      }

      // retornar pedido
      return pedidoExsit
    } catch (e) {
      console.log(e)
      throw new Error('Error al obtener el pedido')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}
