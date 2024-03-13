import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  company: string;
  subUsers: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true, minlength: 2 },
    lastName: { type: String, required: true, trim: true, minlength: 2 },
    company: { type: String, required: true, trim: true, minlength: 2 },
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      unique: true,
    },
    password: { type: String, required: true, trim: true, minlength: 5 },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
    phone: { type: String, required: true, trim: true },
    subUsers: [{ type: Schema.Types.ObjectId, ref: "SubUser" }],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
