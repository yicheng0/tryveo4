const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Build script to prepare Cloudflare Functions from Next.js API routes
 * This script converts Next.js API routes to Cloudflare Pages Functions format
 */

console.log('Building Cloudflare Functions...');

// First run the API route conversion script
try {
  execSync('node scripts/convert-api-routes.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Error converting API routes:', error.message);
}

// Create additional Cloudflare-specific configurations
const functionsDir = path.join(process.cwd(), 'functions');

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Create _middleware.js for global middleware
const middlewareContent = `
/**
 * Global middleware for Cloudflare Pages Functions
 * Handles CORS, authentication, and other global concerns
 */

export async function onRequest(context) {
  const { request, next, env } = context;
  
  // Add CORS headers
  const response = await next();
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: response.headers,
    });
  }
  
  return response;
}
`;

ensureDirectoryExists(functionsDir);
fs.writeFileSync(path.join(functionsDir, '_middleware.js'), middlewareContent);

// Create a redirect handler for root paths
const indexContent = `
/**
 * Root path handler for Cloudflare Pages
 */

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Redirect root to default locale if needed
  if (url.pathname === '/') {
    return Response.redirect(url.origin + '/en', 302);
  }
  
  return new Response('Not Found', { status: 404 });
}
`;

fs.writeFileSync(path.join(functionsDir, 'index.js'), indexContent);

console.log('Cloudflare Functions build complete!');