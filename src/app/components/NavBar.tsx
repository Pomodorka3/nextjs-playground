import * as React from "react"
import Link from "next/link"
import {CircleCheckIcon, CircleHelpIcon, CircleIcon} from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {useIsMobile} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {signIn, signOut, useSession} from "next-auth/react";
import {auth} from "@/auth";
import AuthenticatedHeader from "@/app/components/AuthenticatedHeader";

export async function NavBar() {

    const session = await auth()
    return (
        <div className="flex p-2 shadow-lg bg-white">
            <div className="flex-1"/>
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="flex-wrap">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/docs">Docs</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:block">
                        <NavigationMenuTrigger disabled>List</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[300px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">Components</div>
                                            <div className="text-muted-foreground">
                                                Browse all components in the library.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">Documentation</div>
                                            <div className="text-muted-foreground">
                                                Learn how to use the library.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">Blog</div>
                                            <div className="text-muted-foreground">
                                                Read our latest blog posts.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex-1 flex">
                {!session && (
                    <div className="ml-auto space-x-2 my-auto">
                        <>
                            <Button asChild variant="default">
                                <Link href="/login">
                                    Login
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/register">
                                    Register
                                </Link>
                            </Button>
                        </>
                    </div>
                )}
                {session?.user && (
                    <AuthenticatedHeader user={session.user}/>
                )}
            </div>
        </div>
    )
}