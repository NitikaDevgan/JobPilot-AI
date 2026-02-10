import { createJob, fetchAndStoreJobs, getJobs } from "../controllers/jobController.js";

export default async function jobRoutes(fastify) {
  fastify.post("/jobs", createJob);
  fastify.get("/jobs", getJobs);

  fastify.get("/jobs/fetch", fetchAndStoreJobs);
}


