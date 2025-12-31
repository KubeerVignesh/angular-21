export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  address?: string;
  phone?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  countryCode?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}
