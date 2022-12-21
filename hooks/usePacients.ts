import useSWR, { SWRConfiguration } from "swr";
import { IPacients } from "../interfaces";

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const usePacients = (url: string, config: SWRConfiguration = {}) => {
  // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
  const { data, error } = useSWR<IPacients[]>(`/api${url}`, config);

  return {
    pacients: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
