import { useQuery } from "@tanstack/react-query";
import { getSubUsers } from "../api/db-api";

export const useGetSubUsersQuery = () => {
  return useQuery({
    queryKey: ["subUsers"],
    queryFn: () => getSubUsers(),
  });
};
