import { Schema, model, Document } from "mongoose";

interface IShift extends Document {
  driver: Schema.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  callsAssigned: Schema.Types.ObjectId[];
  callsCompleted: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
}

const shiftSchema = new Schema<IShift>({
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  driver: { type: Schema.Types.ObjectId, ref: "driver", required: true },
  startTime: { type: Date },
  endTime: { type: Date },
  callsAssigned: [{ type: Schema.Types.ObjectId, ref: "roadCall" }],
  callsCompleted: [{ type: Schema.Types.ObjectId, ref: "roadCall" }],
});

export const Shift = model<IShift>("Shift", shiftSchema);
