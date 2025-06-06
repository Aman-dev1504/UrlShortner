"use client";

import { Link2 } from "lucide-react";
import { ModeToggle } from "../modetoggle";
import Link from "next/link";
import { Github, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-md text-white px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center sm:items-start gap-4"
        >
          <div className="flex items-center justify-center h-10 w-10 bg-blue-600 text-white rounded-md">
            <Link2 className="h-6 w-6" />
          </div>
          <h3 className="text-3xl font-bold text-white">Tinyrl</h3>
          <p className="text-sm text-slate-400 max-w-xs text-center sm:text-left">
            A platform built to showcase my skills and portfolio. Designed with
            love and care to reflect my expertise in web development.
          </p>
        </motion.div>

        {/* Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center sm:items-start lg:items-center"
        >
          <h4 className="text-lg font-medium text-blue-400">Quick Links</h4>
          <ul className="space-y-3 mt-4 text-sm text-slate-400">
            <li>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 hover:text-blue-400 hover:bg-slate-800 transition-colors duration-200"
                asChild
              >
                <Link href="https://github.com" target="_blank">
                  <Github className="h-5 w-5 text-blue-400" />
                  <span>GitHub Repo</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 hover:text-blue-400 hover:bg-slate-800 transition-colors duration-200"
                asChild
              >
                <Link href="https://portfolio.com" target="_blank">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span>My Portfolio</span>
                </Link>
              </Button>
            </li>
          </ul>
        </motion.div>

        {/* Mode Toggle and Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center sm:items-end"
        >
          <div className="mb-6">
            <ModeToggle />
          </div>
          <p className="text-xs text-slate-500">
            © 2024 Tinyrl. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
