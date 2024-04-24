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
      apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: `Output a version of the text that is improved. This can mean correction of spelling errors or other improvements like style and length. This is the text to improve: ${text}` }],
      model: 'gpt-3.5-turbo',
    });

    const optimizedText = chatCompletion;

    // Extract the text from the response
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