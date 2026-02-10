import axios from "axios";

const BASE_URL = "https://api.adzuna.com/v1/api/jobs";

export const fetchJobsFromAdzuna = async ({
  what = "developer",
  where = "remote",
  page = 1,
}) => {
  const { ADZUNA_APP_ID, ADZUNA_APP_KEY, ADZUNA_COUNTRY } = process.env;

  const url = `${BASE_URL}/${ADZUNA_COUNTRY}/search/${page}`;

  const response = await axios.get(url, {
    params: {
      app_id: ADZUNA_APP_ID,
      app_key: ADZUNA_APP_KEY,
      what,
      where,
      results_per_page: 20,
      content_type: "application/json",
    },
  });

  return response.data.results;
};


// adzunaService.js is a service layer that talks to the Adzuna API on behalf of your backend.
// It:
// Calls Adzuna’s API
// Sends your app_id & app_key
// Fetches job listings
// Returns clean job data to your controllers