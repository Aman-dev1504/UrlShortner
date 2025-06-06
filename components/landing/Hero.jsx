"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Star,
  Rocket,
  ArrowRight,
  Link2,
  BarChart,
  Sparkles,
  Zap,
} from "lucide-react";
import IfLoggedInElse from "../helpers/ifLoggedInElse";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-blue-50/20 dark:from-slate-950 dark:to-blue-950/30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center mb-6"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Smart URL Management</span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Transform Long Links <br className="sm:hidden" />
            Into <span className="text-blue-600 dark:text-blue-400">Magic</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Create trackable short links with powerful analytics.{" "}
            <span className="font-medium">Built for the modern web.</span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <IfLoggedInElse
            ifNot={
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link href="/sign-up" className="flex items-center gap-2">
                    Start Creating
                    <Rocket className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link href="/features" className="flex items-center gap-2">
                    Explore Features
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            }
            ifUser={
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Dashboard
                    <BarChart className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link href="/new" className="flex items-center gap-2">
                    Create Link
                    <Link2 className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            }
          />
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart className="w-4 h-4 text-purple-500" />
              <span>Advanced Analytics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-indigo-500" />
              <span>Premium Features</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
