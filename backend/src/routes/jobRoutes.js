import { createJob, fetchAndStoreJobs, getJobs,fetchJobsFromAPI,getSavedJobs } from "../controllers/jobController.js";

const router = express.Router();

export default async function jobRoutes(fastify) {
  fastify.post("/jobs", createJob);
  fastify.get("/jobs", getJobs);
  

  fastify.get("/jobs/fetch", fetchAndStoreJobs);
  router.get("/fetch", fetchJobsFromAPI);   
router.get("/", getSavedJobs);  
}

