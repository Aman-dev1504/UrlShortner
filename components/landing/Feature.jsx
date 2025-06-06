"use client";

import { AreaChart, Shapes, Signature, Unlink } from "lucide-react";
import { motion } from "framer-motion";

export default function Feature() {
  const cards = [
    {
      icon: <Signature className="h-5 w-5 text-blue-500" />,
      title: "Sign Up or Log In",
      description:
        "Sign up or log in to your account using Google or GitHub—no password or email required.",
    },
    {
      icon: <Unlink className="h-5 w-5 text-blue-500" />,
      title: "Shorten Your Links",
      description:
        "Shorten any link (e.g., YouTube, Instagram, Facebook, or custom URLs) with one click.",
    },
    {
      icon: <Shapes className="h-5 w-5 text-blue-500" />,
      title: "Share Your Links",
      description:
        "Share your shortened links easily with one-click social sharing or copy to clipboard.",
    },
    {
      icon: <AreaChart className="h-5 w-5 text-blue-500" />,
      title: "Get Analytics",
      description:
        "Track link clicks, browser usage (e.g., Chrome), and analyze user regions.",
    },
  ];

  return (
    <section className="py-24 lg:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white"
        >
          How to Get <span className="text-blue-500">Started</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Enjoy a seamless and completely free experience with this URL
          shortener—no subscriptions or hidden fees required!
        </motion.p>
      </div>

      <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <div className="relative h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-lg border border-slate-200/70 dark:border-slate-700/70 hover:border-blue-200/50 dark:hover:border-blue-400/30 transition-all duration-200 flex flex-col">
              <div className="mb-4 p-2 w-10 h-10 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-auto">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
