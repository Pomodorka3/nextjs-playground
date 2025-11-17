import NextAuth, {DefaultSession, User} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            address: string
            accessToken: string;
            expiresIn: string;
            refreshToken: string;
        } & DefaultSession["user"]
    }
}

async function login(credentials: any) {
    try {
        return await axios.post("http://localhost:5000/api/v1/Users/login", credentials)
            .then((res: any) => {
            const user = {
                // name: user.name,
                email: "email",
                // image: user.profile_photo,
                accessToken: res.data.accessToken,
                expiresIn: res.data.expiresIn,
                refreshToken: res.data.refreshToken,
                // If you need any other information you can add here...
            };
            console.log("login",user)
            return user;
        });
    } catch (e) {
        // throw new Error("Something went wrong.");
        return null;
    }
}

export const config = {
    pages: {signIn: "/login"},
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const loginResult = await login(credentials);
                    return loginResult;
                } catch (e) {
                    // throw new CredentialsSignin("asd");
                    throw new Error("Invalid credentials.")
                    // return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({user, token}) {
            return token;
        },
        async session({session, token, user}: any) {
            return session;
        },
        authorized: async ({ auth, user }: {auth: any, user: User}) => {
            // Logged in users are authenticated, otherwise redirect to login page
            console.log(auth, auth.user.accessToken !== undefined)
            return auth.user.accessToken !== undefined;
            // return auth.user.email !== undefined;
        },
    },
    debug: true,
};

export const {handlers, auth, signIn, signOut} = NextAuth(config);