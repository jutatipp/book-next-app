"use client";

import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import AuthService from "@/libs/AuthService";

export default function NavBar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // อ่านค่า user หลังจาก client render
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => router.push("/")}>
          LogoVT
        </Typography>
        {user ? (
          <Button
            color="inherit"
            onClick={() => {
              AuthService.logout();
              setUser(null); // เคลียร์ user
              router.push("/login");
            }}
          >
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => router.push("/login")}>
            Login
          </Button>
        )}
        {!user && (
          <Button color="inherit" onClick={() => router.push("/register")}>
            Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
