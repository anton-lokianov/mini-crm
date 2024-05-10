import { useQuery } from "@tanstack/react-query";
import { getAuthUser, getDrivers, getSubUsers } from "../api/db-api";

export const useGetSubUsersQuery = () => {
  return useQuery({
    queryKey: ["subUsers"],
    queryFn: getSubUsers,
  });
};

export const useGetAuthUserQuery = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });
};

export const useGetDriverQuery = () => {
  return useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });
};
