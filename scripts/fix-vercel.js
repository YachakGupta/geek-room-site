/* eslint-disable @typescript-eslint/no-require-imports */
const { spawnSync, execSync } = require('child_process');

const SUPABASE_URL = "https://tcoqhpyxmulrmshqjhte.supabase.co";
const DB_URL = "postgresql://postgres.tcoqhpyxmulrmshqjhte:aGcGbkWILplgE9Tu@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

function removeEnv(name) {
  console.log(`Removing ${name} from Vercel environments...`);
  const envs = ['production', 'preview', 'development'];
  for (const e of envs) {
    try {
      execSync(`npx vercel env rm ${name} ${e} -y`, { stdio: 'pipe', shell: true });
    } catch (err) {
      // ignore
    }
  }
}

function addEnv(name, value) {
  console.log(`Adding ${name} to Vercel...`);
  const envs = ['production', 'preview', 'development'];
  for (const envObj of envs) {
    console.log(`  -> ${envObj}`);
    spawnSync(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', ['vercel', 'env', 'add', name, envObj], {
      input: value,
      stdio: ['pipe', 'pipe', 'inherit']
    });
  }
}

function main() {
  removeEnv('NEXT_PUBLIC_SUPABASE_URL');
  removeEnv('DATABASE_URL');

  console.log("\nVariables clear. Adding fixed values (no formatting bugs)...\n");

  addEnv('NEXT_PUBLIC_SUPABASE_URL', SUPABASE_URL);
  addEnv('DATABASE_URL', DB_URL);

  console.log("\nEnvironment variables successfully updated on Vercel!");
  console.log("Triggering a new production deployment to apply changes...");

  try {
    execSync('npx vercel --prod --yes', { stdio: 'inherit', shell: true });
    console.log("\nSuccess! Vercel is now deploying with the newly fixed variables.");
  } catch (e) {
    console.error("Failed to deploy. Please run: npx vercel --prod");
  }
}

main();
