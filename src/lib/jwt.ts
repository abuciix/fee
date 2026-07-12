// JWT encrypt/decrypt only — no `next/headers` import here, so this module
// stays safe to use from src/proxy.ts as well as from server components.
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is not set.");
}
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = JWTPayload & { userId: string };

export async function encrypt(payload: { userId: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, { algorithms: ["HS256"] });
    return payload as SessionPayload;
  } catch {
    return undefined;
  }
}
