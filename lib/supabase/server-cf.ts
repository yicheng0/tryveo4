/**
 * Cloudflare-compatible Supabase server client
 * This version works with Cloudflare Workers/Pages Functions
 */

import { Database } from '@/lib/supabase/types'
import { createServerClient } from '@supabase/ssr'

export async function createClient(request?: Request) {
  // For Cloudflare Workers, we need to handle cookies differently
  const cookies = request?.headers.get('Cookie') || '';
  const cookieMap = new Map();
  
  // Parse cookies from request headers
  if (cookies) {
    cookies.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookieMap.set(name, decodeURIComponent(value));
      }
    });
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookieArray: { name: string; value: string }[] = [];
          cookieMap.forEach((value, name) => {
            cookieArray.push({ name, value });
          });
          return cookieArray;
        },
        setAll(cookiesToSet) {
          // In Cloudflare Workers, we'll need to handle this via response headers
          // This is handled by the calling function
          cookiesToSet.forEach(({ name, value }) => {
            cookieMap.set(name, value);
          });
        },
      },
    }
  )
}

/**
 * Alternative client for when we need to work with Request/Response objects directly
 */
export async function createClientWithResponse(request: Request) {
  let response = new Response();
  const cookiesFromRequest = new Map();
  
  // Parse existing cookies
  const cookieHeader = request.headers.get('Cookie') || '';
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookiesFromRequest.set(name, decodeURIComponent(value));
      }
    });
  }

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookieArray: { name: string; value: string }[] = [];
          cookiesFromRequest.forEach((value, name) => {
            cookieArray.push({ name, value });
          });
          return cookieArray;
        },
        setAll(cookiesToSet) {
          // Set cookies in response headers
          cookiesToSet.forEach(({ name, value, options = {} }) => {
            const cookieString = `${name}=${encodeURIComponent(value)}; ${Object.entries(options)
              .map(([key, val]) => `${key}=${val}`)
              .join('; ')}`;
            response.headers.append('Set-Cookie', cookieString);
          });
        },
      },
    }
  );

  return { supabase, response };
}