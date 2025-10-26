"use client"

import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Controller, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {toast} from "sonner"
import {redirect, RedirectType} from "next/navigation";


const formSchema = z.object({
    email: z
        .string()
        .min(2, "Email should be longer than 2 characters"),
    password: z
        .string()
        .min(6, "Password should be longer than 6 characters"),
})

export default function RegisterPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
        const {status} = await axios.post("/api/v1/Users/register", data).catch(err => {
            toast.error("Something went wrong", {});
            return Promise.reject(err);
        })

        if (status == 200) {
            toast.success("Sucessfully registered! Redirecting...", {});
            await new Promise(r => setTimeout(r, 2000));
            redirect("/login")
        }
    }

    return <div className="max-w-md mx-auto">
        <h1 className="text-3xl text-center font-bold">Registration</h1>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} id="login-form">
            <FieldSet className="mt-4">
                <FieldGroup>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                <FieldDescription>
                                    Choose a unique email for your account.
                                </FieldDescription>
                                <Input {...field} id={field.name} type="text" placeholder="max.leiter@gmail.com"/>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                <FieldDescription>
                                    Must be at least 6 characters long.
                                </FieldDescription>
                                <Input {...field} id={field.name} type="password" placeholder="********" autoComplete="false"/>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <Button form="login-form" variant="secondary" className="w-20 mx-auto" size="lg"
                        type="submit">Register</Button>
            </FieldSet>
        </form>

    </div>;
}