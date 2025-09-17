import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type:
    | "project_submission"
    | "feedback_received"
    | "course_completed"
    | "module_completed"
    | "course_enrolled";
  description: string;
  relatedId?: mongoose.Types.ObjectId;
  metadata?: {
    score?: number;
    projectTitle?: string;
    courseTitle?: string;
    [key: string]: any;
  };
  date: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: [
        "project_submission",
        "feedback_received",
        "course_completed",
        "module_completed",
        "course_enrolled",
      ],
      required: true,
    },
    description: { type: String, required: true },
    relatedId: { type: Schema.Types.ObjectId },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);

// Helpers
export const createActivity = async (
  userId: mongoose.Types.ObjectId,
  type: IActivity["type"],
  description: string,
  relatedId?: mongoose.Types.ObjectId,
  metadata?: IActivity["metadata"]
) => {
  const activity = new Activity({
    user: userId,
    type,
    description,
    relatedId,
    metadata,
  });

  return await activity.save();
};

export const getUserRecentActivities = async (
  userId: mongoose.Types.ObjectId,
  limit: number = 10
) => {
  return await Activity.find({ user: userId })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
};
