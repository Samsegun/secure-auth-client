import type {
    AuthStatusResponse,
    ForgotPasswordResponse,
    GetUsersResponse,
    ResetPasswordResponse,
    SignInResponse,
    SignOutResponse,
    SignUpResponse,
    UserProfile,
    VerifyEmailResponse,
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

export const forgotPassword = (email: string) => {
    return axiosInstance.post<ForgotPasswordResponse>("/auth/forgot-password", {
        email,
    });
};

export const resetPassword = (token: string, password: string) => {
    return axiosInstance.post<ResetPasswordResponse>("/auth/reset-password", {
        token,
        password,
    });
};

export const verifyEmail = (token: string) => {
    return axiosInstance.get<VerifyEmailResponse>(
        `/auth/verify-email?token=${token}`
    );
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
