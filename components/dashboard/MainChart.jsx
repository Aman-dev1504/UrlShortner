"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer } from "../ui/chart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserData } from "@/server_functions/getUserData";
import { motion } from "framer-motion";

const chartConfig = {
  visitors: {
    label: "clicks",
  },
  safari: {
    label: "clicks",
    color: "hsl(var(--chart-2))",
  },
};

export default function MainChart() {
  const [cclicks, setCclicks] = useState(0);
  const getAndSetClicks = async () => {
    const [allClicks] = await getUserData();
    setCclicks(allClicks);
  };
  let visitorss = cclicks > 2 ? cclicks - 1 : cclicks;
  const chartData = [
    { browser: "clicks", visitors: visitorss, fill: "#2563eb" },
  ];
  useEffect(() => {
    getAndSetClicks();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50" />

      <Card className="flex flex-col relative border shadow-lg">
        <CardHeader className="items-center pb-0 relative">
          <div className="flex items-start gap-3 w-full">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-normal">
                Lifetime Clicks
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                to view more visit{" "}
                <Link
                  href="/dashboard/statistics"
                  className="text-blue-400 hover:underline"
                >
                  Statistics
                </Link>
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={100}
              innerRadius={80}
              outerRadius={140}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="visitors" background />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {chartData[0].visitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Clicks
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Looks like you are{" "}
            {chartData[0].visitors == 0 && (
              <span className="underline underline-offset-[4px] decoration-blue-400">
                not
              </span>
            )}{" "}
            growing
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total clicks for your links
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
