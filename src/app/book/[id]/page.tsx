"use client";
import { Book } from "@/types/book";
import { Box, Typography, Paper, CardMedia, Stack } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/books/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBook(data["book"]);
      }
    };
    if (id !== undefined) {
      fetchData();
    }
  }, [id]);

  const coverImg = "https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  

  return (
    <Box p={3}>
      {book && (
        <Paper elevation={4} sx={{ p: 4 }}>
          <CardMedia
            component="img"
            height="350"
            image={coverImg}
            alt={book.title}
            sx={{ objectFit: "cover", borderRadius: 2, mb: 3 }}
          />

          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            ✍️ {book.author}
          </Typography>

          <Stack spacing={1} sx={{ my: 2 }}>
            <Typography variant="body1">{book.description}</Typography>
            <Typography variant="body2" color="text.secondary">
              หมวดหมู่: {book.genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ปีที่พิมพ์: {book.year}
            </Typography>
            {book.publisher && (
              <Typography variant="body2" color="text.secondary">
                สำนักพิมพ์: {book.publisher}
              </Typography>
            )}
            {book.isbn && (
              <Typography variant="body2" color="text.secondary">
                ISBN: {book.isbn}
              </Typography>
            )}
            <Typography variant="body2" color="primary">
              ราคา: {book.price} บาท
            </Typography>
            <Typography variant="body2" color={book.available ? "green" : "red"}>
              สถานะ: {book.available ? "มีจำหน่าย" : "สินค้าหมด"}
            </Typography>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
