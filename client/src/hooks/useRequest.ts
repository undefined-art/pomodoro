import axios, { AxiosResponse, Method } from "axios";
import { createSignal, onMount } from "solid-js";

type UseRequestPropsType<T> = {
  url: string;
  method?: Method;
  data?: T;
  withCredentials?: boolean;
  isFetch?: boolean;
};

export const useRequest = <T>({
  url,
  method = "GET",
  data,
  isFetch = false,
}: UseRequestPropsType<T>) => {
  const [isPending, setIsPending] = createSignal<boolean>(false);
  const [error, setError] = createSignal<unknown>(null);
  const [response, setResponse] = createSignal<T | null>(null);
  const [status, setStatus] = createSignal<number | null>(null);

  // TODO: withCredentials  take token from local storage  and add auth header
  const headers = { "Content-Type": "application/json" };

  const onRequestFinalize = (response: AxiosResponse<any>) => {
    setStatus(response.status);
    setResponse(response.data?.data);
    setIsPending(false);
  };

  const request = async () => {
    let request = null;

    setIsPending(true);
    setError(null);

    try {
      request = await axios.request({ url, method, headers, data });
    } catch (error) {
      throw new Error("Something went wrong with request!");
    }

    onRequestFinalize(request);

    return request;
  };

  onMount(async () => {
    if (isFetch) {
      await request();
    }
  });

  return {
    isPending,
    error,
    response,
    status,
    request,
  };
};
