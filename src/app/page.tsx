"use client";
import { useState } from "react";
import { Container, Typography } from "@mui/material";
import type { BookResponse, Book } from "../types/book";
export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);

  const getData = async () => {
    const response = await fetch("http://localhost:3000/api/books");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const resData: BookResponse = data;
      const books = resData.books;
      console.log(books);
      setBooksData(books);
    }
  };

  const data = getData();

  return (
    <Container>
      <Typography variant="h1">Hello World</Typography>
      {booksData && booksData.map((book) => {
        return (<Typography>{book.title}</Typography>);
      })}
    </Container>
  );
}
