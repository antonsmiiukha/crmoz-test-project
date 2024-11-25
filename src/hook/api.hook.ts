import {ERequestMethod, IRequest, IResponse} from '../api/api.type';
import {apiRoutes, ERequestName} from '../api/api';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {DOMAIN} from '../config/api';
import {Alert} from 'react-native';

export const useApi = <
  RequestType extends IRequest,
  ResponseType extends IResponse,
>(
  requestName: ERequestName,
  requestData: RequestType | boolean = false,
  deferred = false,
) => {
  const request = apiRoutes[requestName];

  const headers: HeadersInit_ = useMemo(() => {
    const requestHeaders: HeadersInit_ = {
      Accept: 'application/json',
      'Content-Type': request.contentType,
    };

    return requestHeaders;
  }, [request.contentType]);

  const [loading, setLoading] = useState<boolean>(!deferred);
  const [data, setData] = useState<ResponseType | undefined>(undefined);

  const [responseCode, setResponseCode] = useState<number | undefined>(
    undefined,
  );

  const call = useCallback(async () => {
    let requestBody: string = JSON.stringify(requestData);
    let route = request.route;

    if (typeof requestData === 'object') {
      for (const key in requestData) {
        route = route.replace(`{${key}}`, requestData[key] as string);
      }
    }

    setLoading(true);

    try {
      const response = await fetch(DOMAIN + '/' + route, {
        method: request.method,
        headers: headers,
        body: request.method !== ERequestMethod.GET ? requestBody : undefined,
      });

      let responseData;

      try {
        responseData = await response.json();
      } catch (error) {
        return Promise.reject('API error');
      }

      setData(responseData);
      setResponseCode(response.status);

      return Promise.resolve({
        data: responseData as ResponseType,
        code: response.status,
      });
    } catch (error) {
      return Promise.reject('Api Error');
    } finally {
      setLoading(false);
    }
  }, [headers, request.method, request.route, requestData]);

  useEffect(() => {
    if (!deferred) {
      try {
        call()
          .then(({data: responseData, code}) => {
            if (responseData) {
              setData(responseData);
            }
            setResponseCode(code);
          })
          .catch(() => {
            Alert.alert('Api Error');
          });
      } catch (error) {
        Alert.alert('Api Error');
      }
    }
  }, [deferred, call]);

  return {call, loading, data, code: responseCode};
};
