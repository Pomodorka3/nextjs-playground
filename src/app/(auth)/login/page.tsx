import {Field, FieldDescription, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";

export default function LoginPage() {

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl text-center font-bold">Login</h1>
            <FieldSet className="mt-4">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="text" placeholder="max.leiter@gmail.com"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" type="password" placeholder="********"/>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>
    );
}