import ProductoModel from '../../../models/Producto'

export const obtenerProductos = async (_, { input }) => {
  try {
    const todosLosProductos = await ProductoModel.find({})
    return todosLosProductos
  } catch (e) {
    console.log(e)
  }
}

export const obtenerProductoPorId = async (_, { id }) => {
  try {
    // revisar si el producto existe
    const producto = await ProductoModel.findById(id)
    if (!producto) {
      throw new Error('Producto no encontrado')
    }
    return producto
  } catch (e) {
    throw new Error('Producto no encontrado')
    console.log('Error: ', e)
  }
}
