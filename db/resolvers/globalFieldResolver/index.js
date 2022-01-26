import UsuarioModel from '../../../models/usuario'
import ClienteModelo from '../../../models/Cliente'

export const vendedorField = async (_, {}, context) => {
  return await UsuarioModel.findById(_.vendedor)
}

export const clienteField = async (_, {}, context) => {
  return await ClienteModelo.findById(_.clienteId)
}
