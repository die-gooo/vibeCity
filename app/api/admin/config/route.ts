import { NextResponse } from "next/server";
import { defaultConfig, SiteConfig } from "@/lib/siteConfig";

const CONFIG_KEY = "site_config";

export async function GET() {
  try {
    const { kv } = await import("@vercel/kv");
    const config = await kv.get<SiteConfig>(CONFIG_KEY);
    return NextResponse.json(config ?? defaultConfig);
  } catch {
    return NextResponse.json(defaultConfig);
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { password, ...config } = body as { password: string } & SiteConfig;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { kv } = await import("@vercel/kv");
    await kv.set(CONFIG_KEY, config);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Storage unavailable" }, { status: 500 });
  }
}
