// COMMENTED OUT: Magic link authentication disabled
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import NextAuth from "next-auth";
// import Nodemailer from "next-auth/providers/nodemailer";
// import prisma from "./db";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     Nodemailer({
//       server: {
//         host: process.env.EMAIL_SERVER_HOST,
//         port: process.env.EMAIL_SERVER_PORT,
//         auth: {
//           user: process.env.EMAIL_SERVER_USER,
//           pass: process.env.EMAIL_SERVER_PASSWORD,
//         },
//       },
//       from: process.env.EMAIL_FROM,
//     }),
//   ],
//   pages: {
//     verifyRequest: '/verify',
//   }
// });

// Mock auth functions to bypass authentication
export const handlers = { GET: null, POST: null };
export const auth = async () => ({ user: { id: 'mock-user-id', email: 'mock@example.com' } });
export const signIn = async () => { };
export const signOut = async () => { };
