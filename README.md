# AI Security Lab

AI Security Lab is a Next.js App Router frontend for an AI security platform. It combines a marketing site, an interactive prompt-injection lab, live telemetry visuals, and authentication-ready flows for backend integration.

## Highlights
- Prompt injection lab with simulated terminal, hints, and telemetry updates.
- Live defense console driven by a telemetry provider.
- Auth flow with login, registration, and protected routes.
- Modular UI components built with Tailwind CSS and Radix primitives.
- Motion-rich marketing pages using Framer Motion and Anime.js.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4 + tw-animate
- Framer Motion + Anime.js
- Axios
- Radix UI primitives + Lucide icons

## Project Structure
```
.
|-- src/
|   |-- app/            # App Router pages and layouts
|   |-- components/     # UI and feature components
|   |-- hooks/          # Auth and telemetry providers
|   |-- lib/            # Utilities and constants
|   |-- services/       # API clients
|   `-- types/          # JSDoc type definitions
|-- public/             # Static assets
|-- docs/               # Detailed documentation
`-- API_SETUP.md        # API/auth integration notes
```

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   ```bash
   copy .env.example .env.local
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`.

## Environment Variables
- `NEXT_PUBLIC_API_URL` - Base URL for backend auth and API calls.
- `NEXT_PUBLIC_TELEMETRY_URL` - Optional telemetry endpoint (JSON).
- `NEXT_PUBLIC_APP_NAME` - Display name for the UI.
- `NEXT_PUBLIC_VERSION` - App version string.

## Scripts
- `npm run dev` - Start the dev server.
- `npm run build` - Build for production.
- `npm run start` - Run the production server.
- `npm run lint` - Run ESLint.

## Routes
- `/` Home (marketing + telemetry)
- `/about` About
- `/company` Company
- `/platform` Platform overview
- `/services` Services (marketing)
- `/projects` Projects
- `/research` Research
- `/research/rag-security` Research detail page
- `/updates` Updates
- `/tutorial` Tutorial content
- `/login` Login
- `/signup` Registration
- `/profile` Profile
- `/dashboard` Dashboard
- `/lab` Interactive prompt injection lab
- `/privacy` Privacy

## Auth Integration
- `AuthProvider` initializes auth state and is mounted in `src/app/layout.js`.
- `authService.login` stores `access_token` in `localStorage`.
- Axios attaches `Authorization: Bearer <token>` on requests.
- A `401` response clears the token and redirects to `/login`.
- Auth flows are client-side because they depend on `localStorage`.

## Telemetry
- `TelemetryProvider` stores metrics, last trace, and status text.
- Terminal and Live Console update telemetry state via `recordEvent`.
- If `NEXT_PUBLIC_TELEMETRY_URL` is set, polling runs every 5 seconds.

Telemetry payload shape:
```json
{
  "metrics": {
    "threatsBlocked": 14214,
    "activeScans": 848,
    "systemIntegrity": 99.9
  },
  "lastTrace": {
    "userInput": "ignore previous instructions",
    "blocked": true,
    "status": "blocked: prompt injection detected",
    "policy": "policy: response sanitized"
  },
  "statusText": "PROMPT INJECTION BLOCKED"
}
```

## Security Notes
- Tokens are stored in `localStorage`, which is convenient but exposes tokens to XSS risk.
- Harden production with CSP headers, strict input handling, and a secure token strategy (HttpOnly cookies recommended).
- Client-side guards are not a substitute for backend authorization.

## Deployment
- Compatible with Vercel and Node hosting.
- Set environment variables in the hosting environment.
- Backend must allow CORS and implement `/auth/login`, `/auth/register`, and `/auth/me`.

## Testing Guidance
No automated tests are configured in this repository. Recommended additions:
- Unit tests for hooks and services.
- Component tests for auth forms and the lab terminal.
- E2E tests for login, registration, and lab flows.

## Documentation
- `AI_Security_Lab_Report.pdf` - Full technical report (PDF)
- `docs/ARCHITECTURE.md`
- `docs/DEVELOPMENT.md`
- `API_SETUP.md`

---

# Full Technical Report (Embedded)

## 1. Executive Summary
AI Security Lab is a Next.js App Router frontend focused on AI security education and simulation. It provides a marketing site, an interactive prompt-injection lab, live telemetry visuals, and authentication-ready flows integrated with a backend API.

## 2. Scope
This documentation covers:
- Frontend architecture and runtime behavior
- Pages and routing
- Core components and UI system
- Auth and telemetry flows
- Environment configuration
- Development, build, and deployment processes
- Security and operational considerations

Backend services are out of scope, but expected API contracts are documented.

## 3. Technology Stack
- Framework: Next.js 16 (App Router)
- UI: React 19
- Styling: Tailwind CSS 4 + tw-animate
- Motion: Framer Motion, Anime.js
- HTTP: Axios
- UI Primitives: Radix UI
- Icons: Lucide

## 4. High-Level Architecture
The app is composed of:
- App Router pages under `src/app`
- Shared UI and feature components under `src/components`
- Context providers in `src/hooks`
- API clients in `src/services`
- Shared utilities and constants in `src/lib`

