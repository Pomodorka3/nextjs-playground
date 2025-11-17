"use client"

import {Field, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";
import {redirect} from "next/navigation";
import {signIn} from "next-auth/react";
import * as React from "react";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import {AuthError} from "next-auth";

const formSchema = z.object({
    email: z
        .string()
        .min(2, "Email should be longer than 2 characters"),
    password: z
        .string()
        .min(6, "Password should be longer than 8 characters"),
})

export default function LoginPage() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await signIn('credentials', {redirectTo: "/", password: data.password, email: data.email})
        } catch (error) {
            if (error instanceof AuthError)
                toast.error("Login failed", {});
            throw error
        }
    }


    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl text-center font-bold">Login</h1>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} id="login-form">
                <FieldSet className="mt-4">
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input {...field} id={field.name} type="text" placeholder="max.leiter@gmail.com"/>
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                    <Input {...field} id={field.name} type="password" placeholder="********"
                                           autoComplete="false"/>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <Button form="login-form" className="w-20 mx-auto" size="lg" type="submit">Login</Button>
                </FieldSet>
            </form>
            <div className="flex justify-center my-4">
                <Button onClick={() => signIn("google")} variant="default" className="bg-gray-500 flex">
                    <GoogleIcon padding={12}/>
                    Login (Google)
                </Button>
            </div>
        </div>
    );
}