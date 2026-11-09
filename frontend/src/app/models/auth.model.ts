export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface UserResponse {
  id: number;
  email: string;
  createdAt: string;
}
