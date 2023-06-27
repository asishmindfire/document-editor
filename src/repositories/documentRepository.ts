import Document from "../model/Documents";
import { TDocument, TUpdateDocument } from "../types";

export default {
  create: async (requestData?: TDocument) => {
    const response = await Document.create({
      data: requestData?.data || "",
    });
    return response._id;
  },

  findById: async (uuid: string) => {
    return await Document.findOne({ uuid });
  },

  findAll: async () => {
    return await Document.find();
  },

  update: async (id: string, data: TUpdateDocument) => {
    return await Document.updateOne({ _id: id }, data, { upsert: false });
  },
};
