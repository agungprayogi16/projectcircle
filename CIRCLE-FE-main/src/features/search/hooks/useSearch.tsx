/** @format */

import { useQuery } from "@tanstack/react-query";
import { API } from "@/utils/api";

// fetch users search
const fetchUsers = async (pageNumber: number, searchQuery: string) => {
  const response = await API.get(
    `/users?page=${pageNumber}&search=${searchQuery}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }
  );
  return response.data;
};

export const useSearch = (pageNumber: number, searchQuery: string) => {
  return useQuery({
    queryKey: ["search-users"],
    queryFn: () => fetchUsers(pageNumber, searchQuery),
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
};
// fetch users search
