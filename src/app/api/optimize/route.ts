import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

type ResponseData = {
  message: string
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const text = body.text;
  try {
    const openai = new OpenAI({
      apiKey: process.env['OPENAI_API_KEY'],
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{
        role: 'user', content: `
        Analyze these examples and generate a similar improved version for a new input text using the same guidelines and style adjustments. 
        Match your language to the Input, meaning first recognize the language of the input and then write your answer in that language. Only generate the output, dont return what language you recongnized.
        Don't include anything but the Output text in your response, meaning DON'T include "Improved Output: " in your response.

        Example 1:
        
            Input: "This is teh best day of my life! So many thing to do so little time."
            Language recognition: English
            Improved Output: "This is the best day of my life! There are so many things to do and so little time."
        
        Example 2:
        
            Input: "Nothing compares to a quiet evening alone just the one two i's just me and my favorite book, the rain outside."
            Language recognition: English
            Improved Output: "Nothing compares to a quiet evening alone—just me, my favorite book, and the rain outside."

        Example 3:
            Input: "Ich gehe morgen in den Park weil Ich freue mich das Wetter ist schön."
            Language recognition: German
            Improved Output: "Ich gehe morgen in den Park, weil ich mich auf das schöne Wetter freue."
        
        Example 4:
        
            Input: "She's never goes to school on Fridays, I wonder wy."
            Language recognition: English
            Improved Output: "She never goes to school on Fridays, I wonder why."
        
        New Input Text:        
            Improved Output: ${text}
        `
      }],
      model: 'gpt-3.5-turbo-1106',
    });

    const optimizedText = chatCompletion;

    return NextResponse.json(
      { message: optimizedText },
      {
        status: 200
      }
    );
  }
  catch (error) {
    console.error(error);
  }
}