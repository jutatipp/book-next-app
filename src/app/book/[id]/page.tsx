"use client";
import type { Book } from "@/types/book";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data.book);
        } else {
          setBook(null);
        }
      } catch (err) {
        console.error("Error fetching book detail:", err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress sx={{ color: "#000000" }} />
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ backgroundColor: "#fefefe", minHeight: "100vh" }}>
      {book ? (
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 3,
            boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", md: 300 },
              height: 400,
              objectFit: "cover",
            }}
            image={
              book.coverImage ||
              "https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={book.title}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom sx={{ color: "#00556c" }}>
              {book.title}
            </Typography>
            <Typography variant="h6" sx={{ color: "#212121" }}>
              ผู้แต่ง: {book.author}
            </Typography>
            <Typography variant="body1" sx={{ color: "#333333" }}>
              ประเภท: {book.genre}
            </Typography>
            <Typography variant="body1" sx={{ color: "#333333" }}>
              ปีที่พิมพ์: {book.year}
            </Typography>
            <Typography variant="body1" sx={{ color: "#333333" }}>
              ราคา: {book.price} บาท
            </Typography>

            <Typography variant="body1" sx={{ mt: 1, color: "#000000" }}>
              สถานะ:
            </Typography>
            {book.available ? (
              <Chip
                label="มีจำหน่าย"
                sx={{ backgroundColor: "#003453ff", color: "#ffffff", fontWeight: "bold" }}
                size="small"
              />
            ) : (
              <Chip
                label="หมด"
                sx={{ backgroundColor: "#9e9e9e", color: "#ffffff", fontWeight: "bold" }}
                size="small"
              />
            )}

            <Typography variant="body2" sx={{ mt: 2, color: "#444444" }}>
              รายละเอียด: {book.description}
            </Typography>

            <Typography variant="caption" display="block" sx={{ mt: 2, color: "#212121" }}>
              เพิ่มโดย: {book.addedBy.username} ({book.addedBy.email})
            </Typography>

            <Typography variant="caption" display="block" sx={{ color: "#212121" }}>
              สร้างเมื่อ: {new Date(book.createdAt).toLocaleString()}
            </Typography>

            <Typography variant="caption" display="block" sx={{ color: "#212121" }}>
              แก้ไขล่าสุด: {new Date(book.updatedAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography align="center" sx={{ color: "#000000" }}>
          ไม่พบข้อมูลหนังสือ
        </Typography>
      )}
    </Box>
  );
}
