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
} from "lucide-react";
import { toast } from "sonner";
import ShortUrl from "@/server_functions/shortUrl";
import getRecentLinks from "@/server_functions/getRecentLinks";
import Link from "next/link";

export default function ShortUrlFormAndRecentLinks() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortedUrl, setShortedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNeddedQr, setIsNeddedQr] = useState(false);
  const [isShorted, setIsShorted] = useState(false);
  const [recentLinks, setRecentLinks] = useState([]);
  const [loading2, setLoading2] = useState(true);

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

  useEffect(() => {
    const fetchRecentLinks = async () => {
      try {
        const data = await getRecentLinks();
        setRecentLinks(JSON.parse(data));
      } catch (err) {
        toast.error("Failed to load recent links");
      } finally {
        setLoading2(false);
      }
    };
    fetchRecentLinks();
  }, [!loading]);

  return (
    <div className="grid gap-6 max-w-4xl mx-auto w-full">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="grid gap-6 p-6 bg-card rounded-xl border shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50" />
          <div className="relative">
            <div className="flex items-start gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Link2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Shorten URL</h2>
                <p className="text-sm text-muted-foreground">
                  Transform your long URLs into concise, shareable links.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url" className="text-sm font-medium">
                  Your URL
                </Label>
                <Input
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url..."
                  id="url"
                  className="h-12 text-base transition-shadow duration-200 focus:shadow-lg"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="alias"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  Custom Alias
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
                    optional
                  </span>
                </Label>
                <Input
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="your-custom-alias"
                  id="alias"
                  maxLength={10}
                  className="h-12 text-base"
                />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Checkbox
                  id="qrcode"
                  checked={isNeddedQr}
                  onCheckedChange={setIsNeddedQr}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="qrcode"
                  className="text-sm cursor-pointer flex items-center gap-2"
                >
                  <QrCode className="h-4 w-4" />
                  Generate QR Code
                </Label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-medium relative overflow-hidden group"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span className="flex items-center gap-2">
                      Shorten URL
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-6 bg-card rounded-xl border shadow-lg"
        >
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <History className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Recent Links</h2>
              <p className="text-sm text-muted-foreground">
                Your last five shortened URLs
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            {loading2 ? (
              <div className="h-[246px] grid place-content-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : recentLinks.length === 0 ? (
              <div className="h-[246px] grid place-content-center gap-2 text-center">
                <div className="p-3 rounded-full bg-muted mx-auto">
                  <Link2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No shortened links yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {recentLinks.map((link, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={link.id}
                    className="p-4 group hover:bg-muted/50 transition-colors"
                  >
                    <Link
                      href={`https://${location.host}/${link.alias}`}
                      target="_blank"
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                        <Link2 className="h-4 w-4" />
                        {location.host}/{link.alias}
                      </span>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <AlertDialog open={isShorted} onOpenChange={setIsShorted}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              URL Shortened Successfully
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="mt-4 space-y-6">
                {isNeddedQr && (
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-lg mx-auto w-fit">
                      <img
                        className="rounded-lg"
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${shortedUrl}&size=200x200`}
                        alt="QR Code"
                        width={200}
                        height={200}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
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
                    className="text-base font-medium"
                  />
                  <Button
                    type="button"
                    variant="default"
                    size="icon"
                    className="h-12 w-12 shrink-0"
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
              className="w-full sm:w-auto"
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
