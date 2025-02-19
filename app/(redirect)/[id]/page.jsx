"use client";
import { Button } from "@/components/ui/button";
import { findFinalUrlAndRedirect } from "@/server_functions/findFinalUrlAndRedirect";
import { Loader2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page({ params }) {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  const finalRedirect = async () => {
    setLoading(true);
    try {
      const data = await findFinalUrlAndRedirect(params.id);
      if (data) {
        window.location.replace(JSON.parse(data));
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      finalRedirect();
    }, 5000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/30 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="text-center flex flex-col items-center"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              <Loader2
                className="animate-spin mb-4 text-primary dark:text-white"
                size={60}
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-semibold text-foreground dark:text-white tracking-wide"
            >
              Redirecting via TinyTrail...
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-2 text-muted-foreground"
            >
              Please wait while we process your link
            </motion.p>
          </motion.div>
        ) : isError ? (
          <Card className="w-[400px] shadow-2xl border-destructive/20 dark:border-destructive/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <TriangleAlert
                  className="text-destructive"
                  size={64}
                  strokeWidth={1.5}
                />
              </div>
              <CardTitle className="text-destructive text-2xl">
                Link Not Found
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                The URL you are trying to access does not exist or has been
                deleted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/" className="block">
                <Button variant="destructive" size="lg" className="w-full">
                  Return to Homepage
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
