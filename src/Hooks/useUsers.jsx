import { useQuery } from "@tanstack/react-query";
const useUsers = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await fetch("http://localhost:5000/users");
      return await data.json();
    },
  });
  return { data, isLoading, refetch };
};

export default useUsers;
