export type User = { id: string; email: string; role: string };

export type SignUpResponse = {
    success: boolean;
    message: string;
    data: {
        id: string;
        email: string;
    };
};

export type SignInResponse = {
    success: boolean;
    data: {
        user: User;
    };
};

export type SignOutResponse = {
    success: boolean;
    message: string;
    details: {
        tokensCleared: boolean;
        oauthLoggedOut: boolean;
    };
};

export type RefreshTokenResponse = {
    success: boolean;
    message: string;
};

export type UserProfile = {
    message: string;
    data: SignInResponse["data"];
};

export type AuthStatusResponse = {
    success: boolean;
    isAuthenticated: boolean;
    authMethod: string;
    user: {
        userId: string;
        role: string;
        isVerified: boolean;
    };
};

export type GetUsersResponse = {
    message: string;
    data: {
        users: User[];
    };
};
