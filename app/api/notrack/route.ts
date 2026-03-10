import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const disable = searchParams.get("off") === "1";

  const res = NextResponse.redirect(new URL("/", req.url));

  if (disable) {
    // rimuovi il cookie di opt-out
    res.cookies.set("cv_notrack", "", { maxAge: 0, path: "/" });
  } else {
    // attiva opt-out: cookie valido 10 anni
    res.cookies.set("cv_notrack", "1", {
      maxAge: 60 * 60 * 24 * 365 * 10,
      path: "/",
      sameSite: "lax",
    });
  }

  return res;
}
