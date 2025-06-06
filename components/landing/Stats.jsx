"use client";

import { getData } from "@/server_functions/getData";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Users, Link2, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";

export default function Stats() {
  const [users, setUsers] = useState(0);
  const [links, setLinks] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(true);

  const getAndSetData = async () => {
    setLoading(true);
    const [getUsers, getLinks, allClicks] = await getData();
    setUsers(getUsers);
    setLinks(getLinks);
    setClicks(allClicks);
    setLoading(false);
  };

  useEffect(() => {
    getAndSetData();
  }, []);

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      value: users,
      label: "Registered Users",
    },
    {
      icon: <Link2 className="w-6 h-6 text-blue-500" />,
      value: links,
      label: "Links Shortened",
    },
    {
      icon: <MousePointerClick className="w-6 h-6 text-blue-500" />,
      value: clicks,
      label: "Total Clicks",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl text-center sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-8"
        >
          Our <span className="text-blue-400">Impact</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {stat.icon}
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {!loading ? (
                      stat.value.toLocaleString() + "+"
                    ) : (
                      <Skeleton className="w-20 h-8" />
                    )}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
