import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET() {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json();
  //logic
  return Response.json(data)
}

export async function POST(request: Request) {
  const res = await request.json();
  return Response.json({ res });
  
}