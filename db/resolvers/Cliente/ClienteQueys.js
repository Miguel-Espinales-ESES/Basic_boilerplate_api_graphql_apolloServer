import ClienteModel from "../../../models/Cliente";

export const obtenerCliente = async (_, { input }, context )  => {
    try {
        return await ClienteModel.find({});
    }
    catch (e) {
        console.log(e)
        throw new Error("Error al obtener la lista de cliente");
    }
}

export const obtenerClienteVendedor = async (_, {}, context) => {
    const { usuario: usuarioContext} = context
    try {
        return await ClienteModel.find({vendedor: usuarioContext.id.toString()});
    }
    catch (e) {
        console.log(e)
        throw new Error("Error al obtener la lista de cliente");
    }
}