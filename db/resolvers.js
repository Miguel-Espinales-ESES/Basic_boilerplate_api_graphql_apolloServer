import UsuarioModel from '../models/usuario'
import bcrypt from 'bcryptjs'

// utils
import { crearToken, verifyToken } from '../utils/utilsToken'

// Resolver
const resolvers = {
  Query: {
    obtenerUsuario: (_, { Token }) => {
      return (verifyToken(Token))
    }
  },
  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      const { email, password } = input
      // Revisar si el usuario ya esta registrado
      const existeUsuario = await UsuarioModel.findOne({ email })
      if (existeUsuario) {
        throw new Error('El usuario ya está registrado.')
      }
      // Hashear su password
      const salt = await bcrypt.genSaltSync(10)
      input.password = await bcrypt.hash(password, salt)
      // Guardarlo en la DB
      try {
        const newUsuario = new UsuarioModel(input)
        newUsuario.save()
        return newUsuario
      } catch (e) {
        console.log(e)
      }
    },
    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input
      // validar si el usuario existe
      const existeUsuario = await UsuarioModel.findOne({ email })
      if (!existeUsuario) {
        throw new Error('No se encuentra ningún usuario asignado a este correo o la contraseña es incorrecta.')
      }
      // validar contaseña
      const passwordCorrecto = await bcrypt.compare(password, existeUsuario.password)
      if (!passwordCorrecto) {
        throw new Error('Correo electronico o contraseña incorrecta.')
      }
      // crear Token
      return { toToken: crearToken(existeUsuario) }
    }
  }
}

export default resolvers
