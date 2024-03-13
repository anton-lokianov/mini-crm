import { Schema, model, Document } from "mongoose";

interface INotification extends Document {
  roadCall: Schema.Types.ObjectId;
  message: string;
  author: Schema.Types.ObjectId;
}

const notificationSchema = new Schema<INotification>(
  {
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    roadCall: { type: Schema.Types.ObjectId, ref: "roadCall", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Notification = model<INotification>(
  "Notification",
  notificationSchema
);
