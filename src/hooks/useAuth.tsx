import {
    checkAuthStatus,
    signinUser,
    signoutUser,
    signupUser,
} from "@/utils/ApiUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type UserCredentials = {
    email: string;
    password: string;
};

export const AUTH_STATUS_QUERY_KEY = ["authStatus"] as const;

export const useSignup = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ email, password }: UserCredentials) =>
            signupUser(email, password),
        // on successful signup, an object is returned containing
        // {success, message, data }
        onSuccess: () => {
            navigate("/email-sent");
        },
        onError: err => toast.error(err.message),
    });
};

export const useSignin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: UserCredentials) =>
            signinUser(email, password),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: AUTH_STATUS_QUERY_KEY,
                refetchType: "active",
            });
        },
        onError: err => toast.error(err.message),
    });
};

export const useSignout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: signoutUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: AUTH_STATUS_QUERY_KEY,
                refetchType: "active",
            });
        },
        onError: err => toast.error(err.message),
    });
};

export const useAuthStatus = () => {
    const {
        data: userProfile,
        isLoading,
        isError,
    } = useQuery({
        queryKey: AUTH_STATUS_QUERY_KEY,
        queryFn: checkAuthStatus,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    // return early if data is not available yet
    if (!userProfile) {
        return {
            userRole: null,
            isLoading,
            isError,
            isUser: false,
            isModerator: false,
            isAdmin: false,
            isSuperAdmin: false,
            role: null,
        };
    }

    const userRole = userProfile.data.user.role;

    return {
        userRole,
        isLoading,
        isError,
        isUser: userRole === "USER",
        isModerator: userRole === "MODERATOR",
        isAdmin: userRole === "ADMIN",
        isSuperAdmin: userRole === "SUPER_ADMIN",
        role: userRole,
    };
};
