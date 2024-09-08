// Importaciones
import { Router } from "express";
import multer from "multer";
import {
  deletePublication,
  feed,
  publicationsUser,
  savePublication,
  showMedia,
  showPublication,
  testPublication,
  uploadMedia
} from "../controllers/publication.js";
import { ensureAuth } from "../middlewares/auth.js";
import { checkEntityExists } from "../middlewares/checkEntityExists.js";
import Publication from "../models/publications.js";
const router = Router();

// Configuración de subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/publications/");
  },
  filename: (req, file, cb) => {
    cb(null, "pub-"+Date.now()+"-"+file.originalname);
  }
});

// Middleware para subida de archivos
const uploads = multer({storage});

// Definir las rutas
router.get('/test-publication', testPublication);
router.post('/new-publication', ensureAuth, savePublication);
router.get('/show-publication/:id', ensureAuth, showPublication);
router.delete('/delete-publication/:id', ensureAuth, deletePublication);
router.get('/publications-user/:id/:page?', ensureAuth, publicationsUser);
router.post('/upload-media/:id', [ensureAuth, checkEntityExists(Publication, 'id'), uploads.single("file0")], uploadMedia);
router.get('/media/:file', showMedia);
router.get('/feed/:page?', ensureAuth, feed);

// Exportar el Router
export default router;