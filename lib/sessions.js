import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
}

export async function createSession(userId) {
  const expiresAT = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAT});
   const cookieStore = await cookies();

   cookieStore.set("session", session, {
     httpOnly: true,
     secure: true,
     expires: expiresAT,
     sameSite: "lax",
     path: "/",
    });
}
