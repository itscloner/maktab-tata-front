import { useMutation } from "@tanstack/react-query";
import * as api from "./_request";
import { ILoginRequest } from "@/interface/auth/ILoginRequest";

export const useLoginQuery = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (formData: ILoginRequest) => api.loginRequest(formData),
  });
};
