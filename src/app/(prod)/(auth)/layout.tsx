import React from "react";

export default function AuthLayout({children}: {
    children: React.ReactNode
}) {
    return <div className="bg-white rounded-2xl p-4 border-1">{children}</div>
}