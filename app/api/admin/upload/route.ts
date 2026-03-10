import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const password = req.headers.get("x-admin-password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("video") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const blob = await put(`videos/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return NextResponse.json({ url: blob.url });
}
