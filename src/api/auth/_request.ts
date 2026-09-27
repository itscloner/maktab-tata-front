import api from "@/api/axios";
import { ILoginRequest } from "@/interface/auth/ILoginRequest";

export const loginRequest = async (formData: ILoginRequest) => {
  try {
    const { data } = await api.post("User/login", JSON.stringify(formData));
    return data;
  } catch (error: any) {
    return error.response;
  }
};
