import { createJob, getJobs } from "../controllers/jobController.js";

export default async function jobRoutes(fastify) {
  fastify.post("/jobs", createJob);
  fastify.get("/jobs", getJobs);
}


