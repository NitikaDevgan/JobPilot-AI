import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    filename: String,
    text: String, // extracted text
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
