import PedidoModelo from '../../../models/Pedidos'
import ClienteModel from '../../../models/Cliente'
import ProductoModelo from '../../../models/Producto'
import isEmpty from 'lodash/isEmpty'

// utils
import moment from 'moment'

export const nuevoPedido = async (_, { input }, context) => {
  const { usuario: usuarioContext } = context
  const { clienteId, pedido } = input

  // validando si hay token
  if (!isEmpty(usuarioContext)) {
    // verificar si exsite o no el cliente
    const cliente = await ClienteModel.findById(clienteId)
    if (!cliente) {
      throw new Error('Cliente no encontrado')
    }

    // verificar si el el vendedor asignado
    if (cliente.vendedor.toString() !== usuarioContext.id) {
      throw new Error('no tienes los permisos necesario')
    }

    // Revisar que el stock este disponible
    for await (const articulo of pedido) {
      const { id } = articulo
      const productoFind = await ProductoModelo.findById(id)

      if (articulo.cantidad <= 0) {
        throw new Error(`La cantidad del articulo: "${productoFind.nombre}" tiene que ser mayor a 0`)
      }

      if (articulo.cantidad > productoFind.existencia) {
        throw new Error(`El articulo: "${productoFind.nombre}" excede la cantidad disponible`)
      } else {
        // restar la cantidad de articulo a lo disponible en la colección de productos
        productoFind.existencia = productoFind.existencia - articulo.cantidad
        await productoFind.save()
      }
    }

    // crear un nuevo pedido
    const newPedido = new PedidoModelo(input)

    // asignarle un vendedor
    newPedido.vendedor = usuarioContext.id

    // guardar en db
    const resultado = await newPedido.save()
    return resultado
  } else {
    throw new Error('token inválido no identificado')
  }
}

export const actualizarPedido = async (_, { id: idpedido, input }, context) => {
  const { usuario: usuarioContext } = context
  const { clienteId, pedido: nuevoPedido } = input
  if (!isEmpty(usuarioContext)) {
    // verificar si el pedido exsite
    const pedidoExsit = await PedidoModelo.findById(idpedido)
    if (!pedidoExsit) {
      throw new Error('Pedido no encontrado')
    }

    // si el cliente existe
    const cliente = await ClienteModel.findById(clienteId)
    if (!cliente) {
      throw new Error('Cliente no encontrado')
    }

    // si el cliente y el pedido pertenece al vendedor
    if (cliente.vendedor.toString() !== usuarioContext.id) {
      throw new Error('no tienes los permisos necesario')
    }

    const pedidoProducts = pedidoExsit.pedido

    for await (const value of pedidoProducts) {
      const findInput = nuevoPedido.find((val) => {
        if (val.id.toString() === value.id.toString()) {
          return val
        }
        return null
      })
      const productoFind = await ProductoModelo.findById(value.id)
      if (!findInput) {
        productoFind.existencia = productoFind.existencia + value.cantidad
        await productoFind.save()
      } else {
        const inventarioTemp = productoFind.existencia + value.cantidad
        if (inventarioTemp <= 0) {
          throw new Error(`La cantidad del articulo: "${productoFind.nombre}" tiene que ser mayor a 0`)
        }
        if (inventarioTemp < nuevoPedido.existencia) {
          throw new Error(`El articulo: "${productoFind.nombre}" excede la cantidad disponible`)
        } else {
          // restar la cantidad de articulo a lo disponible en la colección de productos
          productoFind.existencia = inventarioTemp - findInput.cantidad
          await productoFind.save()
        }
      }
    }

    try {
      // guardar el pedido
      const resultado = await PedidoModelo.findOneAndUpdate({ _id: idpedido }, input, { new: true })
      return resultado
    } catch (e) {
      console.log(e)
      throw new Error('Error al editar el pedidos')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}

export const PedidoFechaField = async (_, {}, context) => {
  return moment(_.creado).format()
}
