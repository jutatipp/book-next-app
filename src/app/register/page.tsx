"use client";
import { useState } from "react";
import { Container, Card, CardContent, Stack, Typography, Input, Button } from "@mui/material";
import AuthService from "@/libs/AuthService";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    const { ok, result } = await AuthService.register({
      username: form.username,
      email: form.email,
      password: form.password,
    });

    if (ok) {
      window.location.href = "/login";
    } else {
      setError(result?.message || "สมัครสมาชิกไม่สำเร็จ");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">ลงทะเบียน</Typography>
            <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} fullWidth />
            <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} fullWidth />
            <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} fullWidth />
            <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} fullWidth />
            {error && <Typography color="error">{error}</Typography>}
            <Button onClick={handleRegister} fullWidth variant="contained">
              ลงทะเบียน
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
