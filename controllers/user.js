import bcrypt from "bcrypt";
import User from "../models/users.js";

//Metodo Registro de Usuarios
export const register = async (req, res) =>{
    try {
        //Obtener los datos de la peticion
        let params = req.body;

        // Validaciones de los datos obtenidos
        if(!params.name ||!params.last_name || !params.email || !params.password || !params.nick){
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            })
        }

        //Crear el objeto de usuario con los datos que ya validamos
        let user_to_save= new User(params);
        user_to_save.email = params.email.toLowerCase();

       // Busca si ya existe un usuario con el mismo email o nick
        const existingUser = await User.findOne({
            $or: [
            { email: user_to_save.email.toLowerCase() },
            { nick: user_to_save.nick.toLowerCase() }
            ]
        });
    
        // Si encuentra un usuario, devuelve un mensaje indicando que ya existe
        if(existingUser) {
            return res.status(409).send({
            status: "error",
            message: "!El usuario ya existe!"
            });
        }
    
        // Cifra la contraseña antes de guardarla en la base de datos
        const salt = await bcrypt.genSalt(10); // Genera una sal para cifrar la contraseña
        const hashedPassword = await bcrypt.hash(user_to_save.password, salt); // Cifra la contraseña
        user_to_save.password = hashedPassword; // Asigna la contraseña cifrada al usuario
    
        // Guardar el usuario en la base de datos
        await user_to_save.save();
    
        // Devolver el usuario registrado
        return res.status(200).json({
            status: "success",
            message: "Registro de usuario exitoso",
            user_to_save
        });

    } catch (error) {
        // Manejo de errores
        console.log("Error en el registro de usuario", error);
        //Devuelve mensaje de error
        return response.status(500).send({
            status: "error",
            message: "Error en el registro de usuario"
        });
    }
}

//Metodo de autenticacion de usuarios (login)
export const login = async(req, res) =>{
    try {
        // Devolver el usuario registrado
        return res.status(200).json({
            status: "success",
            message: "PRUEBA LOGIN"
        });

    } catch (error) {
        // Manejo de errores
        console.log("Error en la autenticacion del usuario", error);
        //Devuelve mensaje de error
        return response.status(500).send({
            status: "error",
            message: "Error en ela autenticacion del usuario"
        });
    }
}