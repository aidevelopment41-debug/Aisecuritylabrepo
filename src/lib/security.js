/**
 * Security utilities for AI Security Lab
 * Provides rate limiting, input validation, CSRF protection, and safe DOM operations
 */

class SecurityManager {
    constructor() {
        this.lastRequestTime = 0;
        this.REQUEST_THROTTLE = 1000; // 1 second between requests
    }

    /**
     * Validate API response format
     */
    validateApiResponse(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid API response format');
        }
        return true;
    }

    /**
     * Create a safe badge element without XSS vulnerabilities
     */
    createBadge(text, className = '') {
        if (typeof document === 'undefined') return null;
        const span = document.createElement('span');
        span.className = className;
        span.textContent = text; // Safe text assignment
        return span;
    }

    /**
     * Get CSRF token from meta tag
     */
    getCsrfToken() {
        if (typeof document === 'undefined') return null;
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta ? meta.getAttribute('content') : null;
    }

    /**
     * Check if enough time has passed for next request (rate limiting)
     */
    canMakeRequest() {
        const now = Date.now();
        if (now - this.lastRequestTime < this.REQUEST_THROTTLE) {
            return false;
        }
        this.lastRequestTime = now;
        return true;
    }

    /**
     * Safe error logging without sensitive data exposure
     */
    logError(message, context = '') {
        console.error(`[AI Security Lab] ${message}`, context ? `Context: ${context}` : '');
    }

    /**
     * Validate input length and content
     */
    validateInput(input, maxLength = 5000) {
        if (!input || typeof input !== 'string') {
            return { valid: false, error: 'Input must be a non-empty string' };
        }
        
        if (input.length > maxLength) {
            return { valid: false, error: `Input exceeds maximum length of ${maxLength} characters` };
        }
        
        return { valid: true };
    }

    /**
     * Sanitize output for safe display
     */
    sanitizeOutput(text) {
        if (typeof text !== 'string') return '';
        if (typeof document === 'undefined') return text;
        
        // Create a temporary div to leverage browser's HTML parsing
        const temp = document.createElement('div');
        temp.textContent = text;
        return temp.innerHTML;
    }

    /**
     * Validate risk level
     */
    isValidRiskLevel(riskLevel) {
        const validLevels = ['low', 'medium', 'high'];
        return validLevels.includes((riskLevel || '').toLowerCase());
    }

    /**
     * Get CSS class for risk level
     */
    getRiskLevelClass(riskLevel) {
        switch ((riskLevel || '').toLowerCase()) {
            case 'high':
                return 'border-red-500/50 text-red-400 bg-red-500/10';
            case 'medium':
                return 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10';
            case 'low':
                return 'border-green-500/50 text-green-400 bg-green-500/10';
            default:
                return 'border-gray-500/50 text-gray-400 bg-gray-500/10';
        }
    }

    /**
     * Format pattern names for display
     */
    formatPatternName(pattern) {
        if (typeof pattern !== 'string') return '';
        return pattern.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    /**
     * Validate email format
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Create safe headers for API requests
     */
    createSafeHeaders(additionalHeaders = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...additionalHeaders
        };

        const csrfToken = this.getCsrfToken();
        if (csrfToken) {
            headers['X-CSRF-Token'] = csrfToken;
        }

        return headers;
    }
}

// Create a singleton instance
const securityManager = new SecurityManager();

/**
 * React hook for security utilities
 * Only use in client components with "use client" directive
 */
export function useSecurity() {
    return securityManager;
}

// Export the class for direct usage
export { SecurityManager };

// Export individual functions for convenience
export const {
    validateApiResponse,
    createBadge,
    getCsrfToken,
    canMakeRequest,
    logError,
    validateInput,
    sanitizeOutput,
    isValidRiskLevel,
    getRiskLevelClass,
    formatPatternName,
    validateEmail,
    createSafeHeaders
} = securityManager;
    

    /**
     * Safe error logging without sensitive data exposure
     */
    logError(message, context = '') {
        console.error(`[AI Security Lab] ${message}`, context ? `Context: ${context}` : '');
    }

    /**
     * Validate input length and content
     */
    validateInput(input, maxLength = 5000) {
        if (!input || typeof input !== 'string') {
            return { valid: false, error: 'Input must be a non-empty string' };
        }
        
        if (input.length > maxLength) {
            return { valid: false, error: `Input exceeds maximum length of ${maxLength} characters` };
        }
        
        return { valid: true };
    }

    /**
     * Sanitize output for safe display
     */
    sanitizeOutput(text) {
        if (typeof text !== 'string') return '';
        
        // Create a temporary div to leverage browser's HTML parsing
        const temp = document.createElement('div');
        temp.textContent = text;
        return temp.innerHTML;
    }

    /**
     * Validate risk level
     */
    isValidRiskLevel(riskLevel) {
        const validLevels = ['low', 'medium', 'high'];
        return validLevels.includes((riskLevel || '').toLowerCase());
    }

    /**
     * Get CSS class for risk level
     */
    getRiskLevelClass(riskLevel) {
        switch ((riskLevel || '').toLowerCase()) {
            case 'high':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'medium':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'low':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default:
                return 'bg-green-500/20 text-green-400 border-green-500/30';
        }
    }

    /**
     * Format pattern names for display
     */
    formatPatternName(pattern) {
        return (pattern || '')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());
    }

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Create headers with CSRF protection
     */
    createSecureHeaders(includeJson = true) {
        const headers = {};
        
        if (includeJson) {
            headers['Content-Type'] = 'application/json';
        }

        const csrfToken = this.getCsrfToken();
        if (csrfToken) {
            headers['X-CSRF-Token'] = csrfToken;
        }

        return headers;
    }
}

// Export singleton instance
export const security = new SecurityManager();

/**
 * Hook for client-side security operations
 */
export function useSecurity() {
    return {
        validateApiResponse: (data) => security.validateApiResponse(data),
        createBadge: (text, className) => security.createBadge(text, className),
        getCsrfToken: () => security.getCsrfToken(),
        canMakeRequest: () => security.canMakeRequest(),
        logError: (message, context) => security.logError(message, context),
        validateInput: (input, maxLength) => security.validateInput(input, maxLength),
        sanitizeOutput: (text) => security.sanitizeOutput(text),
        isValidRiskLevel: (riskLevel) => security.isValidRiskLevel(riskLevel),
        getRiskLevelClass: (riskLevel) => security.getRiskLevelClass(riskLevel),
        formatPatternName: (pattern) => security.formatPatternName(pattern),
        isValidEmail: (email) => security.isValidEmail(email),
        createSecureHeaders: (includeJson) => security.createSecureHeaders(includeJson),
    };
}
