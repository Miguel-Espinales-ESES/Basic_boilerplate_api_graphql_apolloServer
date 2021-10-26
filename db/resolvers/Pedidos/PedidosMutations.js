import PedidoModelo from '../../../models/Pedidos'
import ClienteModel from '../../../models/Cliente'
import isEmpty from 'lodash/isEmpty'

export const nuevoPedido = async (_, { input }, context) => {
  const { usuario: usuarioContext } = context
  const { clienteId, pedido, total, estado } = input

  // validando si hay token
  if (!isEmpty(usuarioContext)) {
    try {
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

      // asignarle un vendedor

      // guardar en db
    } catch (e) {
      console.log(e)
      throw new Error('Error al crear el pedido')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}
