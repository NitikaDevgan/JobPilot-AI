import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "OK", message: "JobPilot AI Backend Running 🚀" };
});

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
