import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & User;
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    username?: string;
    bio?: string;
    connectedStripeAccountId?: string;
  }
}
