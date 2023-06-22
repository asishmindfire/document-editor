export type TDocument = {
  uuid: string;
  data: string;
};

export type TVersionDocument = {
  documentId: string;
  data: string;
};

export type TError = {
  status: number;
  statusCode: number;
  message: string;
};

export type TUpdateDocument = {
  data: string;
};

export type TSaveDocument = {
  status: number | boolean;
  statusCode?: number;
  message?: string;
};

export type TRestoreVersion = {
  documentId: string;
  data: string;
};
