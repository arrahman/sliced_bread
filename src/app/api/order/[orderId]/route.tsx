import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string || 'supersecretkey';

export async function GET(request: NextRequest, context: { params: { orderId: string } }) {
  try {
    const params = await context.params;
    const orderId = params.orderId;

    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is missing.' }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { orderId: string };
      
      if (decoded.orderId !== orderId) {
        return NextResponse.json({ error: 'Invalid token for this order.' }, { status: 403 });
      }
    } catch (err) {
      return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 401 });
    }

    const filePath = path.join(process.cwd(), 'data/orders.json');

    const fileData = fs.readFileSync(filePath, 'utf-8');
    const orders = JSON.parse(fileData);

    const order = orders.find((o: any) => o.id === orderId);

    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
