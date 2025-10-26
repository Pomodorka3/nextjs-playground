import {Field, FieldDescription, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";

export default function RegisterPage() {
    return <div className="max-w-md mx-auto">
        <h1 className="text-3xl text-center font-bold">Registration</h1>
        <FieldSet className="mt-4">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="text" placeholder="max.leiter@gmail.com"/>
                    <FieldDescription>
                        Choose a unique email for your account.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <FieldDescription>
                        Must be at least 8 characters long.
                    </FieldDescription>
                    <Input id="password" type="password" placeholder="********"/>
                </Field>
            </FieldGroup>
        </FieldSet>
    </div>;
}