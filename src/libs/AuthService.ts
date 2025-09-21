// libs/AuthService.ts
const API_URL = "http://localhost:3000/api/auth";

export default {
  getCurrentUser: () => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  login: async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Login error:", err);
        return false;
      }

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return true;
    } catch (err) {
      console.error("Login fetch failed:", err);
      return false;
    }
  },

  register: async (data: { username: string; email: string; password: string }) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return { ok: res.ok, result };
    } catch (err) {
      console.error("Register fetch failed:", err);
      return { ok: false, result: null };
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};
