import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config({ path: '.env' })
const LLAVE_SECRETA = process.env.LLAVE_SECRETA
const DURACION_TOKEN = process.env.DURACION_TOKEN

const crearToken = (usuario) => {
  const { id, nombre, apellido, email } = usuario
  return jwt.sign(
    {
      id,
      nombre,
      apellido,
      email
    },
    LLAVE_SECRETA,
    {
      expiresIn:
        DURACION_TOKEN
    })
}

const verifyToken = async (Token) => {
  return (await jwt.verify(Token, LLAVE_SECRETA))
}

export {
  crearToken,
  verifyToken
}
