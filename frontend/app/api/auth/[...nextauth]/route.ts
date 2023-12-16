import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

interface Credential {
        login: string;
        password: string;
}

export default NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: 'Login', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials: Record<"username" | "password", string> | undefined, req: any) => {
                try {
                    const response = await fetch('http://localhost:5000/api/sign-in', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            login: credentials?.username,
                            password: credentials?.password,
                        }),
                    });

                    if (response.ok) {
                        const user = await response.json();
                        return user; // No need for Promise.resolve here
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Error during authentication:', error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
});
