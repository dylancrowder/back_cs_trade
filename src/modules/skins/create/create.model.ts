/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from "../../../utilities/error/appError";

import SkinModel, { SkinDocument, SkinDTO } from "./create.schema";

export class SkinService {
  // CREAR ANÁLISIS
  static async addSkin(body: SkinDTO): Promise<SkinDocument> {
    try {
      const newSkin = await SkinModel.create(body);
      return await newSkin.save();
    } catch (error: unknown) {
      throw new AppError(
        "InternalServerError",
        500,
        error,
        "Error interno del servidor.",
        true
      );
    }
  }


}
