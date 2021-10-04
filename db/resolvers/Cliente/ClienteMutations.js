import ClienteModel from '../../../models/Cliente'

export const nuevoCliente = async (_, { input }, context) => {
  const { email } = input
  const { usuario: usuarioContext } = context
  // Revisar si el client ya esta registrado
  const existeCliente = await ClienteModel.findOne({ email })
  if (existeCliente) {
    throw new Error('El Cliente ya está registrado.')
  }
  const nuevoCliente = new ClienteModel(input)

  // validando si hay token
  if (usuarioContext) {
    // asignar el vendedor
    nuevoCliente.vendedor = usuarioContext.id
    // guardar en DB
    try {
      return await nuevoCliente.save()
    } catch (error) {
      console.log({ Error: error.message })
      throw new Error('Error al guardar Cliente')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}
