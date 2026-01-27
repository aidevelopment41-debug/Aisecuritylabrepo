/**
 * Custom hook for lab functionality
 */

"use client"

import { useState, useCallback } from 'react';
import { useSecurity } from '@/lib/security';
import { simulateAIResponse, analyzeInjection } from '@/services/lab';

export function useLab() {
    const [history, setHistory] = useState([
        { type: 'system', content: 'Lab initialized. Ready for injection testing.' },
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const { canMakeRequest, logError, validateInput, createSecureHeaders } = useSecurity();

    /**
     * Send a message to the AI for testing
     */
    const sendMessage = useCallback(
        async (userInput, systemPrompt) => {
            // Rate limiting check
            if (!canMakeRequest()) {
                setError('Please wait before sending another request');
                return;
            }

            // Input validation
            const validation = validateInput(userInput);
            if (!validation.valid) {
                setError(validation.error);
                return;
            }

            if (!systemPrompt || systemPrompt.trim().length === 0) {
                setError('System prompt is required');
                return;
            }

            setIsProcessing(true);
            setError(null);

            try {
                // Add user message to history
                setHistory((prev) => [
                    ...prev,
                    { type: 'user', content: userInput },
                ]);

                // Call the AI endpoint
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: createSecureHeaders(true),
                    body: JSON.stringify({
                        message: userInput,
                        system_prompt: systemPrompt,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: Request failed`);
                }

                const data = await response.json();

                // Add AI response to history
                setHistory((prev) => [
                    ...prev,
                    {
                        type: 'ai',
                        content: data.response,
                        analysis: data.injection_analysis,
                        success: data.injection_success,
                    },
                ]);

                setIsProcessing(false);
                return data;
            } catch (err) {
                logError('Failed to send message', err.message);
                setError('Failed to process request. Please try again.');
                setIsProcessing(false);
                return null;
            }
        },
        [canMakeRequest, validateInput, logError, createSecureHeaders]
    );

    /**
     * Analyze injection without sending to AI
     */
    const analyzeOnly = useCallback((userInput, systemPrompt) => {
        try {
            const analysis = analyzeInjection(userInput, systemPrompt);
            return analysis;
        } catch (err) {
            logError('Analysis failed', err.message);
            return null;
        }
    }, [logError]);

    /**
     * Clear history
     */
    const clearHistory = useCallback(() => {
        setHistory([{ type: 'system', content: 'Lab cleared. Ready for new test.' }]);
        setError(null);
    }, []);

    /**
     * Add message to history (for system messages)
     */
    const addMessage = useCallback((type, content) => {
        setHistory((prev) => [...prev, { type, content }]);
    }, []);

    return {
        history,
        isProcessing,
        error,
        sendMessage,
        analyzeOnly,
        clearHistory,
        addMessage,
    };
}
