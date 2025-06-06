"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  ExternalLink,
  Loader2,
  Copy,
  Link2,
  QrCode,
  History,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import ShortUrl from "@/server_functions/shortUrl";
import getRecentLinks from "@/server_functions/getRecentLinks";
import getUserData from "@/server_functions/getUserData";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer } from "../ui/chart";
import {
  Label as ChartLabel,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const chartConfig = {
  clicks: {
    label: "Clicks",
  },
};

export default function Main() {
  // State for URL shortening form
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortedUrl, setShortedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNeededQr, setIsNeededQr] = useState(false);
  const [isShorted, setIsShorted] = useState(false);

  // State for recent links
  const [recentLinks, setRecentLinks] = useState([]);
  const [loadingRecentLinks, setLoadingRecentLinks] = useState(true);

  // State for lifetime clicks chart
  const [totalClicks, setTotalClicks] = useState(0);

  // Fetch recent links
  useEffect(() => {
    const fetchRecentLinks = async () => {
      try {
        const data = await getRecentLinks();
        setRecentLinks(JSON.parse(data));
      } catch (err) {
        toast.error("Failed to load recent links");
      } finally {
        setLoadingRecentLinks(false);
      }
    };
    fetchRecentLinks();
  }, [loading]);

  // Fetch lifetime clicks
  useEffect(() => {
    const fetchUserData = async () => {
      const [allClicks] = await getUserData();
      setTotalClicks(allClicks || 0);
    };
    fetchUserData();
  }, []);

  // Handle URL shortening
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await ShortUrl({
        url,
        ...(alias && { ali: alias }),
      });
      const parsedData = JSON.parse(data);

      if (parsedData.alias) {
        setShortedUrl(`https://${location.host}/${parsedData.alias}`);
        toast.success("URL shortened successfully!");
        setIsShorted(true);
        setAlias("");
        setUrl("");
      } else if (parsedData.message) {
        toast.error(parsedData.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Chart data
  const chartData = [
    { browser: "clicks", clicks: totalClicks, fill: "#2563eb" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* URL Shortening Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 rounded-md bg-blue-500/10">
              <Link2 className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                Shorten a URL
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Create concise, shareable links in seconds.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="url"
                className="text-sm font-medium text-slate-900 dark:text-white"
              >
                Your URL
              </Label>
              <Input
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url..."
                id="url"
                className="h-12 text-base bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="alias"
                className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2"
              >
                Custom Alias
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
                  Optional
                </span>
              </Label>
              <Input
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="your-custom-alias"
                id="alias"
                maxLength={10}
                className="h-12 text-base bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 p-3 rounded-md bg-slate-100 dark:bg-slate-900">
              <Checkbox
                id="qrcode"
                checked={isNeededQr}
                onCheckedChange={setIsNeededQr}
                className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <Label
                htmlFor="qrcode"
                className="text-sm cursor-pointer flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <QrCode className="h-4 w-4" />
                Generate QR Code
              </Label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Shorten URL
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Recent Links and Lifetime Clicks */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-3 mb-6">
              <div className="p-2 rounded-md bg-blue-500/10">
                <History className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Recent Links
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your last five shortened URLs
                </p>
              </div>
            </div>

            <div className="rounded-md border border-slate-200 dark:border-slate-700">
              {loadingRecentLinks ? (
                <div className="h-[246px] grid place-content-center">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400 dark:text-slate-500" />
                </div>
              ) : recentLinks.length === 0 ? (
                <div className="h-[246px] grid place-content-center gap-2 text-center">
                  <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-900 mx-auto">
                    <Link2 className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    No shortened links yet
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {recentLinks.map((link, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={link.id}
                      className="p-4 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                    >
                      <Link
                        href={`https://${location.host}/${link.alias}`}
                        target="_blank"
                        className="flex items-center justify-between gap-4 text-sm"
                      >
                        <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                          <Link2 className="h-4 w-4" />
                          {location.host}/{link.alias}
                        </span>
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Lifetime Clicks Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-slate-700"
          >
            <Card className="flex flex-col border-0 bg-transparent">
              <CardHeader className="items-center pb-0">
                <div className="flex items-start gap-3 w-full">
                  <div className="p-2 rounded-md bg-blue-500/10">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                      Lifetime Clicks
                    </CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      View more in{" "}
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
                    endAngle={180}
                    innerRadius={80}
                    outerRadius={140}
                  >
                    <PolarGrid
                      gridType="circle"
                      radialLines={false}
                      stroke="none"
                      className="first:fill-slate-100 dark:first:fill-slate-900 last:fill-white dark:last:fill-slate-800"
                      polarRadius={[86, 74]}
                    />
                    <RadialBar dataKey="clicks" background />
                    <PolarRadiusAxis
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                    >
                      <ChartLabel
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
                                  className="fill-slate-900 dark:fill-white text-4xl font-bold"
                                >
                                  {chartData[0].clicks.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-slate-600 dark:fill-slate-400"
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
              <CardFooter className="flex-col gap-2 text-sm text-center">
                <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-white">
                  {totalClicks > 0 ? (
                    <>
                      Your links are growing
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                    </>
                  ) : (
                    <>
                      No clicks yet
                      <Link2 className="h-4 w-4 text-blue-500" />
                    </>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Total clicks across all your links
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Success Dialog */}
        <AlertDialog open={isShorted} onOpenChange={setIsShorted}>
          <AlertDialogContent className="sm:max-w-md bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                URL Shortened Successfully
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="mt-4 space-y-6">
                  {isNeededQr && (
                    <div className="space-y-3">
                      <div className="p-4 bg-white dark:bg-slate-900 rounded-lg mx-auto w-fit border border-slate-200 dark:border-slate-700">
                        <img
                          className="rounded-md"
                          src={`https://api.qrserver.com/v1/create-qr-code/?data=${shortedUrl}&size=200x200`}
                          alt="QR Code"
                          width={200}
                          height={200}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-center gap-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-900"
                        onClick={() =>
                          window.open(
                            `https://api.qrserver.com/v1/create-qr-code/?data=${shortedUrl}&size=200x200`
                          )
                        }
                      >
                        Open QR Code
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Input
                      value={shortedUrl}
                      readOnly
                      className="text-base font-medium bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <Button
                      type="button"
                      variant="default"
                      size="icon"
                      className="h-12 w-12 shrink-0 bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        navigator.clipboard.writeText(shortedUrl);
                        toast.success("Copied to clipboard!");
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setIsShorted(false)}
                className="w-full sm:w-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}
