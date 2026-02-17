import {
  createJob,
  fetchAndStoreJobs,
  getJobs,
  fetchJobsFromAPI,
  getSavedJobs,
} from "../controllers/jobController.js";

export default async function jobRoutes(fastify) {

  // Create job manually
  fastify.post("/jobs", createJob);

  // Get all jobs from DB
  fastify.get("/jobs", getJobs);

  // Fetch from Adzuna and store in DB
  fastify.get("/jobs/fetch", fetchAndStoreJobs);

  // Optional: if using separate controller names
  fastify.get("/jobs/fetch-api", fetchJobsFromAPI);
  fastify.get("/jobs/saved", getSavedJobs);
}
