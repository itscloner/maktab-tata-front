import { ICreateRequest } from "@/interface/request/ICreateRequest";
import api from "@/services/axios";

export const createRequest = async (formData: ICreateRequest) => {
  try {
    const { data } = await api.post("InitialRequest", JSON.stringify(formData));
    return data;
  } catch (error: any) {
    return error.response;
  }
};

export const fetchRequests = async () => {
  try {
    const { data } = await api.get("InitialRequest");
    return data;
  } catch (error: any) {
    return error.response;
  }
};
