import axios, { type AxiosRequestConfig } from 'axios';

export const customAxiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = axios({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
};
