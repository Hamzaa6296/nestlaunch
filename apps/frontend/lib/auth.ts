import api from "./axios";

export const authApi = {
  signup: async (data: { name: string; email: string; password: string }) => {
    const r = await api.post("/auth/signup", data);
    return r.data;
  },
  verifyOtp: async (email: string, otp: string) => {
    const r = await api.post("/auth/verify-otp", { email, otp });
    return r.data;
  },
  login: async (data: { email: string; password: string }) => {
    const r = await api.post("/auth/login", data);
    return r.data;
  },
  getMe: async () => {
    const r = await api.get("/auth/me");
    return r.data;
  },
  forgotPassword: async (email: string) => {
    const r = await api.post("/auth/forgot-password", { email });
    return r.data;
  },
  verifyResetOtp: async (email: string, otp: string) => {
    const r = await api.post("/auth/verify-reset-otp", { email, otp });
    return r.data;
  },
  resetPassword: async (email: string, otp: string, newPassword: string) => {
    const r = await api.post("/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return r.data;
  },
};
