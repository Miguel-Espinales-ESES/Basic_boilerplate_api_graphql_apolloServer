import mongoose from "mongoose";
import moment from "moment";

const ClienteSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  apellido: {
    type: String,
    require: true,
    trim: true,
  },
  empresa: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  telefono: {
    type: String,
    trim: true,
  },

  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Usuario'
  },

  creado: {
    type: Date,
    default: moment(Date.now()),
  },
});

export default mongoose.model("Cliente", ClienteSchema);
