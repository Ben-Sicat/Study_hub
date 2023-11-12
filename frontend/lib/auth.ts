import {NextAuthOptions, User} from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';


export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email', 
                    type: 'email', 
                    placeholder: 'email@example.com'
                },
                password: {
                    label: 'Password', 
                    type: 'password'
                },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined, req?: any) {
                if(!credentials?.email || !credentials?.password) {
                    return null
                }
                return { id: 'unique-id', email: credentials.email }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),

    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          console.debug('SignIn Callback - User:', user);
          console.debug('SignIn Callback - Account:', account);
          console.debug('SignIn Callback - Profile:', profile);
          console.debug('SignIn Callback - Email:', email);
          console.debug('SignIn Callback - Credentials:', credentials);
    
          return true; // Return true to allow sign-in
        },
    },
    
};
