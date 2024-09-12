import dotenv from 'dotenv';
import jwt from "jwt-simple";
import moment from 'moment';

dotenv.config();
//Clave secreta
const secret = process.env.SECRET_KEY;

//Generar Token
const createToken = (user) => {
    const payload = {
        userId: user._id,
        name: user.name,
        role: user.role,
        //Fecha emision
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    //Devolver jwt_token codificado
    return jwt.encode(payload, secret);
};

export {
    createToken, secret
};
