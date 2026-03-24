// import DeviceInfo from 'react-native-device-info';
import { APP_HTTP_HEADERS } from '@config';
import axios from 'axios';
import { apiOptions, requestOptions } from '@/types/requestTypes';

const initiateAPI = async ({
  requestType, // get,post,put,delete,patch
  baseURL, // https://test.com
  path, // /v1/user/account
  params, // {account_id:<value>}
  isUrlEncoded = false,
  contentType, // multipart/form-data = with file
  additionalHeaders, // additional headers
}: apiOptions) => {
  let headers: any = { ...APP_HTTP_HEADERS };
  // headers.Authorization = getBearerAccessToken();

  if (baseURL) {
    if (contentType) {
      headers['Content-Type'] = contentType;
    } else if (isUrlEncoded) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else if (params instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else if (requestType == 'post') {
      headers['Content-Type'] = 'application/json';
    }

    try {
      // const agent = await DeviceInfo.getUserAgent();
      headers = {
        'User-Agent': 'Test-agent', //agent,
      };
    } catch {
      headers = {
        'User-Agent': 'No-agent',
      };
    }
    headers = { ...headers, ...additionalHeaders };

    const url = `${baseURL}${path}`;
    switch (requestType) {
      case 'get':
        return getRequest({ url: url, headers: headers, params: params });
      case 'post':
      default:
        return postRequest({ url: url, headers: headers, params: params });
    }
  } else {
    return false;
  }
};

const getRequest = async ({ url, headers = [], params }: requestOptions) => {
  return await axios
    .get(url, {
      headers: headers,
      params: params,
    })
    .then(resp => {
      return resp;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

const postRequest = async ({ url, headers = [], params }: requestOptions) => {
  return await axios
    .post(url, {
      headers: headers,
      params: params,
    })
    .then(resp => {
      return resp;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export default initiateAPI;
