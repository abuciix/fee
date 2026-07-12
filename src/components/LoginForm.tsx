"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-platinum px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-brand-tan text-sm font-bold text-brand-navy">
            A
          </div>
          <h1 className="text-lg font-semibold text-brand-navy">Andalus Studio</h1>
          <p className="text-xs text-status-neutral">Sign in to the management system</p>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-brand-navy">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="sara.haddad@andalus-arch.com"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-brand-navy">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>

          {state?.error && <p className="text-sm text-status-critical">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-status-neutral">
          Demo password for every seeded user:{" "}
          <span className="font-mono text-brand-navy">andalus2026</span>
        </p>
      </div>
    </div>
  );
}
