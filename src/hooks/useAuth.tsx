import { signinUser, signupUser } from "@/utils/ApiUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type UserCredentials = {
    email: string;
    password: string;
};

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
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ email, password }: UserCredentials) =>
            signupUser(email, password),
        // on successful signup, an object is returned containing
        // {success, message, data }
        onSuccess: () => {
            navigate("/email-sent");

            queryClient.invalidateQueries({ queryKey: ["authUser"] });
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

            // add user data to zustand store
            // const { setUser } = useProfileStore.getState();
            // if (data.user) {
            //     setUser({
            //         _id: data.user._id,
            //         email: data.user.email,
            //         username: data.user.username,
            //     });
            // }

            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: err => toast.error(err.message),
    });
};

// export const useSignout = () => {
//     const queryClient = useQueryClient();
//     const navigate = useNavigate();

//     return useMutation({
//         mutationFn: auth.logout,
//         onSuccess: () => {
//             // add user data to zustand store
//             const { clearUser } = useProfileStore.getState();
//             clearUser();

//             queryClient.invalidateQueries({ queryKey: ["authUser"] });
//             navigate("/login");
//         },
//     });
// };

// export const useUpdateUser = () => {
//     const queryClient = useQueryClient();
//     const { setUser } = useProfileStore.getState();

//     return useMutation({
//         mutationFn: ({ userId, updates }: UpdateUserInput) =>
//             auth.update(userId, updates),
//         onSuccess: data => {
//             toast.success("User successfully updated");

//             // add user data to zustand store
//             if (data.updatedUser) {
//                 setUser({
//                     _id: data.updatedUser._id,
//                     email: data.updatedUser.email,
//                     username: data.updatedUser.username,
//                 });
//             }

//             queryClient.invalidateQueries({ queryKey: ["authUser"] });
//         },
//         onError: err => toast.error(err.message),
//     });
// };
