import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const options: NextAuthOptions = {
    
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        username: { label: 'username', type: 'username', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {id: '32', name: 'dave',password: '1234'} 
        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user;
        }else{
          return null;
        }
        // return { id: 'unique-id', email: credentials.username };
      },
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
