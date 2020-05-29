
export interface JwtPayload {
    username: string;
    iat?: string;
    exp?: string
}

export interface UserResponse {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    fullName: string;
    bio: string;
    userImage: string | null;
}

export interface AuthResponse extends UserResponse {
    token: string;
}
