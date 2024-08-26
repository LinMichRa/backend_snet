import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

const connection = async() => {
    try {
        await connect(process.env.MONGODB_URI)
        console.log("Conectado correctamente a social_networking")
    } catch (error) {
        console.log("Error al conectar la base de datos", error)
        throw new Error("No se ha podido conectar a la base")
    }
}

export default connection;