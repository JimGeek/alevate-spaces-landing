# Alevate Spaces Landing Page

## 1. Purpose
The primary landing page for Alevate Spaces, focusing on interior design and premium real estate services. Features complex node based animations and extensive portfolio showcases.

## 2. System Context
*   **Type**: Next.js Application
*   **Backend Connection**: Connects to `Genius Backend` for Chat and Form submissions.
*   **Brand Slug**: `alevate-spaces`

## 3. Key Locations
*   **Pages**: `app/` (Next.js App Router structure).
*   **Chat Widget**: `app/components/ChatWidget.tsx` (or similar path in `components/`).
*   **Styles**: Tailwind CSS configured in `tailwind.config.ts`.
*   **Assets**: `public/` stores static images like logos.

## 4. Development (Isolation)
**Folder**: `alevate-spaces-landing/`

### Setup
```bash
npm install
# Ensure .env.local has:
# NEXT_PUBLIC_API_URL=http://localhost:8000
# NEXT_PUBLIC_BRAND_SLUG=alevate-spaces
```

### Run
```bash
npm run dev -- -p 3001
```
Access at: `http://localhost:3001` or `https://alevate.space` (Production)

## 5. Deployment
*   **Domain**: `https://alevate.space`
*   **Platform**: Vercel (Recommended)
