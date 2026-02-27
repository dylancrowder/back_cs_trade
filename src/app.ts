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

declare module "express-serve-static-core" {
  interface Request {
    user?: Record<string, unknown>;
  }
}



// Middlewares
import errorHandler from "./middlewares/error.middleware";
import errorRoute from "./middlewares/error.route";
import monitor from "./middlewares/monitor.middeware";

// Routes
import createRoutes from "./modules/skins/create/create.routes";
import searchRoutes from "./modules/skins/search/search.routes";


import { initMongo } from "./db/db_connect";


const app = express();

// Inicializar MongoDB
initMongo().catch((err) => {
  console.error("Error inicializando Mongo:", err);
  process.exit(1);
});

// Middlewares de seguridad y performance
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: ["https://cs2-trade-app.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(compression());
app.use(bodyParser.json({ limit: "300kb" }));
app.use(apiLimiter);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(monitor);

// Rutas

app.get("/", (req, res) => {
  res.json({ message: "hola!!" });
});

app.use("/api", createRoutes);
app.use("/api", searchRoutes);
// documentacion
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas no encontradas
app.use(errorRoute);

// Manejo de errores
app.use(errorHandler);

export default app;
