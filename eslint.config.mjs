import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated Prisma client — not hand-written, not worth linting.
    "src/generated/**",
    // Isolated agent worktrees (each has its own .next/node_modules/generated
    // client on disk) — these aren't respected via .gitignore by ESLint's
    // flat config, so they must be excluded explicitly here too.
    ".claude/worktrees/**",
  ]),
]);

export default eslintConfig;
