import { Router } from "express";
import { SkinController } from "./create.controller";


const router = Router();

// Crear un análisis
router.post("/create", SkinController.createSkin);


export default router;
