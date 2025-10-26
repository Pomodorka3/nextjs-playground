"use client"

import {Field, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";

import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Controller, useForm} from "react-hook-form";

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

    const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
        signIn('credentials', {redirect: false, password: data.password, email: data.email})
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
                                    <Input {...field} id={field.name} type="password" placeholder="********"/>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                <Button form="login-form" className="w-20 mx-auto" size="lg" type="submit">Login</Button>
                </FieldSet>
            </form>
        </div>
    );
}