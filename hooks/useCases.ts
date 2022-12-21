import useSWR, { SWRConfiguration } from "swr";
import { ICases } from "../interfaces";

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useCases = (url: string, config: SWRConfiguration = {}) => {
  // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
  const { data, error } = useSWR<ICases[]>(`/api${url}`, config);

  return {
    cases: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
