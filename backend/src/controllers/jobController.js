import Job from "../models/Job.js";
import { fetchJobsFromAdzuna,fetchAndSaveJobs  } from "../services/adzunaService.js";

export const createJob = async (req, reply) => {
  const job = await Job.create(req.body);
  reply.code(201).send(job);
};

export const getJobs = async (req, reply) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  reply.send(jobs);
};

export const fetchAndStoreJobs = async (req, reply) => {
  const jobs = await fetchJobsFromAdzuna(req.query);

  const formattedJobs = jobs.map((job) => ({
    title: job.title,
    company: job.company?.display_name,
    location: job.location?.display_name,
    description: job.description,
    applyUrl: job.redirect_url,
    postedAt: job.created,
    source: "Adzuna",
  }));

  await Job.insertMany(formattedJobs, { ordered: false });

  reply.send({
    message: "Jobs fetched and stored successfully",
    count: formattedJobs.length,
  });
};

export const fetchJobsFromAPI = async (req, res) => {
  try {
    const jobs = await fetchAndSaveJobs(req.query);
    res.status(200).json({
      message: "Jobs fetched & saved successfully",
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
