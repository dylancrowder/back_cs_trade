/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from "../../../utilities/error/appError";
import SkinModel, { SkinDocument, SkinDTO } from "../create/create.schema";



export class SkinService {
  // MOSTRAR TODAS LAS SKINS
  static async getAllSkins(): Promise<SkinDocument[]> {
    try {
      const skins = await SkinModel.find()


      return skins;
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

// OBTENER UNA POR ID
  static async getById(id: string): Promise<SkinDocument | null> {
    try {
      return await SkinModel.findById(id);
    } catch (error: unknown) {
      throw new AppError("NotFound", 404, error, "Skin no encontrada.", true);
    }
  }

  // ACTUALIZAR
  static async update(id: string, data: Partial<SkinDTO>): Promise<SkinDocument | null> {
    try {
      // { new: true } devuelve el objeto ya actualizado
      return await SkinModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error: unknown) {
      throw new AppError("BadRequest", 400, error, "Error al actualizar la skin.", true);
    }
  }

  // ELIMINAR
  static async delete(id: string): Promise<void> {
    try {
      await SkinModel.findByIdAndDelete(id);
    } catch (error: unknown) {
      throw new AppError("InternalError", 500, error, "Error al eliminar la skin.", true);
    }
  }



}
