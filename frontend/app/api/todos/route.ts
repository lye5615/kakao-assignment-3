import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { BACKEND_URL, createProxyErrorResponse } from "../_lib/proxy";

export async function GET(request: NextRequest) {
  try {
    const query = Object.fromEntries(request.nextUrl.searchParams);
    const response = await axios.get(`${BACKEND_URL}/todos`, {
      params: query,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await axios.post(`${BACKEND_URL}/todos`, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}
