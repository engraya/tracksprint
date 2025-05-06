export interface LoginFormValues {
    email: string;
    password: string;
  }

export interface RegisterFormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
}  


export interface User {
  id: string;
  email: string;
  [key: string]: any; 
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

