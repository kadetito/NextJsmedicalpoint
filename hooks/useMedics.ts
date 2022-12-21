import useSWR, { SWRConfiguration } from "swr";
import { IUser } from "../interfaces";

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useMedics = (url: string, config: SWRConfiguration = {}) => {
  // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
  const { data, error } = useSWR<IUser[]>(`/api${url}`, config);

  return {
    medics: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
