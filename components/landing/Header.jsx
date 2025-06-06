"use client";

import { Link2, Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Header() {
  const { isSignedIn, isLoaded } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" aria-label="Tinyrl homepage" className="group">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-7 w-7 bg-blue-600 text-white rounded-md group-hover:scale-105 transition-transform duration-200">
                <Link2 className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                Tinyrl
              </span>
            </div>
          </Link>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoaded ? (
              <div className="flex items-center gap-3">
                <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="w-24 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            ) : isSignedIn ? (
              <>
                <Button variant="default" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <SignOutButton redirectUrl="/">
                  <Button variant="ghost">Logout</Button>
                </SignOutButton>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link href="/sign-up" className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            ) : (
              <Menu className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
          <nav className="flex flex-col gap-3">
            {!isLoaded ? (
              <div className="flex flex-col gap-3">
                <div className="w-full h-9 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="w-full h-9 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            ) : isSignedIn ? (
              <>
                <Button
                  variant="default"
                  asChild
                  className="w-full justify-start"
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </Button>
                <SignOutButton redirectUrl="/">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start"
                >
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </Button>
                <Button
                  variant="default"
                  asChild
                  className="w-full justify-start"
                >
                  <Link
                    href="/sign-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-1"
                  >
                    <Sparkles className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
