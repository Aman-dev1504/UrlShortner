"use client";
import { getUserData } from "@/server_functions/getUserData";
import { ExternalLink, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LinkDashboard() {
  const [totalLinks, setTotalLinks] = useState([]);
  const [top5Links, setTop5Links] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [loading, setLoading] = useState(true);

  const getAllData = async () => {
    try {
      const [allClicks, topLinks, allLinks] = await getUserData();
      setTotalLinks(JSON.parse(allLinks));
      setTop5Links(JSON.parse(topLinks));
      setTotalClicks(allClicks > 2 ? allClicks - 1 : 0);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const LinkItem = ({ link, host }) => (
    <div className="flex items-center justify-between p-3 hover:bg-accent/20 transition-colors rounded-lg ">
      <Link
        target="_blank"
        href={`https://${host}/${link.alias}`}
        className="flex-grow overflow-hidden"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm truncate max-w-[200px]">
            https://{host}/{link.alias}
          </span>
          <ExternalLink className="h-3 w-3 text-muted-foreground" />
        </div>
      </Link>
      <Badge variant="secondary" className="flex items-center gap-1">
        <CountUp
          end={link.clicks > 2 ? link.clicks - 1 : link.clicks}
          start={0}
        />
        <Eye className="h-3 w-3" />
      </Badge>
    </div>
  );

  const StatCard = ({ value, label }) => (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 text-center">
        <div className="text-3xl font-bold mb-2">
          <CountUp end={value} start={0} />
        </div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <p className="text-muted-foreground">No links found</p>
      <p className="text-xs text-muted-foreground mt-2">
        Create your first short link to get started
      </p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 mt-20">
      <div className="grid md:grid-cols-2 gap-6">
        <StatCard value={totalLinks.length} label="Links Created" />
        <StatCard value={totalClicks} label="Lifetime Clicks" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Links</CardTitle>
            <CardDescription>Links with the most clicks</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center h-60">
                <Loader2 className="animate-spin text-muted-foreground" />
              </div>
            ) : top5Links.filter((link) => link.clicks).length > 0 ? (
              <div className="divide-y">
                {top5Links
                  .filter((link) => link.clicks)
                  .map((link, index) => (
                    <LinkItem key={index} link={link} host={location.host} />
                  ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Links</CardTitle>
            <CardDescription>Overview of all your links</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center h-60">
                <Loader2 className="animate-spin text-muted-foreground" />
              </div>
            ) : totalLinks.length > 0 ? (
              <div className="divide-y">
                {totalLinks.map((link, index) => (
                  <LinkItem key={index} link={link} host={location.host} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
