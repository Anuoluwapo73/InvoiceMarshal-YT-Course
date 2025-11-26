// COMMENTED OUT: NextAuth API routes disabled - authentication bypassed
// import { handlers } from "@/app/utils/auth" // Referring to the auth.ts we just created
// export const { GET, POST } = handlers

// Mock handlers to prevent errors
export const GET = async () => new Response('Auth disabled', { status: 200 });
export const POST = async () => new Response('Auth disabled', { status: 200 });