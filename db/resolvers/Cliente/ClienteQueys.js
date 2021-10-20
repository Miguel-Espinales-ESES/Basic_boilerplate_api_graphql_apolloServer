import ClienteModel from '../../../models/Cliente'
import UsuarioModel from '../../../models/usuario'
import isEmpty from 'lodash/isEmpty'

export const obtenerCliente = async (_, { input }, context) => {
  try {
    return await ClienteModel.find({})
    /* const resultado = await ClienteModel.aggregate([
            {
                $lookup: {
                    from: "usuarios",
                    localField: "vendedor",
                    foreignField: "_id",
                    as: "vendedor"
                },
            },
            {
                $unwind: "$vendedor"
            }
        ]) */
  } catch (e) {
    console.log(e)
    throw new Error('Error al obtener la lista de cliente')
  }
}

export const obtenerClienteVendedor = async (_, {}, context) => {
  const { usuario: usuarioContext } = context
  if (!isEmpty(usuarioContext)) {
    try {
      return await ClienteModel.find({ vendedor: usuarioContext.id.toString() })
    } catch (e) {
      console.log(e)
      throw new Error('Error al obtener la lista de cliente')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}

export const clienteById = async (_, { id }, context) => {
  const { usuario: usuarioContext } = context
  if (!isEmpty(usuarioContext)) {
    try {
      // revisar si el cliente existe en la db
      const cliente = await ClienteModel.findById(id)
      if (!cliente) {
        throw new Error('Cliente no encontrado')
      }

      // validar la creacion del cliente por el vendedor
      if (cliente.vendedor.toString() !== usuarioContext.id) {
        throw new Error('no tienes los permisos necesario')
      }

      return cliente
    } catch (e) {
      console.log(e)
      throw new Error('Error al obtener el cliente')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}

export const vendedorField = async (_, {}, context) => {
  return await UsuarioModel.findById(_.vendedor)
}
