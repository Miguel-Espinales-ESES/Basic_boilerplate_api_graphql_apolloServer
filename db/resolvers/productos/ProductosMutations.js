import ProductoModel from '../../../models/Producto'

export const nuevoProducto = async (_, { input }) => {
  try {
    const producto = new ProductoModel(input)
    // almacenar en la db
    const resultado = await producto.save()
    return resultado
  } catch (e) {
    console.log(e)
  }
}
