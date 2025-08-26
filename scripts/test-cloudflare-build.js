const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Test script to validate Cloudflare build and compatibility
 */

console.log('🚀 Testing Cloudflare Build Configuration...\n');

const tests = [
  {
    name: 'Check wrangler.toml exists',
    test: () => fs.existsSync('wrangler.toml'),
    fix: 'Ensure wrangler.toml is created with proper configuration'
  },
  {
    name: 'Check Next.js config for Cloudflare compatibility',
    test: () => {
      const config = fs.readFileSync('next.config.mjs', 'utf8');
      return config.includes('unoptimized: true') && 
             config.includes('trailingSlash: true');
    },
    fix: 'Update next.config.mjs with Cloudflare-compatible settings'
  },
  {
    name: 'Check package.json has Cloudflare scripts',
    test: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.scripts['build:cloudflare'] && 
             pkg.scripts['deploy'] &&
             pkg.devDependencies['wrangler'];
    },
    fix: 'Add Cloudflare build scripts and wrangler dependency'
  },
  {
    name: 'Check functions directory exists',
    test: () => fs.existsSync('functions'),
    fix: 'Run npm run build:cloudflare to create functions'
  },
  {
    name: 'Check Supabase edge client exists',
    test: () => fs.existsSync('lib/supabase/server-cf.ts'),
    fix: 'Ensure Cloudflare-compatible Supabase client is created'
  },
  {
    name: 'Check environment template exists',
    test: () => fs.existsSync('.env.cloudflare'),
    fix: 'Create .env.cloudflare template file'
  },
  {
    name: 'Check deployment guide exists',
    test: () => fs.existsSync('CLOUDFLARE_DEPLOYMENT.md'),
    fix: 'Create deployment guide documentation'
  },
  {
    name: 'Check GitHub Actions workflow exists',
    test: () => fs.existsSync('.github/workflows/deploy-cloudflare.yml'),
    fix: 'Create GitHub Actions deployment workflow'
  }
];

let passed = 0;
let failed = 0;

console.log('Running compatibility tests...\n');

tests.forEach((test, index) => {
  try {
    const result = test.test();
    if (result) {
      console.log(`✅ ${index + 1}. ${test.name}`);
      passed++;
    } else {
      console.log(`❌ ${index + 1}. ${test.name}`);
      console.log(`   Fix: ${test.fix}\n`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ ${index + 1}. ${test.name} (Error: ${error.message})`);
    console.log(`   Fix: ${test.fix}\n`);
    failed++;
  }
});

console.log('\n📊 Test Results:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📋 Total: ${tests.length}`);

if (failed === 0) {
  console.log('\n🎉 All tests passed! Your application is ready for Cloudflare deployment.');
  console.log('\nNext steps:');
  console.log('1. Set up environment variables in Cloudflare Pages dashboard');
  console.log('2. Configure your Git repository with Cloudflare Pages');
  console.log('3. Deploy using: npm run deploy');
  console.log('\nSee CLOUDFLARE_DEPLOYMENT.md for detailed instructions.');
} else {
  console.log('\n⚠️  Some tests failed. Please fix the issues above before deploying.');
}

// Test build process
console.log('\n🔨 Testing build process...');
try {
  console.log('Running Next.js build...');
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Next.js build successful');
  
  console.log('Testing Cloudflare functions build...');
  execSync('npm run build:cf-functions', { stdio: 'pipe' });
  console.log('✅ Cloudflare functions build successful');
  
} catch (error) {
  console.log('❌ Build failed:', error.message);
  console.log('Check your configuration and dependencies');
}