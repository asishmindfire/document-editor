import { Schema, model, Document } from "mongoose";

export interface IVersion extends Document {
  data: string;
  time: Date;
}

const VersionSchema: Schema = new Schema({
  data: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

export default model<IVersion>("version", VersionSchema);
