// "use client"

import * as React from "react";
import Image from "next/image";
import {auth} from "@/auth";

export default async function ProfilePage() {

    const session = await auth()

    return <div>
        <span className="text-2xl border-b-1 border-black">Users&#39; Profile:</span>
        <p><span className="font-bold">Username:</span> {session?.user?.name}</p>
        <p><span className="font-bold">Email:</span> {session?.user?.email}</p>
        {session?.user?.image && (
            <>
                <p><span className="font-bold">Profile Image:</span> {session?.user?.email}</p>
                <Image src={session.user?.image?.toString()} referrerPolicy="no-referrer" width={100} height={100} alt="Profile Image"/>
            </>
        )}
    </div>;
}