import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    description: String,

    skills: [String],
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
    },
    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
    },

    postedAt: Date,
    applyUrl: String,

    source: String, // Adzuna, etc.
    matchScore: Number, // AI score (0–100)
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
