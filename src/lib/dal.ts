import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "./jwt";
import { prisma } from "./db";

// Redirects to /login if there's no valid session. Use in Server Actions
// and pages that require a hard guarantee of an authenticated user.
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    redirect("/login");
  }
  return { isAuth: true, userId: session.userId };
});

// Non-redirecting variant for optional/UI-only use (e.g. rendering the
// signed-in user's name in the app shell).
export const getCurrentUser = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, title: true, systemRole: true },
  });
});
