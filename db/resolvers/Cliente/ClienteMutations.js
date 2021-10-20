import ClienteModel from '../../../models/Cliente'
import isEmpty from 'lodash/isEmpty'

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
  if (!isEmpty(usuarioContext)) {
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

export const actualizarCliente = async (_, { id, input }, context) => {
  const { usuario: usuarioContext } = context
  if (!isEmpty(usuarioContext)) {
    try {
      // verificar si exsite o no el cliente
      let cliente = await ClienteModel.findById(id)
      if (!cliente) {
        throw new Error('Cliente no encontrado')
      }

      // verificar si el el vendedor asignado
      if (cliente.vendedor.toString() !== usuarioContext.id) {
        throw new Error('no tienes los permisos necesario')
      }

      // guardar el cliente
      cliente = await ClienteModel.findOneAndUpdate({ _id: id }, input, { new: true })
      return cliente
    } catch (e) {
      console.log(e)
      throw new Error('Error al editar el cliente')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}

export const eliminarcliente = async (_, { id }, context) => {
  const { usuario: usuarioContext } = context
  if (!isEmpty(usuarioContext)) {
    try {
      // verificar si exsite o no el cliente
      const cliente = await ClienteModel.findById(id)
      if (!cliente) {
        throw new Error('Cliente no encontrado')
      }

      // verificar si el el vendedor asignado
      if (cliente.vendedor.toString() !== usuarioContext.id) {
        throw new Error('no tienes los permisos necesario')
      }

      // eliminar el cliente
      await ClienteModel.findOneAndDelete({ _id: id })

      return 'cliente Eliminado'
    } catch (e) {
      console.log(e)
      throw new Error('Error al eliminar el cliente')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}
