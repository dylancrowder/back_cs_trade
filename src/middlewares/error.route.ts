import { Request, Response, NextFunction } from "express";
import logger from "../utilities/pino.logger";

function errorRoute(req: Request, res: Response, next: NextFunction) {
  logger.info(`No se encontró la ruta ${req.originalUrl}`);

  // Enviamos la respuesta y terminamos el ciclo de la petición aquí.
  res.status(404).json({
    error: "Página no encontrada",
    message: `No se encontró la ruta ${req.originalUrl}`,
  });
  
  // ELIMINADO: next(); 
}

export default errorRoute;