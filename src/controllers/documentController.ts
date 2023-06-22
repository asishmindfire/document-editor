import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { Base64 } from "js-base64";
import logger from "../logger";
import {
  getAllDocument,
  getAllVersions,
  restoreVersion,
  saveDocument,
} from "../services/documentService";

export const documentController: RequestHandler = async (req, res, next) => {
  try {
    const { uuid, data } = req.body;
    const response = await saveDocument({ uuid, data: Base64.decode(data) });

    if (response.status) {
      res.status(201).json({
        status: true,
        message: "Document created successfully.",
      });
    } else {
      logger.error(`Error in documentController : `, response);
      if (response && response.status === 1) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ""));
    }
  } catch (error: unknown) {
    logger.error(`Error in documentController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const getAllDocumentController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const response = await getAllDocument();

    const { status, data } = response;
    if (status) {
      res.status(200).json({
        status,
        message: "Records retrieved successfully.",
        total: data?.length,
        data,
      });
    } else {
      logger.error(`Error in getAllDocumentController : `, response);
      if (response && response.status === 1) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ""));
    }
  } catch (error: unknown) {
    logger.error(`Error in getAllDocumentController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const getAllVersionController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const response = await getAllVersions(id);

    const { status, data } = response;
    if (status) {
      res.status(200).json({
        status,
        message: "Records retrieved successfully.",
        total: data?.length,
        data,
      });
    } else {
      logger.error(`Error in getAllVersionController : `, response);
      if (response && response.status === 1) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ""));
    }
  } catch (error: unknown) {
    logger.error(`Error in getAllVersionController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};

export const restoreVersionController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const response = await restoreVersion(req.body);

    const { status } = response;
    if (status) {
      res.status(200).json({
        status,
        message: "Version restored successfully.",
      });
    } else {
      logger.error(`Error in restoreVersionController : `, response);
      if (response && response.status === 1) {
        return next(createHttpError(response.statusCode, response.message));
      }
      next(createHttpError(500, ""));
    }
  } catch (error: unknown) {
    logger.error(`Error in restoreVersionController catch : `, error);
    next(createHttpError(500, (error as Error).message));
  }
};
