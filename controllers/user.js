import bcrypt from "bcrypt";
import User from "../models/users.js";
import { createToken } from "../services/jwt.js";

// Metodo de prueba de usuario
export const testUser = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde el controlador user.js",
        user: req.user
    });
}

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

//Metodo de autenticacion de usuarios (login) usando JWT
export const login = async(req, res) =>{
    try {
        //Obtener los parametros del body
        let params = req.body;

        //Validar parámetros: email y password
        if(!params.email || !params.password) {
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            })
        }

        //Buscar en la BD si existe el email recibido
        const user = await User.findOne({email: params.email.toLowerCase()})

        //Si no existe el usuario
        if(!user){
            return res.status(200).send({
                status:"error",
                message:"Usuario no encontrado"
            })
        }

        //Comprobar la contraseña
        const validPassword = await bcrypt.compare(params.password, user.password);

        //Si la contraseña es incorrecta
        if(!validPassword){
            return res.status(401).send({
                status:"error",
                message:"Contraseña Incorrecta"
            })
        }

        //Generar token de autenticacion
        const token = createToken(user);

        //Devolver Token y datos del usuario autenticado
        return res.status(200).json({
            status: "success",
            message: "Login exitoso",
            token,
            user:{
                id: user._id,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                nick: user.nick,
                image: user.image,
                created_at: user.created_at
            }
        });

    } catch (error) {
        // Manejo de errores
        console.log("Error en la autenticacion del usuario", error);
        //Devuelve mensaje de error
        return response.status(500).send({
            status: "error",
            message: "Error en la autenticacion del usuario"
        });
    }
}

//Mostrar perfil del usuario
export const profile = async(req,res) =>{
    try {
        //Obtener ID del usuario desde los parametros de la URL
        const userId=req.params.id;

        //Buscar al usuario en la base de datos y excluimos los datos que no queremos mostrar
        const user = await User.findById(userId).select('-password -role -email -__v');

        //Verificar si el usuario existe
        if(!user){
            return res.status(404).send({
                status:"success",
                message: "Usuario no encontrado"
            });
        }
        
        //Devolver la informacion del perfil del usuario
        return res.status(200).json({
            status:"success",
            user
        });

    } catch (error) {
        console.log("Error al obtener el perfil del usuario", error)
        return res.status(200).send({
            status: "error",
            message: "Error al obtener el perfil del usuario"
        });
    }
}