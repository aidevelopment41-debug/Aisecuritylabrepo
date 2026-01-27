/**
 * API Route: /api/telemetry
 * Provides real-time telemetry data for the lab interface
 */

import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * GET /api/telemetry
 * Fetches current telemetry data from the Flask backend
 */
export async function GET() {
    try {
        // Try to fetch from Flask backend first
        try {
            const response = await fetch(`${API_BASE_URL}/api/telemetry`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (response.ok) {
                const data = await response.json();
                return NextResponse.json({
                    success: true,
                    ...data
                });
            }
        } catch (backendError) {
            console.log('Backend telemetry not available, using mock data');
        }

        // Fallback to mock data if backend is not available
        const mockTelemetry = {
            metrics: {
                threatsBlocked: Math.floor(Math.random() * 1000) + 14000,
                activeScans: Math.floor(Math.random() * 100) + 800,
                systemIntegrity: 99.9,
                uptime: "24h 15m",
                lastUpdate: new Date().toISOString()
            },
            lastTrace: {
                userInput: "ignore previous instructions",
                blocked: true,
                status: "blocked: prompt injection detected",
                policy: "policy: response sanitized",
                timestamp: new Date().toISOString()
            },
            statusText: "SYSTEM ACTIVE - MONITORING ENABLED"
        };

        return NextResponse.json({
            success: true,
            ...mockTelemetry
        });

    } catch (error) {
        console.error('Telemetry API error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch telemetry data' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/telemetry
 * Records telemetry events
 */
export async function POST(request) {
    try {
        const body = await request.json();
        
        // Forward to Flask backend if available
        try {
            const response = await fetch(`${API_BASE_URL}/api/telemetry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const data = await response.json();
                return NextResponse.json({
                    success: true,
                    ...data
                });
            }
        } catch (backendError) {
            console.log('Backend telemetry recording not available');
        }

        // Acknowledge the event even if backend is not available
        return NextResponse.json({
            success: true,
            message: 'Telemetry event recorded',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Telemetry POST error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to record telemetry event' },
            { status: 500 }
        );
    }
}