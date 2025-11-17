"use client";

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {signOut} from "next-auth/react";
import * as React from "react";
import {User} from "next-auth";
import Image from "next/image";

export default function AuthenticatedHeader({user} : {user: User}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="ml-auto flex space-x-2 items-center px-2">
                <div className="cursor-pointer">
                    <Avatar>
                        <Image src={user?.image?.toString()} referrerPolicy="no-referrer" width={32} height={32} alt="Profile Image"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button variant="link"
                            className={navigationMenuTriggerStyle()}>{user?.name}</Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={async () => {
                    await signOut()
                }}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}