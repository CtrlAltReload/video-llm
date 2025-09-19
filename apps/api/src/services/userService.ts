import User, { IUser } from "../models/User";

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find({ deletedAt: { $exists: false } }).exec();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findOne({
    _id: id,
    deletedAt: { $exists: false },
  }).exec();
};

export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
  const user = new User(data);
  return await user.save();
};

export const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findOneAndUpdate(
    { _id: id, deletedAt: { $exists: false } },
    data,
    { new: true }
  ).exec();
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findOneAndUpdate(
    { _id: id, deletedAt: { $exists: false } },
    { deletedAt: new Date() },
    { new: true }
  ).exec();
};

export const getAllUsersIncludingDeleted = async (): Promise<IUser[]> => {
  return await User.find().exec();
};

export const getDeletedUsers = async (): Promise<IUser[]> => {
  return await User.find({ deletedAt: { $exists: true } }).exec();
};

export const restoreUser = async (id: string): Promise<IUser | null> => {
  return await User.findOneAndUpdate(
    { _id: id, deletedAt: { $exists: true } },
    { $unset: { deletedAt: 1 } },
    { new: true }
  ).exec();
};

export const permanentlyDeleteUser = async (
  id: string
): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id).exec();
};

export const getUserByIdIncludingDeleted = async (
  id: string
): Promise<IUser | null> => {
  return await User.findById(id).exec();
};
