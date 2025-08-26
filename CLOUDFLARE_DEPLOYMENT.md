# Cloudflare Pages/Workers Deployment Guide

This guide will help you deploy your Next.js application to Cloudflare Pages with Workers Functions.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install globally with `npm install -g wrangler`
3. **Domain**: Optional, but recommended for production

## Setup Steps

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Wrangler Authentication

```bash
wrangler login
```

### 3. Configure Cloudflare Pages

1. Go to your Cloudflare dashboard
2. Navigate to **Pages** section
3. Click **Create a project**
4. Connect your Git repository
5. Use these build settings:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build:cloudflare`
   - **Build output directory**: `.next`

### 4. Environment Variables

Copy all environment variables from `.env.cloudflare` to your Cloudflare Pages dashboard:

1. Go to your project in Cloudflare Pages
2. Navigate to **Settings** > **Environment variables**
3. Add all variables from `.env.cloudflare`

#### Required Environment Variables:

```bash
# Site Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.pages.dev

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# AI Providers (add only the ones you use)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_key
# ... add other AI providers as needed
```

### 5. Custom Domain (Optional)

1. In Cloudflare Pages, go to **Custom domains**
2. Add your domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` to your custom domain

### 6. Deploy

#### Automatic Deployment (Recommended)
- Push to your main branch
- Cloudflare Pages will automatically build and deploy

#### Manual Deployment
```bash
npm run deploy
```

## Key Changes for Cloudflare Compatibility

### 1. API Routes Conversion
- All API routes are automatically converted to Cloudflare Functions
- Located in `/functions/api/` directory
- Use `onRequestPost`, `onRequestGet`, etc. instead of `POST`, `GET`

### 2. Middleware Updates
- Enhanced error handling for edge runtime
- Proper cookie handling for Cloudflare Workers
- Fallback mechanisms for failed operations

### 3. Supabase Integration
- New edge-compatible client (`lib/supabase/server-cf.ts`)
- Proper cookie handling in Workers environment
- Compatible with Supabase SSR package

### 4. Image Optimization
- Disabled Next.js image optimization (not available in static export)
- All images use `unoptimized: true`
- R2 integration for image storage

## Testing Locally

### Development Server
```bash
npm run dev
```

### Cloudflare Pages Local Development
```bash
npm run cf:dev
```

This runs Cloudflare Pages locally with Workers Functions support.

## Troubleshooting

### Common Issues

1. **Environment Variables Not Working**
   - Ensure all variables are set in Cloudflare Pages dashboard
   - Variables are case-sensitive
   - No spaces around `=` in variable names

2. **API Routes Failing**
   - Check Cloudflare Functions logs in dashboard
   - Ensure all imports are available in edge runtime
   - Verify environment variables are accessible

3. **Supabase Authentication Issues**
   - Check cookie handling in middleware
   - Verify Supabase URL and keys
   - Ensure proper CORS configuration

4. **Build Failures**
   - Check build logs in Cloudflare Pages
   - Ensure all dependencies are installed
   - Verify Next.js configuration

### Monitoring and Logs

1. **Cloudflare Pages Dashboard**:
   - Build logs: Pages > [Your Project] > Build logs
   - Function logs: Pages > [Your Project] > Functions

2. **Wrangler CLI**:
   ```bash
   wrangler pages deployment tail
   ```

## Performance Optimization

### Edge Runtime Benefits
- **Global Distribution**: Your app runs on Cloudflare's global network
- **Cold Start Performance**: Faster than traditional serverless
- **Automatic Scaling**: Handles traffic spikes automatically

### Recommendations
1. Use Cloudflare R2 for file storage
2. Enable Cloudflare Cache for static assets
3. Use Cloudflare Analytics for monitoring
4. Consider Cloudflare KV for session storage

## Security Considerations

1. **Environment Variables**: Never commit secrets to your repository
2. **CORS Configuration**: Properly configured in Functions middleware
3. **Rate Limiting**: Consider using Cloudflare rate limiting rules
4. **Webhook Security**: Stripe webhook signatures are validated

## Migration Checklist

- [ ] Environment variables configured in Cloudflare Pages
- [ ] Custom domain configured (if applicable)
- [ ] Stripe webhooks updated to new domain
- [ ] Supabase CORS settings updated
- [ ] Email service (Resend) configured
- [ ] R2 bucket created and configured
- [ ] All API endpoints tested
- [ ] Authentication flow tested
- [ ] Payment processing tested
- [ ] AI demo functionality tested

## Support

For issues specific to this deployment:
1. Check Cloudflare Pages documentation
2. Review build and function logs
3. Test API endpoints individually
4. Verify environment variable configuration

For application-specific issues:
1. Check the original Next.js application documentation
2. Review API route implementations
3. Verify third-party service configurations