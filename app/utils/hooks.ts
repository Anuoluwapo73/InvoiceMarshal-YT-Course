// COMMENTED OUT: Authentication check disabled
// import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireUser() {
  // Authentication bypassed - always return mock session
  const session = await auth();
  // if (!session?.user) {
  //   redirect("/login");
  // }
  return session;
}


