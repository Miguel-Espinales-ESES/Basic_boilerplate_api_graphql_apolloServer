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
        vendedor: Usuario
    }

    type clienteVendedor {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        creado: String
        telefono: String
        vendedor: Usuario
    }

    type pedidoGrupo {
        id: ID!
        cantidad: Int!
    }

    type pedido {
        id: ID
        pedido: [pedidoGrupo]
        total: Float
        cliente: cliente
        vendedor: Usuario
        fecha: String
        estado: estadoPedido
    }

    type Token {
        toToken: String
    }

    type TopClientes {
        total: Float
        cliente: cliente
    }

    type TopVendedor {
        total: Float
        vendedor: Usuario
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

    input pedidoProductoInput {
        id: ID!
        cantidad: Int!
    }

    input pedidoInput {
        pedido: [pedidoProductoInput]!
        total: Float!
        clienteId: ID!
        estado: estadoPedido
    }

    input filterPedidos {
        estado: estadoPedido
    }

    enum estadoPedido {
        PENDIENTE
        COMPLETADO
        CANCELADO
    }

    type Query {
        # usuario
        obtenerUsuario(Token: String!): Usuario

        # productos
        obtenerProductos: [Producto]
        obtenerProductoPorId(id: ID!) : Producto
        
        #cliente
        obtenerCliente: [clienteVendedor]
        obtenerClienteVendedor: [cliente]
        clienteById(id: ID!): cliente

        #Pedidos
        obtenerPedidos(filter: filterPedidos): [pedido]
        obtenerPedidoVendedor(filter: filterPedidos): [pedido]
        obtenerPedidoPorId(id: ID!): pedido

        #Busquedas Avanzadas
        mejoresClientes: [TopClientes]
        mejoresVendedores: [TopVendedor]
        buscarProducto(texto: String!): [Producto]
    }

    type Mutation {
        # usuario
        nuevoUsuario(input: UsuarioInput!): Usuario
        autenticarUsuario(input: AutenticarInput!) : Token

        # producto
        nuevoProducto(input: ProductoInput!) : Producto
        actualizarProducto(id: ID!, input: ProductoInput!) : Producto
        eliminarProducto(id: ID!) : String

        #cliente
        nuevoCliente(input: clienteInput!) : cliente
        actualizarCliente(id: ID!, input:clienteInput!): cliente
        eliminarcliente(id: ID!) : String

        #Pedidos
        nuevoPedido(input: pedidoInput!): pedido
        actualizarPedido(id: ID!, input:pedidoInput!): pedido
        eliminarPedido(id: ID!): String
    }


`

export default typeDefs
