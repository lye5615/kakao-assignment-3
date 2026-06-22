import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { BACKEND_URL, createProxyErrorResponse } from "../../_lib/proxy";

type TodoRouteContext = {
  params: Promise<{ todoId: string }>;
};

export async function GET(
  _request: NextRequest,
  { params }: TodoRouteContext,
) {
  const { todoId } = await params;

  try {
    const response = await axios.get(`${BACKEND_URL}/todos/${todoId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: TodoRouteContext,
) {
  const { todoId } = await params;

  try {
    const body = await request.json();
    const response = await axios.put(
      `${BACKEND_URL}/todos/${todoId}`,
      body,
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: TodoRouteContext,
) {
  const { todoId } = await params;

  try {
    await axios.delete(`${BACKEND_URL}/todos/${todoId}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}
