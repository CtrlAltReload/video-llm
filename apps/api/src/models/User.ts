import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  googleId?: string;
  picture?: string;
  username?: string;
  displayName?: string;
  accessToken?: string;
  refreshToken?: string;
  isVerified: boolean;
  createdAt: Date;
  deletedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, unique: true, sparse: true },
    picture: { type: String },
    username: { type: String },
    displayName: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
  },
  { versionKey: false }
);

export default mongoose.model<IUser>("User", UserSchema);
