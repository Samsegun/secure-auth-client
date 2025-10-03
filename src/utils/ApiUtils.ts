import type {
    AuthStatusResponse,
    GetUsersResponse,
    SignInResponse,
    SignOutResponse,
    SignUpResponse,
    UserProfile,
} from "./ApiRequestsTypes";
import { axiosInstance } from "./axiosConfig";

// authentication requests
export const signupUser = (email: string, password: string) => {
    return axiosInstance.post<SignUpResponse>("/auth/signup", {
        email,
        password,
    });
};

export const signinUser = (email: string, password: string) => {
    return axiosInstance.post<SignInResponse>("/auth/signin", {
        email,
        password,
    });
};

export const signoutUser = () => {
    return axiosInstance.post<SignOutResponse>("/user/logout");
};

export const checkAuthStatus = () => {
    return axiosInstance.get<AuthStatusResponse>("/user/auth-status");
};

export const googleLogin = () => {
    return axiosInstance.get("/auth/google");
};

// user requests
export const getUserProfile = () => {
    return axiosInstance.get<UserProfile>("/user/profile");
};

// super user requests
export const getUsers = () => {
    return axiosInstance.get<GetUsersResponse>("/user/moderator/view-users");
};
