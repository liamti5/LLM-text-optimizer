'use client';
import { Button, TextField, Typography, Container, Paper, CircularProgress, Stack } from '@mui/material';
import React, { useState } from 'react';


export default function Home() {
  const [optimizedText, setOptimizedText] = useState('');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const optimizeText = async () => {
    setLoading(true);
    
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
    setLoading(false);
  }

  return (
    <Container maxWidth="sm">
      <Typography variant='h4' color="textPrimary" gutterBottom sx={{ mt: 5 }}>
        LLM Text Optimizer
      </Typography>
      <TextField
        color='primary'
        fullWidth
        label="Enter the text you want to optimize and click on the button below."
        multiline
        rows={4}
        margin="normal"
        variant="outlined"

        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={optimizeText} disabled={!inputText.trim() || loading}>
        {loading ?
          <CircularProgress color="primary" />
          : 'Optimize Text'}
      </Button>
      {optimizedText && (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h6" component="h2" gutterBottom color="textSecondary">
            {optimizedText}
          </Typography>
        </Paper>
      )}
    </Container>
  );
}
