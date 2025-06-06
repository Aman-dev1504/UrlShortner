"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Menu, X, Link2, LogOut } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/links", label: "All Links" },
    { href: "/dashboard/statistics", label: "Statistics" },
  ];

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
          <Link href="/" aria-label="Tinyrl Homepage" className="group">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-7 w-7 bg-blue-600 text-white rounded-md group-hover:scale-105 transition-transform duration-200">
                <Link2 className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                Tinyrl
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ClerkLoaded>
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "default" : "ghost"}
                  asChild
                  className={cn(
                    "rounded-md",
                    pathname === item.href
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}

              <div className="relative">
                <UserButton className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700" />
              </div>
            </div>
          </ClerkLoaded>

          <ClerkLoading>
            <div className="hidden md:flex items-center gap-2">
              <Skeleton className="h-9 w-28 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </ClerkLoading>

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
        <ClerkLoaded>
          <div className="px-4 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "default" : "ghost"}
                  asChild
                  className={cn(
                    "w-full justify-start rounded",
                    pathname === item.href
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                  )}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </Button>
              ))}

              <div className="flex items-center gap-3 w-full justify-start mt-2">
                <UserButton className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700" />
              </div>
            </nav>
          </div>
        </ClerkLoaded>
        <ClerkLoading>
          <div className="px-4 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </ClerkLoading>
      </div>
    </header>
  );
}
