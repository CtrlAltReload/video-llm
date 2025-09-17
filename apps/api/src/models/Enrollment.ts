import mongoose, { Schema, Document } from "mongoose";
import { ICourse } from "./Course";

export interface IEnrollment extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  completedModules: number;
  updatedAt: Date;
  progress?: number; 
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    completedModules: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

EnrollmentSchema.virtual("progress").get(function (this: IEnrollment) {

  const course = (this as any).course as ICourse;
  if (!course || !course.totalModules) return 0;
  return Math.round((this.completedModules / course.totalModules) * 100);
});

export const Enrollment = mongoose.model<IEnrollment>(
  "Enrollment",
  EnrollmentSchema
);