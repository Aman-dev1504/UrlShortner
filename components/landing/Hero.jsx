import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  Star,
  Rocket,
  ArrowRight,
  Link2,
  ChevronRight,
  BarChart,
} from "lucide-react";
import IfLoggedInElse from "../helpers/ifLoggedInElse";
import { RainbowButton } from "../ui/rainbow-button";

export default function Hero() {
  const words = ["powerful", "shorter", "trackable", "powerful"];

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20 px-6 md:px-20 lg:px-32">
      <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
        <div className="absolute left-1/2 top-0 ml-[-38%] h-[35rem] w-[81.25rem] dark:blur-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-20 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]" />
        </div>
        <div className="absolute right-0 top-1/2 h-[20rem] w-[20rem] rounded-full bg-gradient-to-l from-blue-500/10 to-transparent blur-3xl" />
        <div className="absolute left-0 bottom-0 h-[15rem] w-[15rem] rounded-full bg-gradient-to-r from-purple-500/10 to-transparent blur-3xl" />
      </div>

      <div className="grid gap-8 sm:text-center sm:place-items-center sm:max-w-lg md:max-w-2xl sm:mx-auto lg:max-w-[1000px] ">
        {/* Enhanced featured badge with shimmer effect */}
        <div className="cursor-pointer relative inline-flex items-center rounded-full px-4 py-1.5 text-sm leading-6 text-muted-foreground ring-1 ring-border/90 hover:ring-border/50 transition-all duration-200 group  overflow-hidden">
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <Star className="mr-2 h-4 w-4 text-yellow-500 animate-pulse" />
          Smart URL shortening for modern web{" "}
          <ChevronRight className="ml-1 h-4 w-4 text-muted-foreground/40 group-hover:translate-x-0.5 transition-transform duration-150" />
        </div>

        <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight">
          Turn long links into <span className="text-blue-500">Powerful</span>{" "}
          trails
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
          Transform your lengthy URLs into concise, memorable links. Track their
          performance with detailed analytics, and manage everything from a
          beautiful dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <IfLoggedInElse
            ifNot={
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <RainbowButton
                  href="/sign-up"
                  className="group w-full sm:w-auto"
                >
                  Get Started
                  <Rocket className="ml-2 h-4 w-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-200" />
                </RainbowButton>
                <Link
                  href="/features"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "group w-full sm:w-auto"
                  )}
                >
                  See Features
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            }
            ifUser={
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <RainbowButton
                  href="/dashboard"
                  className="group w-full sm:w-auto"
                >
                  Go to Dashboard
                  <BarChart className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                </RainbowButton>
                <Link
                  href="/new"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "group w-full sm:w-auto"
                  )}
                >
                  Create New Link
                  <Link2 className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                </Link>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
