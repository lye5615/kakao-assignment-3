import axios from "axios";
import { NextResponse } from "next/server";

export const BACKEND_URL =
  process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

export function createProxyErrorResponse(error: unknown): NextResponse {
  if (axios.isAxiosError(error)) {
    return NextResponse.json(
      error.response?.data ?? { detail: "백엔드 요청에 실패했습니다." },
      { status: error.response?.status ?? 502 },
    );
  }

  return NextResponse.json(
    { detail: "서버 요청 중 알 수 없는 오류가 발생했습니다." },
    { status: 500 },
  );
}
