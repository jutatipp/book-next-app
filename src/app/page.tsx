"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import type { Book } from "../types/book";
import NavBar from "@/components/NavBar";
import AuthService from "@/libs/AuthService";

type BookResponse = {
  books: Book[];
};

export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // ดึงข้อมูลหนังสือ
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/books");
      if (response.ok) {
        const data = await response.json();
        const resData: BookResponse = data;
        setBooks(resData.books);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    getData();
  }, []);

  return (
    <Container sx={{ minHeight: "100vh", py: 4 }}>
      <NavBar />
      <Typography variant="h3" align="center" gutterBottom>
        รายการหนังสือ
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : books.length > 0 ? (
        <Stack spacing={2}>
          {books.map((book) => (
            <Card
              key={book._id}
              sx={{
                display: "flex",
                borderRadius: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
                },
              }}
            >
  <CardMedia
    component="img"
    height="200"
    sx={{ width: 150, objectFit: "cover", borderRadius: "8px 0 0 8px" }}
    image={
      book.coverImage ||
      "https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
    alt={book.title}
  />

              <CardContent sx={{ flex: 1 }}>
                <a href={`/book/${book._id}`} style={{ textDecoration: "none" }}>
                  <Typography variant="h6" sx={{ color: "#055183ff" }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8d6e63" }}>
                    ผู้แต่ง: {book.author}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8d6e63" }}>
                    ประเภท: {book.genre}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8d6e63" }}>
                    ราคา: {book.price} บาท
                  </Typography>
                </a>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography align="center">ไม่พบหนังสือ</Typography>
      )}
    </Container>
  );
}
