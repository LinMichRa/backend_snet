import { Router } from "express";
import multer from "multer";
import { listUsers, login, profile, register, testUser, updateUser, uploadAvatar } from "../controllers/user.js";
import { ensureAuth } from "../middlewares/auth.js";
import { checkEntityExists } from "../middlewares/checkEntityExists.js";
import User from "../models/users.js";

const router = Router();

//Configuracion de subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./uploads/avatars")
    },
    filename: (req, file, cb) =>{
        cb(null, "avatar-"+Date.now+"-"+file.originalname);
    }
});

const uploads = multer({storage});

//Definir las rutas
router.get('/test-user', ensureAuth, testUser)
router.post('/register',register)
router.post('/login',login)
router.get('/profile/:id',ensureAuth, profile)
router.get('/list/:page?',ensureAuth, listUsers)
router.put('/update',ensureAuth, updateUser)
router.post('/upload-avatar', [ensureAuth, checkEntityExists(User, 'user_id'), uploads.single("file0")], uploadAvatar);

//Exportar el Router
export default router;