import api from "../axios";

export const provinceList = async () => {
  try {
    const { data } = await api.get("Province");
    return data;
  } catch (error: any) {
    return error.response;
  }
};

export const religonList = async () => {
  try {
    const { data } = await api.get("Religon");
    return data;
  } catch (error: any) {
    return error.response;
  }
};
export const nationalityList = async () => {
  try {
    const { data } = await api.get("Nationality");
    return data;
  } catch (error: any) {
    return error.response;
  }
};
export const areaList = async () => {
  try {
    const { data } = await api.get("Area");
    return data;
  } catch (error: any) {
    return error.response;
  }
};
export const requestTypeList = async () => {
  try {
    const { data } = await api.get("RequestType");
    return data;
  } catch (error: any) {
    return error.response;
  }
};
export const houseHeadStatusList = async () => {
  try {
    const { data } = await api.get("HouseHeadStatus");
    return data;
  } catch (error: any) {
    return error.response;
  }
};
