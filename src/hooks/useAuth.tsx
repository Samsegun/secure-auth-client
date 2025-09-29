import {
    getUserProfile,
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

export const AUTH_STATUS_QUERY_KEY = ["auth-status"] as const;

// const checkAuthStatus = () => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//         throw new Error("You're not authenticated");
//     }

//     return token;
// };

// export const useAuth = () => {
//     const {
//         data: token,
//         isLoading,
//         isError,
//     } = useQuery({
//         queryKey: ["authUser"],
//         queryFn: checkAuthStatus,
//         refetchOnWindowFocus: false,
//         staleTime: Infinity,
//         retry: false,
//     });

//     return { token, isLoading, isAuthenticated: !isError && !!token };
// };

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

    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ email, password }: UserCredentials) =>
            signinUser(email, password),
        onSuccess: () => {
            navigate("/");

            queryClient.invalidateQueries({ queryKey: AUTH_STATUS_QUERY_KEY });
        },
        onError: err => toast.error(err.message),
    });
};

export const useSignout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: signoutUser,
        onSuccess: () => {
            navigate("/signin");

            queryClient.invalidateQueries({ queryKey: AUTH_STATUS_QUERY_KEY });
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
        queryFn: getUserProfile,
        retry: false,
        staleTime: Infinity,
    });

    // return early if data is not available yet
    if (!userProfile) {
        return {
            user: null,
            isLoading,
            isError,
            isUser: false,
            isModerator: false,
            isAdmin: false,
            isSuperAdmin: false,
            role: null,
        };
    }

    const userRole = userProfile.data.data.user;

    return {
        user: userRole,
        isLoading,
        isError,
        isUser: userRole.role === "USER",
        isModerator: userRole.role === "MODERATOR",
        isAdmin: userRole.role === "ADMIN",
        isSuperAdmin: userRole.role === "SUPER_ADMIN",
        role: userRole.role,
    };
};
