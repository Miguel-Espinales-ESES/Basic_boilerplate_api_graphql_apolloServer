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

      if (articulo.cantidad > productoFind.existencia) {
        throw new Error(`El articulo: ${productoFind.nombre} excede la cantidad disponible`)
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

export const PedidoFechaField = async (_, {}, context) => {
  return moment(_.creado).format()
}
