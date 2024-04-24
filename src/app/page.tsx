'use client';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
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
    console.log(data.message)
    setOptimizedText(JSON.stringify(data.message.choices[0].message.content, null, 2));
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom marginTop={"50px"}>
        LLM Text Optimizer
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
      {optimizedText && (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {optimizedText}
          </Typography>
        </Paper>
      )}
    </Container>
  );
}
