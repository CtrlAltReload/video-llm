import mongoose, { Schema, Document } from "mongoose";
import { Enrollment } from "./Enrollment";

export interface ICourse extends Document {
  title: string;
  description?: string;
  level: "beginner" | "intermediate" | "advanced";
  totalModules: number;
  estimatedHours?: number;
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    totalModules: { type: Number, required: true },
    estimatedHours: { type: Number },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Course = mongoose.model<ICourse>("Course", CourseSchema);

// Helper
export const getUserOngoingCourses = async (
  userId: mongoose.Types.ObjectId
) => {
  return await Enrollment.find({
    user: userId,
    completedAt: { $exists: false },
  })
    .populate("course")
    .sort({ lastAccessedAt: -1 })
    .lean();
};