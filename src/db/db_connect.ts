/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import logger from "../utilities/pino.logger";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const MONGO_URI = process.env.DB_URI;

// Cache global para reutilizar la conexión en Vercel (evita el buffering timeout)
const cached: {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
} = (global as any).mongoose || { conn: null, promise: null };

if (!(global as any).mongoose) {
  (global as any).mongoose = cached;
}

export const initMongo = async () => {
  if (!MONGO_URI) {
    logger.error("❌ DB_URI no definida en variables de entorno.");
    throw new Error("DB_URI is missing");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // ¡CRÍTICO! Si no hay conexión, falla rápido en vez de esperar
      serverSelectionTimeoutMS: 10000, 
      socketTimeoutMS: 45000,
      family: 4, // Fuerza IPv4 para evitar lentitud en algunas redes
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
      logger.info("✅ MongoDB Conectado");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Resetear para reintentar en la próxima petición
    throw e;
  }

  return cached.conn;
};