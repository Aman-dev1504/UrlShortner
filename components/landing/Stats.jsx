"use client";

import { getData } from "@/server_functions/getData";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Users, Link2, MousePointerClick, ArrowUpRight } from "lucide-react";

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
      trend: "+12% from last month",
    },
    {
      icon: <Link2 className="w-6 h-6 text-green-500" />,
      value: links,
      label: "Links Shortened",
      trend: "+8% from last month",
    },
    {
      icon: <MousePointerClick className="w-6 h-6 text-purple-500" />,
      value: clicks,
      label: "Total Clicks",
      trend: "+15% from last month",
    },
  ];

  return (
    <section className="mb-10 py-16 px-6 md:px-20 lg:px-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-pointer">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-card hover:bg-secondary/40 transition-all duration-300 p-6 rounded-xl border border-border shadow-sm hover:shadow-md"
            >
              {/* Animated arrow icon on hover */}
              <div className="absolute top-4 right-4 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Icon with bounce animation */}
              <div className="mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Stats content */}
              <div className="space-y-2">
                {!loading ? (
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-4xl font-bold tracking-tight animate-in slide-in-from-bottom duration-500">
                      {stat.value.toLocaleString()}
                    </h3>
                    <span className="text-2xl text-muted-foreground">+</span>
                  </div>
                ) : (
                  <Skeleton className="w-24 h-10" />
                )}

                <p className="text-base font-medium text-muted-foreground">
                  {stat.label}
                </p>

                {/* Trend indicator */}
                {!loading && (
                  <p className="text-sm text-muted-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {stat.trend}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
