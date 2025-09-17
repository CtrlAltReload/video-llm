import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  course: mongoose.Types.ObjectId;
  title: string;
  description: string;
  requirements?: string[];
  difficulty: "easy" | "medium" | "hard";
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
