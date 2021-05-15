import mongoose from 'mongoose'
import moment from 'moment'

const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  apellido: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  creado: {
    type: Date,
    default: moment(Date.now())
  }
})

export default mongoose.model('Usuario', UsuarioSchema)
