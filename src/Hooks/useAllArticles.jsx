import { useQuery } from "@tanstack/react-query";

const useAllArticles = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allArticles"],
    queryFn: async () => {
      const data = await fetch("http://localhost:5000/addArticles");
      return await data.json();
    },
  });
  return { data, isLoading, refetch };
};

export default useAllArticles;
