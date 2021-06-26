import { gql } from 'apollo-server'
// Schema
const typeDefs = gql`
    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }
    type Producto {
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        creado: String
    }

    type Token {
        toToken: String
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    input ProductoInput {
        nombre: String!
        existencia: Int!
        precio: Float!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    type Query {
        # usuario
        obtenerUsuario(Token: String!): Usuario
        # productos
        obtenerProductos: [Producto]
        obtenerProductoPorId(id: ID!) : Producto
    }

    type Mutation {
        # usuario
        nuevoUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AutenticarInput) : Token

        # producto
        nuevoProducto(input: ProductoInput) : Producto
    }


`

export default typeDefs
