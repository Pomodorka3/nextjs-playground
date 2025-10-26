import NextAuth, {CredentialsSignin} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

async function login(credentials: any) {
    try {
        console.log(credentials);
        return await axios.post("http://localhost:5000/api/v1/Users/login", credentials).then((res: any) => {
            // const {user} = res;
            console.log(res);
            return {
                // name: user.name,
                email: "",
                // image: user.profile_photo,
                accessToken: res.accessToken,
                expiresIn: res.expiresIn,
                refreshToken: res.refreshToken,
                // If you need any other information you can add here...
            };
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
                    return login(credentials);
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
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({session, token}: any) {
            session.user = token.user;
            return session;
            // return null;
        },
    },
    debug: true,
};

export const {handlers, auth, signIn, signOut} = NextAuth(config);