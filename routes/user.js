import { Router } from "express";
import { login, register } from "../controllers/user.js";

const router = Router();

//Definir las rutas
router.post('/register',register)
router.post('/login',login)

//Exportar el Router
export default router;