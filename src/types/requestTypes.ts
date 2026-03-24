type apiOptions = {
  requestType: string;
  baseURL: string;
  path: string;
  params: any;
  isUrlEncoded?: boolean;
  contentType: string;
  additionalHeaders: any;
};

type requestOptions = {
  url: string;
  headers?: any;
  params: any;
};

export type { apiOptions, requestOptions };
