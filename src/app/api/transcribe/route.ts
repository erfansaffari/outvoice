import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const audioFile = formData.get("audio") as File | null;

  if (!audioFile) {
    return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith("sk-your")) {
    return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
  }

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "en",
    });

    return NextResponse.json({ transcript: transcription.text });
  } catch (err) {
    console.error("Whisper error:", err);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
