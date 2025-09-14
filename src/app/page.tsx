"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import type { BookResponse, Book } from "../types/book";
import Link from "next/link";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/api/books");
    if (response.ok) {
      const data = await response.json();
      const resData: BookResponse = data;
      setBooksData(resData.books);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{ py: 4, }}>
      <Typography variant="h3" gutterBottom align="center">
        📚 รายการหนังสือ
      </Typography>
      {isLoading && <Typography align="center">กำลังโหลด...</Typography>}

      <Grid container spacing={3}>
        {booksData.map((book) => (
          <Grid size={12} key={book._id}>
            <Card sx={{ height: "100%" }}>
              <CardActionArea component={Link} href={`/book/${book._id}`}>
                <CardMedia
                  component="img"
                  height="200"
                  image={book.coverImage || "https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ✍️ {book.author}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    ราคา: {book.price} บาท
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
