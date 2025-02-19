"use client";
import { useEffect, useState } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import {
  BarChart2Icon,
  Loader2,
  HomeIcon,
  LayoutDashboardIcon,
  LinkIcon,
  LineChartIcon,
  LogOutIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../modetoggle";
import { motion } from "framer-motion";

export default function Header() {
  const [pathName, setPathName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const defaultClass =
    "flex items-center gap-3 p-3 rounded-lg border-l-4 border-transparent hover:border-blue-500 hover:bg-accent/40 transition-all duration-300 group";
  const activeClass = "border-blue-500 bg-accent/40 shadow-lg";

  const menuItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
    { path: "/dashboard/links", label: "All Links", icon: LinkIcon },
    { path: "/dashboard/statistics", label: "Statistics", icon: LineChartIcon },
  ];

  const getPageUrl = () => {
    setPathName(window.location.pathname);
    return true;
  };

  useEffect(() => {
    getPageUrl();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-6 md:px-20 lg:px-44 py-4 backdrop-blur-lg bg-background/80 fixed top-0 left-0 right-0 z-50 border-b "
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center h-10 w-10 rounded-xl cursor-pointer bg-accent/40 hover:bg-accent/60 transition-colors duration-300"
            >
              <BarChart2Icon className="h-6 w-6 rotate-[90deg]" />
            </motion.div>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col justify-between sm:max-w-xs border-r-0"
          >
            <SheetHeader>
              {/* <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Navigation
              </SheetTitle> */}
              <SheetDescription className="mt-8">
                <div className="grid gap-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      onClick={() => {
                        setPathName(item.path);
                        setIsOpen(false);
                      }}
                      className={cn(
                        defaultClass,
                        pathName === item.path && activeClass
                      )}
                      href={item.path}
                    >
                      <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">{item.label}</span>
                      {pathName === item.path && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute right-4 h-2 w-2 rounded-full bg-blue-500"
                          transition={{ type: "spring", bounce: 0.2 }}
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetDescription className="mt-10 grid gap-7 w-full">
                <div className="flex items-center justify-between gap-3">
                  <div className="grid gap-2">
                    <div className="border rounded-xl overflow-hidden backdrop-blur-sm">
                      <ModeToggle btnClassName="border-0 rounded-none" />
                    </div>
                    <span className="text-xs text-muted-foreground text-center">
                      Theme
                    </span>
                  </div>
                  <SignOutButton redirectUrl="/">
                    <Button variant="destructive" className="gap-2">
                      <LogOutIcon className="h-4 w-4" />
                      Logout
                    </Button>
                  </SignOutButton>
                </div>
              </SheetDescription>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <ClerkLoaded>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <SignOutButton redirectUrl="/">
              <Button
                variant="outline"
                className="gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors duration-300"
              >
                <LogOutIcon className="h-4 w-4" />
                Logout
              </Button>
            </SignOutButton>
            <div className="relative group">
              <motion.div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300 blur" />
              <UserButton className="relative" />
            </div>
          </motion.div>
        </ClerkLoaded>

        <ClerkLoading>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="w-28">
              <Loader2 className="h-5 w-5 animate-spin" />
            </Button>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur" />
              <Skeleton className="h-10 w-10 rounded-full relative" />
            </div>
          </div>
        </ClerkLoading>
      </div>
    </motion.header>
  );
}
