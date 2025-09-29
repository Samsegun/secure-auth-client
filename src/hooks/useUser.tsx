import { getUserProfile } from "@/utils/ApiUtils";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["profile"],
        queryFn: getUserProfile,
        refetchOnWindowFocus: false,
        // staleTime: 60 * 60 * 1000,
    });

    return { data, isLoading, isError, error };
};
