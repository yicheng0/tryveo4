const fs = require('fs');
const path = require('path');

/**
 * Script to convert Next.js API routes to Cloudflare Pages Functions
 * This will transform the existing API routes to be compatible with Cloudflare Workers
 */

const apiDir = path.join(process.cwd(), 'app/api');
const functionsDir = path.join(process.cwd(), 'functions');

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function convertApiRoute(sourceFilePath, targetFilePath) {
  let content = fs.readFileSync(sourceFilePath, 'utf8');
  
  // Convert Next.js patterns to Cloudflare compatible ones
  
  // 1. Replace runtime declarations with Cloudflare compatibility
  content = content.replace(/export const runtime = "edge";?/g, '// Cloudflare Workers runtime');
  content = content.replace(/export const runtime = "nodejs";?/g, '// Cloudflare Workers runtime');
  content = content.replace(/export const maxDuration = \d+;?/g, '// Cloudflare Workers timeout');
  
  // 2. Convert HTTP method exports to Cloudflare Functions format
  const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
  
  httpMethods.forEach(method => {
    const methodPattern = new RegExp(`export async function ${method}\\(req: Request\\)`, 'g');
    content = content.replace(
      methodPattern, 
      `export async function onRequest${method}(context: { request: Request; env: any })`
    );
    
    // Update function body to destructure context
    const bodyPattern = new RegExp(`(export async function onRequest${method}\\(context: { request: Request; env: any }\\)\\s*{)`, 'g');
    content = content.replace(
      bodyPattern,
      `$1
  const { request, env } = context;
  
  // Set environment variables from Cloudflare
  if (env) {
    Object.entries(env).forEach(([key, value]) => {
      if (typeof value === 'string') {
        process.env[key] = value;
      }
    });
  }
  
  // Replace 'req' with 'request' in the function body
  const req = request;`
    );
  });
  
  // 3. Convert Next.js headers() function calls
  content = content.replace(/import { headers } from 'next\/headers';?/g, '// Headers handled via request.headers');
  content = content.replace(/const headerPayload = await headers\(\);?/g, '// Headers accessed via request.headers');
  content = content.replace(/headerPayload\.get\(/g, 'request.headers.get(');
  
  // 4. Convert Next.js after() function calls (remove them as they're not needed in Cloudflare)
  content = content.replace(/import { after } from 'next\/server';?/g, '// Background tasks handled differently in Cloudflare');
  content = content.replace(/after\(\(\) => {[\s\S]*?}\);?/g, '// Background processing removed for Cloudflare compatibility');
  
  // 5. Add Cloudflare function header comment
  content = `/**
 * Cloudflare Pages Function - Auto-converted from Next.js API route
 * Original file: ${path.relative(process.cwd(), sourceFilePath)}
 */

${content}`;
  
  return content;
}

function processDirectory(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.log(`Source directory ${srcDir} does not exist`);
    return;
  }
  
  ensureDirectoryExists(destDir);
  
  const items = fs.readdirSync(srcDir);
  
  items.forEach(item => {
    const srcPath = path.join(srcDir, item);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      const destPath = path.join(destDir, item);
      processDirectory(srcPath, destPath);
    } else if (item === 'route.ts' || item === 'route.js') {
      // Convert route.ts to function name based on directory
      const dirName = path.basename(srcDir);
      const destPath = path.join(destDir, `${dirName}.ts`);
      
      try {
        const convertedContent = convertApiRoute(srcPath, destPath);
        fs.writeFileSync(destPath, convertedContent);
        console.log(`Converted: ${srcPath} -> ${destPath}`);
      } catch (error) {
        console.error(`Error converting ${srcPath}:`, error.message);
      }
    }
  });
}

console.log('Converting Next.js API routes to Cloudflare Pages Functions...');

// Process all API routes
processDirectory(apiDir, path.join(functionsDir, 'api'));

console.log('API route conversion complete!');