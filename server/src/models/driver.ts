import { Schema, model, Document } from "mongoose";

interface IDriver extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  id: number;
  carNumber: string;
  shifts: Schema.Types.ObjectId[];
  status: string;
  employeeType: string;
  factorNumber: number;
  author: Schema.Types.ObjectId;
  shiftStartTime: string;
  shiftEndTime: string;
  livingArea: string;
  city: string;
}

const driverSchema = new Schema<IDriver>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true, trim: true, minlength: 2 },
    lastName: { type: String, required: true, trim: true, minlength: 2 },
    phoneNumber: { type: String, required: true, trim: true, minlength: 10 },
    city: { type: String, required: true, trim: true, minlength: 2 },
    id: { type: Number, required: true, minlength: 9 },
    carNumber: { type: String, required: true, minlength: 2 },
    shifts: [{ type: Schema.Types.ObjectId, ref: "shift" }],
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    employeeType: {
      type: String,
      enum: ["tow-driver", "delivery-driver", "repair-driver"],
      required: true,
    },
    livingArea: {
      type: String,
      enum: ["north", "south", "center"],
      required: true,
    },
    factorNumber: { type: Number, required: true },
    shiftStartTime: { type: String, required: true },
    shiftEndTime: { type: String, required: true },
  },
  { timestamps: true }
);

export const Driver = model<IDriver>("Driver", driverSchema);
