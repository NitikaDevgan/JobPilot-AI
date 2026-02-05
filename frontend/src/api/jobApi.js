const API = import.meta.env.VITE_API_URL;

export const fetchJobs = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${API}/jobs?${params}`);
  return res.json();
};
