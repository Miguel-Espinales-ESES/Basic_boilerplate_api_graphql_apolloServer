import isEmpty from 'lodash/isEmpty'
import PedidoModelo from '../../../models/Pedidos'
// utils
import { verifyToken } from '../../../utils/utilsToken'

export const obtenerUsuario = (_, { Token }) => {
  return (verifyToken(Token))
}

export const mejoresVendedores = async (_, {}, context) => {
  const { usuario: usuarioContext } = context
  if (!isEmpty(usuarioContext)) {
    try {
      const topVendedores = await PedidoModelo.aggregate([
        { $match: { estado: 'COMPLETADO' } },
        {
          $group: {
            _id: '$vendedor',
            total: { $sum: '$total' }
          }
        },
        {
          $lookup: {
            from: 'usuarios',
            localField: '_id',
            foreignField: '_id',
            as: 'vendedor'
          }
        },
        { $limit: 3 },
        { $unwind: '$vendedor' },
        { $sort: { total: -1 } }
      ])

      return topVendedores
    } catch (e) {
      console.log(e)
      throw new Error('Error al obtener el cliente')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}
