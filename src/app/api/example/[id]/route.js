/**
 * API Route: /api/example/[id]
 * Fetches injection examples from the Flask backend
 */

import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * GET /api/example/[id]
 * Fetches a specific injection example
 */
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        
        // Validate ID
        const exampleId = parseInt(id);
        if (isNaN(exampleId) || exampleId < 0) {
            return NextResponse.json(
                { success: false, error: 'Invalid example ID' },
                { status: 400 }
            );
        }

        // Fetch from Flask backend
        const response = await fetch(`${API_BASE_URL}/api/example/${exampleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store' // Always fetch fresh data
        });

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json(
                    { success: false, error: 'Example not found' },
                    { status: 404 }
                );
            }
            throw new Error(`Backend responded with status ${response.status}`);
        }

        const data = await response.json();
        
        return NextResponse.json({
            success: true,
            ...data
        });

    } catch (error) {
        console.error('Error fetching example:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch example' },
            { status: 500 }
        );
    }
}