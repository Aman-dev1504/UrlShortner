import { Link2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import IfLoggedInElse from "../helpers/ifLoggedInElse";
import { SignOutButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center border-b justify-between px-5 py-3 md:px-10 lg:px-16 shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-3 group cursor-grab">
        <div className="flex items-center justify-center h-8 w-8 bg-blue-600 text-white rounded-full group-hover:scale-110 transition-transform duration-300">
          <Link2 className="h-5 w-5" />
        </div>
        <span className="text-xl font-semibold group-hover:text-indigo-600 transition-colors duration-300">
          Tinyrl
        </span>
      </div>

      {/* Navigation / Buttons */}
      <div className="flex items-center gap-4">
        <IfLoggedInElse
          ifNot={
            <Link
              className={`${buttonVariants({
                variant: "outline",
                size: "sm",
              })} hover:shadow-lg transition-all duration-300`}
              href="/sign-in"
            >
              Login
            </Link>
          }
          ifUser={
            <SignOutButton redirectUrl="/">
              <Button
                variant="outline"
                size="sm"
                className="hover:shadow-lg transition-all duration-300"
              >
                Logout
              </Button>
            </SignOutButton>
          }
        />
        <IfLoggedInElse
          ifNot={
            <Link
              className={`${buttonVariants({
                variant: "default",
                size: "sm",
              })} hover:shadow-lg transition-all duration-300`}
              href="/sign-up"
            >
              Get Started
            </Link>
          }
          ifUser={
            <Link
              className={`${buttonVariants({
                variant: "default",
                size: "sm",
              })} hover:shadow-lg transition-all duration-300`}
              href="/dashboard"
            >
              Dashboard
            </Link>
          }
        />
      </div>
    </header>
  );
}
