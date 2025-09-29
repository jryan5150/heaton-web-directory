# Deployment Guide

## Quick Deploy to Vercel

### Option 1: GitHub Integration (Recommended)
1. Push this repository to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import from GitHub
4. Select this repository
5. Set environment variables:
   - `NEXTAUTH_URL`: Your production URL (Vercel will auto-detect)
   - `NEXTAUTH_SECRET`: Generate a secure secret key
6. Deploy!

### Option 2: Vercel CLI
```bash
# Login to Vercel
npx vercel login

# Deploy
npx vercel --prod
```

## Environment Variables for Production

Add these to your Vercel dashboard:
- `NEXTAUTH_URL`: `https://your-domain.vercel.app`
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`

## Post-Deployment

The modern design includes:
- ✅ Heaton brand colors and typography
- ✅ Professional employee cards with gradients
- ✅ Modern search interface with collapsible filters
- ✅ Responsive design optimized for all devices
- ✅ Professional authentication flow

Demo credentials:
- admin / password123
- user / user123