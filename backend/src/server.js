import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import connectDB from "../src/config.js/db.js";
import jobRoutes from "../src/routes/jobRoutes.js";

const fastify = Fastify({ logger: true });
fastify.register(jobRoutes, { prefix: "/api" });

connectDB();

fastify.get("/", async () => {
  return { status: "JobPilot backend running 🚀" };
});

fastify.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });
