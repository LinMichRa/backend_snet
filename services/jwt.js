import jwt from "jwt-simple";
import moment from 'moment';

//Clave secreta
const secret = 'llave_secreta_:D';

//Generar Token
const createToken = (user) => {
    const payload = {
        userId: user._id,
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
