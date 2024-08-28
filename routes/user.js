import { Router } from "express";
import { login, register, testUser } from "../controllers/user.js";
import { ensureAuth } from "../middlewares/auth.js";

const router = Router();

//Definir las rutas
router.get('/test-user', ensureAuth, testUser)
router.post('/register',register)
router.post('/login',login)

//Exportar el Router
export default router;