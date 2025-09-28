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
        user: {
            id: string;
            email: string;
            role: string;
        };
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
