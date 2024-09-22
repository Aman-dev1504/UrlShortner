// components/Navbar.tsx
"use client";

import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/theme-toggler";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import logo from "../../../assets/logo.png"
export function Navbar() {
    const { isSignedIn } = useAuth(); // Access the Clerk user context

    return (
        <nav className="flex justify-between py-3 px-6 items-center  border-b shadow-md bg-white dark:bg-black">
            {/* Logo */}
            <div>
                <Link href="/">
                    {/* <Image src={logo} alt="Logo"
                        className="h-auto w-[120px]" /> */}
                    <h3 className="font-semibold text-xl text-[#4f46e5] dark:text-white">Nexlink</h3>
                </Link>
            </div>

            {/* Right Section (Sign In/Out + Theme Toggle) */}
            <div className="flex items-center space-x-4">
                {/* Sign In/Out Button based on Auth */}
                {isSignedIn ? (
                    <UserButton />
                ) : (
                    <SignInButton>
                        <Button variant="outline">Sign In</Button>
                    </SignInButton>
                )}

                {/* Mode Toggle */}
                <ModeToggle />
            </div>
        </nav>
    );
}
