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

export const actualizarProducto = async (_, { id, input }) => {
  // revisar si el producto existe
  let producto = await ProductoModel.findById(id)
  if (!producto) {
    throw new Error('Producto no encontrado')
  }
  // guardarlo en la base de datos
  producto = await ProductoModel.findOneAndUpdate({ _id: id }, input, { new: true })
  return producto
}

export const eliminarProducto = async (_, { id }) => {
  // revisar si el producto existe
  const producto = await ProductoModel.findById(id)
  if (!producto) {
    throw new Error('Producto no encontrado')
  }

  // eliminar el producto
  await ProductoModel.findOneAndDelete({ _id: id })

  return 'Producto Eliminado'
}
