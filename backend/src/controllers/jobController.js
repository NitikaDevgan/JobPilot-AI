import Job from "../models/Job.js";
import { fetchJobsFromAdzuna } from "../services/adzunaService.js";

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
