import { Schema, model, Document } from "mongoose";

export interface IDocument extends Document {
  uuid: string;
  data: string;
}

const DocumentSchema: Schema = new Schema(
  {
    uuid: { type: String, required: true },
    data: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IDocument>("document", DocumentSchema);
