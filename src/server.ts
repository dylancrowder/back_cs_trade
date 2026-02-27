import app from "./app";
import logger from "./utilities/pino.logger";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});

// Manejo de errores no capturados
process.on("unhandledRejection", (reason: Error) => {
  logger.error({
    message: "Unhandled Rejection detectado:",
    reason: reason.message,
    stack: reason.stack,
  });
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (error: Error) => {
  logger.error({
    message: "Uncaught Exception detectado:",
    error: error.message,
    stack: error.stack,
  });
  server.close(() => process.exit(1));
});

export default server;
