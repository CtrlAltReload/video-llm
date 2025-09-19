import mongoose, { Schema, Document } from "mongoose";

export interface IModule extends Document {
  course: mongoose.Types.ObjectId;
  title: string;
  content?: string;
  orderIndex: number;
  estimatedMinutes?: number;
  createdAt: Date;
}

const ModuleSchema = new Schema<IModule>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    content: { type: String },
    orderIndex: { type: Number, required: true },
    estimatedMinutes: { type: Number, default: 30 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Module = mongoose.model<IModule>("Module", ModuleSchema);
