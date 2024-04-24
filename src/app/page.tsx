'use client';
import { Button, TextField, Typography, Container } from '@mui/material';
import React, { useState } from 'react';


export default function Home() {
  const [optimizedText, setOptimizedText] = useState('');
  const [inputText, setInputText] = useState('');


  const optimizeText = async () => {
    const response = await fetch('/api/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    });

    const data = await response.json();
    setOptimizedText(JSON.stringify(data.message, null, 2));
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Text Optimizer
      </Typography>
      <TextField
        fullWidth
        label="Enter your text"
        multiline
        rows={4}
        margin="normal"
        variant="outlined"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={optimizeText}>
        Optimize Text
      </Button>
      <Typography variant="h6" component="h2" gutterBottom>
        {optimizedText}
      </Typography>
    </Container>
  );
}
