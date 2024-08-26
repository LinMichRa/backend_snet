import { Router } from "express";
import { testPublication } from "../controllers/publication.js";

const router = Router();

//Definir las rutas
router.get('/test-publication',testPublication);

//Exportar el Router
export default router;