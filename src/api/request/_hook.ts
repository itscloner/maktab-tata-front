import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_request";
import { ICreateRequest } from "@/interface/request/ICreateRequest";

export const useCreateRequestQuery = () => {
  return useMutation({
    mutationKey: ["create-request"],
    mutationFn: (formData: ICreateRequest) => api.createRequest(formData),
  });
};

export const useFecthRequests = () => {
  return useQuery({
    queryKey: ["fetch-requests"],
    queryFn: () => api.fetchRequests(),
  });
};
