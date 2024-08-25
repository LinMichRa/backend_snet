import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import connection from "./database/connection.js";
import UserRoutes from "./routes/user.js";

//Mensaje de bienvenida para verificar que ejecutó bien la API de NNode
console.log("API Node en ejecución")

//Conexión a la BD
connection();

//Crear el servidor de Node
const app = express();
const puerto = process.env.PORT || 3900;

//Configurar cors para hacer las peticiones correctamente
app.use(cors({
    origin:'*',
    methods:'GET, HEAD, PUT, PATCH, POST, DELETE'
}));

//Decodificar los datos desde los formularios para convertiirlos en objectos JS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Configurar rutas del aplicativo
app.use('/api/user', UserRoutes);

//Rutas de prueba
app.get('/ruta-prueba',(req, res)=>{
    return res.status(200).json(
        {
            'id':1,
            'name':'Linda Ramírez',
            'username': 'LinMich'
        }
    );
});



//Confiigurar el servidor Node
app.listen(puerto, ()=>{
    console.log("Servidor de Node ejecutandose en el puerto", puerto)
})

export default app;