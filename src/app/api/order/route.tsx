import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { z, ZodError } from 'zod';
import { orderSchema } from '../../validation/orderSchema';
import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string || 'supersecretkey';

// POST order handler
export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Validate and parse the data using Zod
        const validated = orderSchema.parse(data);

        // Generate unique order ID
        const orderId = crypto.randomUUID();

        const {
            name,
            quantity,
            city,
            state,
            country
        } = validated;

        const order = {
            id: orderId,
            name: name?.trim() || faker.person.fullName(),
            quantity: quantity && Number(quantity) > 0 ? Number(quantity) : faker.number.int({ min: 1, max: 10 }),
            city: city.trim(),
            state: state.trim(),
            country: country.trim(),
            createdAt: new Date().toISOString(),
        };

        // Define the file path to save orders
        const filePath = path.join(process.cwd(), 'data/orders.json');

        // Load existing orders
        let orders = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            orders = JSON.parse(fileData);
        }

        // Append new order
        orders.push(order);
        fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

        // Generate JWT token valid for 1 hour
        const token = jwt.sign({ orderId }, SECRET_KEY, { expiresIn: '1h' });

        return NextResponse.json({ orderId, token }, { status: 201 });

        // Return success
        return NextResponse.json({ success: true, orderId });
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof ZodError) {
            if (error instanceof ZodError) {
                // Map Zod errors to a field-based error object
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    const field = err.path[0];
                    if (typeof field === 'string') {
                        fieldErrors[field] = err.message;
                    }
                });

                return NextResponse.json({ errors: fieldErrors }, { status: 400 });
            }

            console.error('API error:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    }
}
