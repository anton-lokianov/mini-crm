import { Schema, model, Document } from "mongoose";

interface IDriver extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  carNumber: string;
  shifts: Schema.Types.ObjectId[];
  status: string;
  employeeType: string;
  factorNumber: string;
  author: Schema.Types.ObjectId;
  shiftStartTime: string;
  shiftEndTime: string;
  workingArea: string;
  city: string;
}

const driverSchema = new Schema<IDriver>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true, trim: true, minlength: 2 },
    lastName: { type: String, required: true, trim: true, minlength: 2 },
    phoneNumber: { type: String, required: true, trim: true, minlength: 10 },
    city: { type: String, required: true, trim: true, minlength: 2 },
    carNumber: { type: String, required: true, minlength: 2 },
    shifts: [{ type: Schema.Types.ObjectId, ref: "shift" }],
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    employeeType: {
      type: String,
      enum: ["tow-driver", "delivery-driver", "repair-driver"],
      required: true,
    },
    workingArea: {
      type: String,
      enum: ["north", "south", "center"],
      required: true,
    },
    factorNumber: { type: String, required: true },
    shiftStartTime: { type: String, required: true },
    shiftEndTime: { type: String, required: true },
  },
  { timestamps: true }
);

export const Driver = model<IDriver>("Driver", driverSchema);
