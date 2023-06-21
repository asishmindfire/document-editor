import Document from "../model/Documents";
import { TDocument, TUpdateDocument } from "../types";

export default {
  create: async (requestData: TDocument) => {
    const { uuid, data } = requestData;
    return await Document.create({
      uuid,
      data,
    });
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
