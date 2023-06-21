import Version from "../model/Versions";
import { TVersionDocument } from "../types";

export default {
  create: async (requestData: TVersionDocument) => {
    const { documentId, data } = requestData;
    return await Version.create({
      documentId,
      data,
    });
  },

  findById: async (id: string) => {
    return await Version.find({ documentId: id });
  },
};
