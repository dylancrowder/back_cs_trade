import { Router } from "express";
import { SkinController } from "./search.controller";


const router = Router();

// Crear un análisis
router.get("/skins", SkinController.getAllSkins);
router.get("/skins/:id", SkinController.getById);      // <-- Nuevo
router.put("/skins/:id", SkinController.updateSkin);   // <-- Nuevo
router.delete("/skins/:id", SkinController.deleteSkin); // <-- Nuevo

export default router;
