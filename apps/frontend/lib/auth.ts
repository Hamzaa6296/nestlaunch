import api from "./axios";

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authApi = {
  signup: async (data: SignupData) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },
};
