import axios from "axios";
import Job from "../models/Job.js";

const ADZUNA_BASE_URL = "https://api.adzuna.com/v1/api/jobs";
const COUNTRY = "in";

const APP_ID = process.env.ADZUNA_APP_ID;
const APP_KEY = process.env.ADZUNA_APP_KEY;

export const fetchAndSaveJobs = async ({
  what,
  where,
  page = 1,
  resultsPerPage = 10,
}) => {
  try {
    const response = await axios.get(
      `${ADZUNA_BASE_URL}/${COUNTRY}/search/${page}`,
      {
        params: {
          app_id: APP_ID,
          app_key: APP_KEY,
          what,
          where,
          results_per_page: resultsPerPage,
          content_type: "application/json",
        },
      }
    );

    const jobs = response.data.results;

    const savedJobs = [];

    for (const job of jobs) {
      const jobData = {
        adzunaId: job.id,
        title: job.title,
        company: job.company?.display_name,
        location: job.location?.display_name,
        description: job.description,
        category: job.category?.label,
        salaryMin: job.salary_min,
        salaryMax: job.salary_max,
        redirectUrl: job.redirect_url,
      };

      // Upsert (update if exists, create if not)
      const saved = await Job.findOneAndUpdate(
        { adzunaId: job.id },
        jobData,
        { upsert: true, new: true }
      );

      savedJobs.push(saved);
    }

    return savedJobs;
  } catch (error) {
    console.error("Error fetching/saving jobs:", error.message);
    throw new Error("Failed to fetch and save jobs");
  }
};


// adzunaService.js is a service layer that talks to the Adzuna API on behalf of your backend.
// It:
// Calls Adzuna’s API
// Sends your app_id & app_key
// Fetches job listings
// Returns clean job data to your controllers- this is the heart of the api integration.