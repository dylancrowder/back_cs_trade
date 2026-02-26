import { NextFunction, Request, Response } from "express";


import { createSkinJoi } from "../../../utilities/joi";
import AppError from "../../../utilities/error/appError";
import { SkinService } from "./create.model";

export class SkinController {
  // CREAR skin
  static createSkin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { error, value } = createSkinJoi.validate(req.body, {
        abortEarly: false,
        stripUnknown: false,
      });

      if (error) {
        throw new AppError(
          "ValidationError",
          400,
          error,
          "Datos inválidos. Por favor, revisa los campos del análisis.",
          true
        );
      }


      const bodySend = {
        ...value,
      };


      const newSkin = await SkinService.addSkin(bodySend);

      
      res.status(201).json(newSkin);
    } catch (err) {
      next(err);
    }
  };

}
