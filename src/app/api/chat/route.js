/**
 * API Route: /api/chat
 * Handles injection testing and AI response generation
 */

import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * POST /api/chat
 * Tests a prompt injection against the LLM
 */
export async function POST(request) {
    try {
        // Parse request body
        const body = await request.json();
        const { message, system_prompt } = body;

        // Validate inputs
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: 'Message is required' },
                { status: 400 }
            );
        }

        if (!system_prompt || typeof system_prompt !== 'string') {
            return NextResponse.json(
                { success: false, error: 'System prompt is required' },
                { status: 400 }
            );
        }

        // Validate input lengths
        const MAX_MESSAGE_LENGTH = 5000;
        const MAX_PROMPT_LENGTH = 2000;

        if (message.length > MAX_MESSAGE_LENGTH) {
            return NextResponse.json(
                { success: false, error: `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH}` },
                { status: 400 }
            );
        }

        if (system_prompt.length > MAX_PROMPT_LENGTH) {
            return NextResponse.json(
                { success: false, error: `System prompt exceeds maximum length of ${MAX_PROMPT_LENGTH}` },
                { status: 400 }
            );
        }

        // Forward request to Flask backend
        const backendResponse = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message.trim(),
                system_prompt: system_prompt.trim(),
                injection_type: 'user_input'
            })
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json().catch(() => ({}));
            return NextResponse.json(
                { success: false, error: errorData.error || 'Backend request failed' },
                { status: backendResponse.status }
            );
        }

        const data = await backendResponse.json();
        
        // Return successful response
        return NextResponse.json({
            success: true,
            response: data.response,
            injection_analysis: data.injection_analysis,
            injection_success: data.injection_success,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * OPTIONS /api/chat
 * CORS preflight
 */
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
