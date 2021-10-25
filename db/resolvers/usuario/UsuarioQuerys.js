// utils
import { verifyToken } from '../../../utils/utilsToken'

export const obtenerUsuario = (_, { Token }) => {
  return (verifyToken(Token))
}
