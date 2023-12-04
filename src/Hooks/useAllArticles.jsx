import { useQuery } from "@tanstack/react-query";

const useAllArticles = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allArticles"],
    queryFn: async () => {
      const data = await fetch(
        "https://newspapwer-a-12-server.vercel.app/addArticles"
      );
      return await data.json();
    },
  });
  return { data, isLoading, refetch };
};

export default useAllArticles;
