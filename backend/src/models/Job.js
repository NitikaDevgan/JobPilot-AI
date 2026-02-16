import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    adzunaId: {
      type: String,
      required: true,
      unique: true, // prevents duplicates
    },
    title: String,
    company: String,
    location: String,
    description: String,
    category: String,
    salaryMin: Number,
    salaryMax: Number,
    redirectUrl: String,
    source: {
      type: String,
      default: "adzuna",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
