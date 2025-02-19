import { Link2 } from "lucide-react";
import { ModeToggle } from "../modetoggle";
import Link from "next/link";
import { Github, Globe } from "lucide-react";
import { Button } from "../ui/button";
export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-20 lg:px-32 py-16 border-t border-gray-800">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Logo Section */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <div className="flex items-center justify-center h-14 w-14 bg-indigo-600 text-white rounded-full hover:scale-110 transition-transform duration-300">
            <Link2 className="h-8 w-8" />
          </div>
          <h3 className="text-4xl font-bold tracking-tight hover:text-indigo-500 transition-colors duration-300">
            Tinyrl
          </h3>
          <p className="text-sm sm:text-base text-gray-400 max-w-md text-center lg:text-left">
            A platform built to showcase my skills and portfolio. Designed with
            love and care to reflect my expertise in web development.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col items-center lg:items-center">
          <h4 className="text-lg font-medium text-indigo-500">Quick Links</h4>
          <ul className="space-y-4 mt-4 text-sm sm:text-base text-gray-400">
            <li>
              <Link href="https://github.com" target="_blank">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 hover:text-indigo-500 hover:bg-gray-800 transition-colors duration-300"
                >
                  <Github className="h-5 w-5 text-indigo-500" />
                  <span>Github Repo</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="https://portfolio.com" target="_blank">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 hover:text-indigo-500 hover:bg-gray-800 transition-colors duration-300"
                >
                  <Globe className="h-5 w-5 text-indigo-500" />
                  <span>My Portfolio</span>
                </Button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Mode Toggle and Copyright */}
        <div className="flex flex-col items-center lg:items-end">
          <div className="mb-6">
            <ModeToggle />
          </div>
          <p className="text-gray-500 text-sm mt-auto">
            © 2024 Tinytrail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
