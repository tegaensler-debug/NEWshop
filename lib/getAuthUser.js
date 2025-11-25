import { cookies } from "next/headers";
import { decrypt } from "./sessions";

export default async function getAuthUser() {
  const cookiestore = await cookies();
  const session = cookiestore.get("session")?.value;

  if (session) {
    const user = await decrypt(session);
    return user;
  }
}
