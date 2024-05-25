import { User, UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    role: UserRole;
  }
}

declare module NodeJS {
  interface ProcessEnv {
    SMPT_EMAIL: string;
    SMTP_GMAIL_PASS: string;
  }
}
