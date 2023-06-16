import { Schema, model, Document } from "mongoose";

export interface ITemplate extends Document {
  data: string;
}

const TemplateSchema: Schema = new Schema(
  {
    data: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<ITemplate>("template", TemplateSchema);
