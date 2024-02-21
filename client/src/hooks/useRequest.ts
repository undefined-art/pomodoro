import axios, { Method } from "axios";
import { createSignal, onMount } from "solid-js";

type UseRequestPropsType = {
  url: string;
  method: Method;
  data?: unknown;
  withCredentials?: boolean;
  isFetch?: boolean;
};

export const useRequest = ({
  url,
  method,
  data,
  isFetch = false,
}: UseRequestPropsType) => {
  const [isPending, setIsPending] = createSignal<boolean>(false);
  const [error, setError] = createSignal<unknown>(null);
  const [response, setResponse] = createSignal<unknown>(null);
  const [status, setStatus] = createSignal<number | null>(null);

  // TODO: withCredentials  take token from local storage  and add auth header
  const headers = { "Content-Type": "application/json" };

  const request = async () => {
    return await axios.request({ url, method, headers, data });
  };

  onMount(async () => {
    setIsPending(true);
    setError(null);
    if (isFetch) {
      const response = await request();

      setStatus(response.status);
      setResponse(response.data);

      setIsPending(false);

      console.log(response);
    }
  });

  return {
    isPending: isPending(),
    error: error(),
    data: response(),
    status: status(),
    request,
  };
};
