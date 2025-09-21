"use client";

import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import AuthService from "@/libs/AuthService";

export default function NavBar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#5eaed5ff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* โลโก้ / ชื่อแอป */}
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", fontWeight: "bold", color: "#ffffff" }}
          onClick={() => router.push("/")}
        >
        </Typography>

        {/* ถ้ามี user แสดง Avatar + ชื่อ */}
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 3 }}>
            <Avatar sx={{ bgcolor: "#1b83a5ff", width: 32, height: 32 }}>
              {user.username[0].toUpperCase()}
            </Avatar>
            <Typography sx={{ color: "#ffffff", fontWeight: "500" }}>
              {user.username}
            </Typography>
          </Box>
        )}

        {/* ปุ่มเข้าสู่ระบบ / ลงทะเบียน / logout */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {user ? (
            <Button
              variant="outlined"
              sx={{
                color: "#ffffff",
                borderColor: "#ffffff",
                "&:hover": { backgroundColor: "#424242", borderColor: "#ffffff" },
              }}
              onClick={() => {
                AuthService.logout();
                setUser(null);
                router.push("/login");
              }}
            >
              ออกจากระบบ
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{
                  color: "#ffffff",
                  borderColor: "#ffffff",
                  "&:hover": { backgroundColor: "#424242", borderColor: "#ffffff" },
                }}
                onClick={() => router.push("/login")}
              >
                เข้าสู่ระบบ
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff5722",
                  "&:hover": { backgroundColor: "#e64a19" },
                  color: "#ffffff",
                }}
                onClick={() => router.push("/register")}
              >
                ลงทะเบียน
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
