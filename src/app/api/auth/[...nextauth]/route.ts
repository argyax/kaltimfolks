import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"; // Correct import

import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      idToken: true,

      authorization: {
        params: {
          scope: "openid profile email",
        },
      },

      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "user",
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) throw new Error("User name or password is not correct");

        if (!credentials?.password) throw new Error("Please Provide Your Password");
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) throw new Error("Username or password is not correct");

        if (!user.emailVerified) throw new Error("Please verify your email first!");

        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return {...token, ...user};
    },

    async session({ token, session }) {
      session.user.role = token.user.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export const getAuthSession = () => getServerSession(authOptions);
