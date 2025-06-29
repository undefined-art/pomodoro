import axios, { AxiosResponse, Method } from "axios";
import { createSignal, onMount } from "solid-js";

type UseRequestPropsType<T> = {
  url: string;
  method?: Method;
  data?: T;
  withCredentials?: boolean;
  isFetch?: boolean;
  onFinalize?: (response: any) => void;
};

export const useRequest = <T>({
  url,
  method = "GET",
  data,
  isFetch = false,
  withCredentials = true,
  onFinalize,
}: UseRequestPropsType<T>) => {
  const [isPending, setIsPending] = createSignal<boolean>(false);
  const [error, setError] = createSignal<unknown>(null);
  const [response, setResponse] = createSignal<T | null>(null);
  const [status, setStatus] = createSignal<number | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    return headers;
  };

  const onRequestFinalize = (response: AxiosResponse<any>) => {
    setStatus(response.status);
    setResponse(response.data?.data || response.data);
    setIsPending(false);
    setError(null);

    onFinalize?.(response.data?.data || response.data);
  };

  const request = async (external?: unknown) => {
    let request = null;

    setIsPending(true);
    setError(null);

    try {
      request = await axios.request({
        url,
        method,
        headers: getAuthHeaders(),
        data: data || external,
        withCredentials,
      });
    } catch (error: any) {
      setError(error.response?.data?.message || error.message || "Something went wrong");
      setIsPending(false);
      
      // Handle 401 errors by redirecting to login
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/sign-in";
      }
      
      throw error;
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
