import { NextFunction, Request, Response } from "express";


import { SkinService } from "./search.model";
import AppError from "../../../utilities/error/appError";

export class SkinController {
  static getAllSkins = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // 1. Agregamos await y los paréntesis ()
      const skins = await SkinService.getAllSkins();

      // 2. Cambiamos a status 200 para una petición GET exitosa
      res.status(200).json(skins);
    } catch (err) {
      next(err);
    }
  };







  static getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const skin = await SkinService.getById(id);
      if (!skin) throw new AppError("NotFound", 404, null, "Skin no encontrada", true);

      res.status(200).json(skin);
    } catch (err) { next(err); }
  };

  static updateSkin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedSkin = await SkinService.update(id, req.body);

      res.status(200).json(updatedSkin);
    } catch (err) { next(err); }
  };

  static deleteSkin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await SkinService.delete(id);

      res.status(200).json({ message: "Skin eliminada correctamente" });
    } catch (err) { next(err); }
  };


}
