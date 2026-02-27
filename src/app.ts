import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { swaggerDocs } from "./documentation/swagger.config";
import { apiLimiter } from "./utilities/apiLimiter";

// Middlewares
import errorHandler from "./middlewares/error.middleware";
import errorRoute from "./middlewares/error.route";
import monitor from "./middlewares/monitor.middeware";

// Routes
import createRoutes from "./modules/skins/create/create.routes";
import searchRoutes from "./modules/skins/search/search.routes";

import { initMongo } from "./db/db_connect";

const app = express();

// 1. Middlewares de configuración base
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: ["https://cs-trade-front.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(compression());
app.use(bodyParser.json({ limit: "300kb" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(monitor);

// 2. MIDDLEWARE DE CONEXIÓN (ESTO ARREGLA EL ERROR EN VERCEL)
// Se asegura de que cada petición espere a que MongoDB esté conectado
app.use(async (req, res, next) => {
  try {
    await initMongo();
    next();
  } catch (err) {
    next(err); // Envía el error al errorHandler si la DB falla
  }
});

// 3. Rutas
app.get("/", (req, res) => {
  res.json({ message: "Servidor activo y conectado a DB" });
});


// Rutas de la API (con limitador solo aquí si lo deseas)
app.use("/api", apiLimiter, createRoutes);
app.use("/api", apiLimiter, searchRoutes);

// Documentación
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 4. Manejo de errores (Orden crítico)
app.use(errorRoute);  // Captura 404
app.use(errorHandler); // Captura 500 (Asegúrate de que reciba 4 parámetros)

export default app;