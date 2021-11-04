import PedidoModelo from '../../../models/Pedidos'
import ClienteModel from '../../../models/Cliente'
import ProductoModelo from '../../../models/Producto'
import isEmpty from 'lodash/isEmpty'

export const nuevoPedido = async (_, { input }, context) => {
  const { usuario: usuarioContext } = context
  const { clienteId, pedido, total, estado } = input

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
      }
    }

    // crear un nuevo pedido

    // asignarle un vendedor

    // guardar en db
  } else {
    throw new Error('token inválido no identificado')
  }
}
