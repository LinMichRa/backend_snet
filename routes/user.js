import { Router } from "express";
import { login, register, testUser } from "../controllers/user.js";

const router = Router();

//Definir las rutas
router.get('/tesst-user',testUser)
router.post('/register',register)
router.post('/login',login)

//Exportar el Router
export default router;