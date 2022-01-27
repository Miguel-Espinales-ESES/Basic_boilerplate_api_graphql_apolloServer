import ProductoModel from '../../../models/Producto'
import isEmpty from 'lodash/isEmpty'

export const obtenerProductos = async (_, { input }) => {
  try {
    const todosLosProductos = await ProductoModel.find({})
    return todosLosProductos
  } catch (e) {
    console.log(e)
  }
}

export const obtenerProductoPorId = async (_, { id }, context) => {
  // const { usuario: usuarioContext} = context
  // if (!usuarioContext) {
  //   throw new Error(`Unauthenticated!`);
  // }
  try {
    // revisar si el producto existe
    const producto = await ProductoModel.findById(id)
    if (!producto) {
      throw new Error('Producto no encontrado')
    }
    return producto
  } catch (e) {
    throw new Error('Producto no encontrado')
  }
}

export const buscarProducto = async (_, { texto }, context) => {
  const { usuario: usuarioContext } = context
  if (!isEmpty(usuarioContext)) {
    try {
      const productos = await ProductoModel.find({ $text: { $search: texto } })
      return productos
    } catch (e) {
      console.log(e)
      throw new Error('Productos no encontrados')
    }
  } else {
    throw new Error('token inválido no identificado')
  }
}
