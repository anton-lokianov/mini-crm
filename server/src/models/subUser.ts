import { Schema, model, Document } from "mongoose";
import { IUser } from "./user";

export interface ISubUser extends IUser, Document {
  author: Schema.Types.ObjectId;
}

const subUserSchema = new Schema<ISubUser>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true, trim: true, minlength: 2 },
    lastName: { type: String, required: true, trim: true, minlength: 2 },
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
      enum: ["operator", "manager", "service"],
      default: "service",
    },
    phone: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const SubUser = model<ISubUser>("SubUser", subUserSchema);
