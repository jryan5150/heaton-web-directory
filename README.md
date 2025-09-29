# Heaton Employee Directory

A web application that serves as a read-only employee directory for the Heaton organization. Features include employee contact information, extension numbers, DIDs, and email addresses with filtering and search capabilities.

## Features

- **Authentication**: Secure sign-in system using NextAuth.js
- **Employee Directory**: Browse all employees with contact information
- **Search**: Search employees by name or email
- **Filtering**: Filter employees by location and team
- **Responsive Design**: Mobile-friendly interface
- **Contact Information**: Extension numbers, DIDs, and email addresses

## Demo Credentials

For testing purposes, use these credentials:
- Username: `admin`, Password: `password123`
- Username: `user`, Password: `user123`

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Copy `.env.local` and update the values:
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This application is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Set the environment variables in Vercel dashboard
4. Deploy

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                    # Utilities and configuration
├── types/                  # TypeScript type definitions
└── ...
```