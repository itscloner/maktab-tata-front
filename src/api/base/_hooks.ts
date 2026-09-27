import { useQuery } from "@tanstack/react-query";
import * as api from "./_requests";

export const useProvinceListQuery = () => {
  return useQuery({
    queryKey: ["province-list"],
    queryFn: () => api.provinceList(),
  });
};

export const useReligonListQuery = () => {
  return useQuery({
    queryKey: ["religon-list"],
    queryFn: () => api.religonList(),
  });
};
export const useNationalityListQuery = () => {
  return useQuery({
    queryKey: ["nationality-list"],
    queryFn: () => api.nationalityList(),
  });
};
export const useAreaListQuery = () => {
  return useQuery({
    queryKey: ["area-list"],
    queryFn: () => api.areaList(),
  });
};
export const useRequestTypeListQuery = () => {
  return useQuery({
    queryKey: ["request-type-list"],
    queryFn: () => api.requestTypeList(),
  });
};
export const useHouseHeadStatusListQuery = () => {
  return useQuery({
    queryKey: ["house-head-status-list"],
    queryFn: () => api.houseHeadStatusList(),
  });
};
