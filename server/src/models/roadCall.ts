import { Schema, model, Document } from "mongoose";

interface IRoadCall extends Document {
  client: Schema.Types.ObjectId;
  creator: Schema.Types.ObjectId;
  phoneNumber: number;
  secondPhoneNumber: number;
  date: Date;
  time: string;
  location: string;
  description: string;
  finalLocation: string;
  status: string;
  statusTimestamp: Date;
  driver: Schema.Types.ObjectId;
  messages: Schema.Types.ObjectId[];
  serviceType: string;
  serviceCall: number;
  area: string;
  author: Schema.Types.ObjectId;
}

const roadCallSchema = new Schema<IRoadCall>(
  {
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    client: { type: Schema.Types.ObjectId, ref: "client" },
    phoneNumber: { type: Number, required: true, trim: true, minlength: 10 },
    secondPhoneNumber: { type: Number, trim: true, minlength: 10 },
    date: { type: Date, trim: true, minlength: 2, default: Date.now },
    time: { type: String, trim: true, minlength: 2 },
    location: { type: String, required: true, trim: true, minlength: 2 },
    description: { type: String, trim: true, minlength: 2 },
    finalLocation: { type: String, trim: true, minlength: 2 },
    status: {
      type: String,
      enum: ["pending", "inProgress", "arrival", "done"],
      required: true,
      default: "pending",
    },
    statusTimestamp: { type: Date, default: Date.now },
    driver: { type: Schema.Types.ObjectId, ref: "driver" },
    messages: [{ type: Schema.Types.ObjectId, ref: "massage" }],
    serviceType: {
      type: String,
      enum: ["towing", "repair", "delivery"],
      required: true,
      default: "towing",
    },
    serviceCall: { type: Number, default: 0 },
    area: {
      type: String,
      enum: ["north", "south", "center"],
      required: true,
    },
  },
  { timestamps: true }
);

export const RoadCall = model<IRoadCall>("RoadCall", roadCallSchema);
