import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { findOrCreateOAuthUser } from "@/lib/services/auth.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const errorParam = searchParams.get("error");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  // Google에서 에러 반환 시
  if (errorParam) {
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_denied`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_invalid`);
  }

  // CSRF state 검증
  const savedState = request.cookies.get("oauth_state")?.value;
  if (!savedState || savedState !== state) {
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_state_mismatch`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_not_configured`);
  }

  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  // code → access_token 교환
  let accessToken: string;
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      return NextResponse.redirect(`${baseUrl}/login?error=oauth_token_failed`);
    }
    accessToken = tokenData.access_token;
  } catch {
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_token_failed`);
  }

  // access_token으로 Google 프로필 조회
  let profile: { sub: string; email: string; given_name: string; family_name: string; picture?: string };
  try {
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      return NextResponse.redirect(`${baseUrl}/login?error=oauth_profile_failed`);
    }
    profile = await userRes.json();
  } catch {
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_profile_failed`);
  }

  if (!profile.email || !profile.sub) {
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_missing_email`);
  }

  await ensureDb();

  const { token } = await findOrCreateOAuthUser("google", profile.sub, {
    email: profile.email,
    first_name: profile.given_name ?? "",
    last_name: profile.family_name ?? "",
    avatar_url: profile.picture,
  });

  const response = NextResponse.redirect(`${baseUrl}/`);

  // state 쿠키 삭제
  response.cookies.set("oauth_state", "", { maxAge: 0, path: "/" });

  // 세션 쿠키 설정 (기존 방식과 동일)
  response.cookies.set("aether_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7일
  });

  return response;
}
