import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const snap = await getDocs(q);

        if (snap.empty) {
          throw new Error("Account not found");
        }

        const doc = snap.docs[0];
        const userData = doc.data();

        const passwordMatch = await bcrypt.compare(
          password,
          userData.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return {
          id: doc.id,
          name: userData.name,
          email: userData.email,
          role: userData.role ?? "user",
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
