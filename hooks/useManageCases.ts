import useSWR, { SWRConfiguration } from "swr";
import { ICases } from "../interfaces";

export const useManageCases = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<ICases[]>(`/api${url}`, config);

  return {
    cases: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
