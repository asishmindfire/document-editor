import logger from "../logger";
import documentRepository from "../repositories/documentRepository";
import versionRepository from "../repositories/versionRepository";
import { TDocument, TRestoreVersion } from "../types";
import { Base64 } from "js-base64";

/**
 *
 * {success: true, data: {}}
 * {success: false, error: {}}
 */

export const createDocument = async (templateId?: string) => {
  if (templateId) {
    //todo template
  } else {
    const documentId = await documentRepository.create();
    if (documentId) {
      return {
        status: true,
        data: documentId,
      };
    }
  }
  return {
    status: 1,
    statusCode: 400,
    message: "error",
  };
};
export const saveDocument = async (request: TDocument) => {
  try {
    const { uuid, data } = request;
    const documents = await documentRepository.findById(uuid);

    if (documents) {
      const documentVersionToBeCreated = await versionRepository.create({
        documentId: documents._id,
        data: documents.data,
      });
      if (documentVersionToBeCreated._id) {
        const id = documents["_id"];
        const documentData = {
          data,
        };
        const documentToBeUpdated = await documentRepository.update(
          id,
          documentData
        );

        if (
          documentToBeUpdated.acknowledged &&
          documentToBeUpdated.modifiedCount === 1
        ) {
          logger.info(`New version has been created`);
          return { status: true };
        }
        return {
          status: 1,
          statusCode: 400,
          message: "Document creation failed!",
        };
      }

      return {
        status: 1,
        statusCode: 400,
        message: "Document creation failed!",
      };
    } else {
      const documentToBeCreated = await documentRepository.create({
        uuid,
        data,
      });
      if (documentToBeCreated._id) {
        logger.info(`Document created successfully`);
        return { status: true };
      }
      return {
        status: 1,
        statusCode: 400,
        message: "Document creation failed!",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in saveDocument service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const getAllDocument = async () => {
  try {
    const documents = await documentRepository.findAll();

    if (documents) {
      return { status: true, data: documents };
    } else {
      return {
        status: 1,
        statusCode: 400,
        message: "Unable to retrieve document, Please try after sometime.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in getAllDocument service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const getAllVersions = async (id: string) => {
  try {
    const documents = await versionRepository.findById(id);

    if (documents) {
      return { status: true, data: documents };
    } else {
      return {
        status: 1,
        statusCode: 400,
        message: "Bad Request.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in getAllVersions service : `, error);
    return { status: false, message: (error as Error).message };
  }
};

export const restoreVersion = async (requestData: TRestoreVersion) => {
  try {
    const { documentId, data } = requestData;
    const document = await documentRepository.update(documentId, {
      data: Base64.decode(data),
    });

    if (document) {
      return { status: true };
    } else {
      return {
        status: 1,
        statusCode: 400,
        message: "Bad Request.",
      };
    }
  } catch (error: unknown) {
    logger.error(`Error in restoreVersion service : `, error);
    return { status: false, message: (error as Error).message };
  }
};
