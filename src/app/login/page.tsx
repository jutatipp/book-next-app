"use client";
import { useState } from "react";
import { Container, Card, CardContent, Stack, Typography, Input, Button } from "@mui/material";
import AuthService from "@/libs/AuthService";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");
    const success = await AuthService.login(form.email, form.password);
    if (success) {
      window.location.href = "/"; // กลับหน้า Home
    } else {
      setError("เข้าสู่ระบบไม่สำเร็จ ตรวจสอบ Email/Password");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">Login</Typography>
            <Input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button onClick={handleLogin} fullWidth variant="contained">
              Login
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
