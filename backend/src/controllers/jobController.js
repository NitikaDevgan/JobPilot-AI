import Job from "../models/Job.js";

export const createJob = async (req, reply) => {
  const job = await Job.create(req.body);
  reply.code(201).send(job);
};

export const getJobs = async (req, reply) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  reply.send(jobs);
};
