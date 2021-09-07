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

    type cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        creado: String
        telefono: String
        vendedor: ID
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

    input clienteInput {
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
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
        actualizarProducto(id: ID!, input: ProductoInput!) : Producto
        eliminarProducto(id: ID!) : String

        #cliente
        nuevoCliente(input: clienteInput) : cliente
    }


`

export default typeDefs
