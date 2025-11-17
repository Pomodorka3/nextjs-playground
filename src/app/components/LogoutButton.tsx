"use client"

import {signOut} from "next-auth/react";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import * as React from "react";

export default function LogoutButton() {
    return <Button variant="destructive" onClick={() => signOut(redirect("/", ))}>
        Logout
    </Button>
}