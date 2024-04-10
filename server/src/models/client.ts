import { Schema, model, Document } from "mongoose";

interface IClient extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  carModal: string;
  carYear: number;
  carColor: string;
  carNumber: string;
  address: string;
  city: string;
  id: number;
  roadCalls: Schema.Types.ObjectId[];
  user: Schema.Types.ObjectId;
}

const clientSchema = new Schema<IClient>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true, trim: true, minlength: 2 },
    lastName: { type: String, required: true, trim: true, minlength: 2 },
    phoneNumber: { type: String, required: true, trim: true, minlength: 7 },
    carModal: { type: String, required: true, minlength: 2 },
    carYear: { type: Number, required: true, minlength: 4 },
    carColor: { type: String, required: true, minlength: 2 },
    carNumber: { type: String, required: true, minlength: 2 },
    address: { type: String, required: true, minlength: 2 },
    city: { type: String, required: true, minlength: 2 },
    id: { type: Number, required: true, minlength: 9, unique: true },
    roadCalls: [{ type: Schema.Types.ObjectId, ref: "roadCall" }],
  },
  { timestamps: true }
);

export const Client = model<IClient>("Client", clientSchema);
