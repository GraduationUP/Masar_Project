export interface User {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
  account_type: string
}

export interface AuthUser {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  role: string
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export interface LoginSuccessResponse {
  response_code: 200;
  status: 'success';
  message: string;
  user_info: UserInfo;
  token: string;
  token_type: 'Bearer';
}

export interface LoginErrorResponse {
  response_code: number;
  status: 'error';
  message: string;
  errors?: { [key: string]: string[] };
}

export interface RegistrationResponse {
  message: string;
  user: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
  role: string;
};