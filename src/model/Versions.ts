import { Schema, model, Document } from "mongoose";
import { IDocument } from "./Documents";

export interface IVersion extends Document {
  data: string;
  time: Date;
  documentId: IDocument["_id"];
}

const VersionSchema: Schema = new Schema({
  data: { type: String, required: true },
  documentId: { type: Schema.Types.ObjectId, ref: "document", require: true },
  time: { type: Date, default: Date.now },
});

export default model<IVersion>("version", VersionSchema);