Runtime layout wraps all pages with:
- TelemetryProvider (global telemetry state)
- AuthProvider (global auth state)
- Navbar and Footer

## 5. Directory Layout (Key Areas)
- `src/app`: Route pages and layouts
- `src/components`: Feature and UI components
- `src/components/ui`: Base UI primitives
- `src/components/auth`: Auth-specific components
- `src/components/lab`: Lab experience UI
- `src/hooks`: Providers and hooks
- `src/services`: Axios client and auth service
- `src/lib`: Utilities and constants
- `src/types`: JSDoc definitions for types

## 6. Routing Map
- `/` Home (marketing + telemetry)
- `/about` About
- `/company` Company
- `/platform` Platform overview
- `/services` Services (marketing)
- `/projects` Projects
- `/research` Research
- `/research/rag-security` Research detail page
- `/updates` Updates
- `/tutorial` Tutorial content
- `/login` Login
- `/signup` Registration
- `/profile` Profile
- `/dashboard` Dashboard
- `/lab` Interactive prompt injection lab
- `/privacy` Privacy

## 7. Core Runtime Flows

### 7.1 Authentication Flow
- AuthProvider initializes auth state on load.
- If a token exists in localStorage, it fetches `/auth/me`.
- `authService.login` stores the token and updates state.
- `authService.logout` clears token and redirects to `/login`.

Axios request interceptor:
- Adds `Authorization: Bearer <token>` if present.

Axios response interceptor:
- On `401`, clears token and redirects to `/login`.

### 7.2 Telemetry Flow
- TelemetryProvider stores:
  - metrics (threatsBlocked, activeScans, systemIntegrity)
  - lastTrace (userInput, blocked, status, policy)
  - statusText (e.g., `PROMPT INJECTION BLOCKED`)
- If `NEXT_PUBLIC_TELEMETRY_URL` is set, it polls every 5 seconds.
- TerminalInterface records events into telemetry.
- LiveDefenseConsole renders live telemetry state.

## 8. Key Components Overview

### Global Layout
- `src/app/layout.js` sets fonts, global styles, providers, and background effects.

### Marketing and Landing
- `HeroBackground`, `SecurityFeatures`, `Securityes`, `Projects`, `ThreatMap`,
  `LiveDefenseConsole`, `Navbar`, `Footer`.

### Lab Experience
- `TerminalInterface` simulates prompt injection attempts.
- Lab UI uses `Card`, `Badge`, and layout utilities.

### Auth UI
- `LoginForm`, `RegisterForm`, `ProtectedRoute`.
- `ProtectedRoute` enforces authentication and optional admin access.

## 9. Environment Configuration
Supported environment variables:
- `NEXT_PUBLIC_API_URL` (required for auth)
- `NEXT_PUBLIC_TELEMETRY_URL` (optional telemetry endpoint)
- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_VERSION`

Example:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_TELEMETRY_URL=
NEXT_PUBLIC_APP_NAME=AI Security Lab
NEXT_PUBLIC_VERSION=1.0.0
```

## 10. Development and Build

### Local Development
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

### Build and Run
- `npm run build`
- `npm run start`

### Linting
- `npm run lint`

## 11. Security Considerations
- Tokens are stored in localStorage. This is simple but exposes tokens to XSS risks.
- Production readiness requires:
  - Strong CSP headers
  - Input sanitization
  - Secure auth storage strategy (consider HttpOnly cookies)
- Client-side routing guards are not a substitute for server authorization.

## 12. Deployment Notes
- Works on Vercel or any Node-based hosting.
- Ensure environment variables are set at deploy time.
- The backend must support CORS and the expected auth routes.

## 13. Observability and Telemetry
- Telemetry is client-driven and optionally backed by an endpoint.
- Metrics are displayed in the live console and lab.

## 14. Testing Guidance
Current repo has no automated tests configured.
Recommended additions:
- Unit tests for hooks and services
- Component tests for auth forms and lab terminal
- E2E tests for login, registration, and lab flows

## 15. Known Gaps and Risks
- Auth uses localStorage, which is a security tradeoff.
- No server-side guards or middleware for auth.
- Telemetry endpoint contract should be finalized.
- No tests or CI pipeline configured.

## 16. Recommended Next Steps
1. Add secure token storage (HttpOnly cookies).
2. Implement backend validation and rate limiting.
3. Add automated tests and CI workflow.
4. Define telemetry schema and logging retention policies.
5. Harden production security headers.

## 17. Appendix: API Contract Summary
Expected backend routes:
- `POST /auth/login` (form-encoded)
- `POST /auth/register` (JSON)
- `GET /auth/me` (auth required)

Telemetry endpoint (optional):
- `GET <NEXT_PUBLIC_TELEMETRY_URL>` returns:
```
{
  "metrics": { "threatsBlocked": 0, "activeScans": 0, "systemIntegrity": 99.9 },
  "lastTrace": { "userInput": "", "blocked": true, "status": "", "policy": "" },
  "statusText": "PROMPT INJECTION BLOCKED"
}
```
