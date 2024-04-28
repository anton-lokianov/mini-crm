import { Document, Schema, model } from "mongoose";

interface IRegisterToken extends Document {
  token: string;
  email: string;
}

const registerTokenSchema = new Schema<IRegisterToken>({
  token: { type: String, required: true },
  email: { type: String, required: true },
});

export const RegisterToken = model<IRegisterToken>(
  "RegisterToken",
  registerTokenSchema
);
