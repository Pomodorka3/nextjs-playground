import NextAuth, {CredentialsSignin} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

async function login(credentials: any) {
    try {
        console.log(credentials);
        return await axios.post("http://localhost:5000/api/Users/login", credentials).then((res: any) => {
            const {user} = res;
            return {
                name: user.name,
                email: user.email,
                image: user.profile_photo,
                accessToken: res.access_token,
                // If you need any other information you can add here...
            };
        });
    } catch (e) {
        // throw new Error("Something went wrong.");
    }
}

export const config = {
    pages: {signIn: "/login"},
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "example@email.com"},
                password: {label: "Password", type: "password", placeholder: "******"}
            },
            async authorize(credentials,) {
                try {
                    return login(credentials);
                } catch (e) {
                    throw new CredentialsSignin("asd");
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
        },
    },
    debug: true,
};

export const {handlers, auth, signIn, signOut} = NextAuth(config);