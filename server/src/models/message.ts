import { Schema, model, Document } from "mongoose";

interface IMessage extends Document {
  author: Schema.Types.ObjectId;
  roadCall: Schema.Types.ObjectId;
  content: string;
  type: string;
}

const messageSchema = new Schema<IMessage>(
  {
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    roadCall: { type: Schema.Types.ObjectId, ref: "roadCall", required: true },
    content: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["text", "statusChange", "driverAssignment"],
    },
  },
  { timestamps: true }
);

export const Message = model<IMessage>("Message", messageSchema);
