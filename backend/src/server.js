import Fastify from "fastify";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const fastify = Fastify({ logger: true });

connectDB();

fastify.get("/", async () => {
  return { status: "JobPilot backend running 🚀" };
});

fastify.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });
