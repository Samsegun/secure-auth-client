import { getUserProfile, getUsers } from "@/utils/ApiUtils";
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

export const useUsers = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    return { data, isLoading, isError, error };
};
