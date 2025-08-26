import { updateSession } from '@/lib/supabase/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

const referralParams = ['utm_source', 'ref', 'via', 'aff', 'referral', 'referral_code'];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  try {
    let referralValue: string | null = null;

    // Extract referral parameters
    for (const param of referralParams) {
      const value = request.nextUrl.searchParams.get(param);
      if (value) {
        referralValue = value;
        break;
      }
    }

    // Process Supabase authentication
    const supabaseResponse = await updateSession(request);

    // If Supabase middleware returned a redirect, handle referral and return
    if (supabaseResponse.headers.get('location')) {
      if (referralValue) {
        supabaseResponse.cookies.set('referral_source', referralValue, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30 // 30 days
        });
      }
      return supabaseResponse;
    }

    // Process internationalization
    const intlResponse = intlMiddleware(request);

    // Set referral cookie if present
    if (referralValue) {
      intlResponse.cookies.set('referral_source', referralValue, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    }

    // Copy Supabase cookies to intl response
    const supabaseCookies = supabaseResponse.cookies.getAll();
    supabaseCookies.forEach((cookie) => {
      const { name, value, ...options } = cookie;
      intlResponse.cookies.set(name, value, options);
    });

    return intlResponse;
  } catch (error) {
    console.error('Middleware error:', error);
    // Fallback to basic intl middleware if something goes wrong
    return intlMiddleware(request);
  }
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|auth|.*\\.|favicon.ico).*)'
  ]
};