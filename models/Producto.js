import mongoose, { model } from 'mongoose'
import moment from 'moment'

const ProductoSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  existencia: {
    type: Number,
    require: true,
    trim: true
  },
  precio: {
    type: Number,
    require: true,
    trim: true
  },
  creado: {
    type: Date,
    default: moment(Date.now())
  }
})

ProductoSchema.index({ nombre: 'text' })

export default model('Producto', ProductoSchema)
