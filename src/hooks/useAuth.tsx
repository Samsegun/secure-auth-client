import {
    checkAuthStatus,
    forgotPassword,
    resetPassword,
    signinUser,
    signoutUser,
    signupUser,
    verifyEmail,
} from "@/utils/ApiUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type UserCredentials = {
    email: string;
    password: string;
};

type ResetPasswordDetails = {
    token: string;
    password: string;
    email: string;
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
            navigate("/email-verification-sent");
        },
        onError: (err: any) => {
            toast.error(err.response.data.message);
        },
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
        onError: (err: any) => {
            toast.error(err.response.data.message);
        },
    });
};

export const useSignout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: signoutUser,
        onSuccess: async () => {
            /**  inavlidating or clearing cache is 
             a trade-off between keeping user's data
             or not i.e. efficiency/performance or security/privacy. 
             choose what works best for the app. */

            // await queryClient.invalidateQueries({
            //     queryKey: AUTH_STATUS_QUERY_KEY,
            //     refetchType: "active",
            // });

            queryClient.clear();
            navigate("/signin");
        },
        onError: err => toast.error(err.message),
    });
};

export const useVerifyEmail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ token }: { token: string }) => verifyEmail(token),
        onSuccess: async response => {
            toast.success(response.data.message);

            await queryClient.invalidateQueries({
                queryKey: AUTH_STATUS_QUERY_KEY,
            });
        },
        onError: err => toast.error(err.message),
    });
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: ({ email }: Omit<UserCredentials, "password">) =>
            forgotPassword(email),
        onSuccess: response => {
            toast.success(response.data.message);
        },
        onError: err => toast.error(err.message),
    });
};

export const useResetPassword = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ token, password }: ResetPasswordDetails) =>
            resetPassword(token, password),
        onSuccess: (response, variables) => {
            toast.success(response.data.message);

            navigate(`/signin?email=${encodeURIComponent(variables.email)}`);
        },
        onError: err => toast.error(err.message),
    });
};

export const useAuthStatus = () => {
    const {
        data: userProfile,
        isLoading,
        isError,
        error,
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
            error,
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
        error,
        isUser: userRole === "USER",
        isModerator: userRole === "MODERATOR",
        isAdmin: userRole === "ADMIN",
        isSuperAdmin: userRole === "SUPER_ADMIN",
        role: userRole,
    };
};
