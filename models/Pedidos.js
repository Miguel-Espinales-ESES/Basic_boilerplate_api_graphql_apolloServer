import mongoose from 'mongoose'
import moment from 'moment'

const PedidosSchema = mongoose.Schema({
  pedido: {
    type: Array,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Cliente'
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Usuario'
  },
  estado: {
    type: String,
    default: 'PENDIENTE',
    trim: true
  },
  creado: {
    type: Date,
    default: moment(Date.now())
  }
})

export default mongoose.model('Pedido', PedidosSchema)
