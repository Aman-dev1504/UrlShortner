"use client";
import { Button } from "@/components/ui/button";
import { findFinalUrlAndRedirect } from "@/server_functions/findFinalUrlAndRedirect";
import { Loader2, TriangleAlert, Rocket, Link2, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const [status, setStatus] = useState("loading");
  const router = useRouter();
  const timeoutRef = useRef();

  const finalRedirect = async () => {
    try {
      setStatus("redirecting");
      const startTime = performance.now();

      const data = await findFinalUrlAndRedirect(params.id);
      const elapsed = performance.now() - startTime;

      // Ensure minimum loading time for better UX (but not longer than needed)
      const remainingDelay = Math.max(0, 500 - elapsed);

      if (data) {
        timeoutRef.current = setTimeout(() => {
          setStatus("success");
          // Brief success confirmation before redirect
          timeoutRef.current = setTimeout(() => {
            window.location.replace(JSON.parse(data));
          }, 800);
        }, remainingDelay);
      } else {
        throw new Error("No data returned");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    // Start with a brief initial animation
    timeoutRef.current = setTimeout(finalRedirect, 1200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleHomeReturn = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/30 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 p-4">
      <AnimatePresence mode="wait">
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="text-center flex flex-col items-center max-w-md"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-6"
            >
              <Link2
                className="text-primary dark:text-blue-400"
                size={64}
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-foreground dark:text-white tracking-tight bg-clip-text"
            >
              Preparing your link
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 text-muted-foreground"
            >
              Getting everything ready for a smooth redirect
            </motion.p>
            <motion.div
              className="mt-6 w-full bg-muted/20 rounded-full h-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-primary/80 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "30%" }}
                transition={{ duration: 1.2, ease: "easeIn" }}
              />
            </motion.div>
          </motion.div>
        )}

        {status === "redirecting" && (
          <motion.div
            key="redirecting"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="text-center flex flex-col items-center max-w-md"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="mb-6"
            >
              <Rocket
                className="text-primary dark:text-blue-400"
                size={64}
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-foreground dark:text-white tracking-tight"
            >
              Almost there!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 text-muted-foreground"
            >
              Redirecting you to the destination
            </motion.p>
            <motion.div
              className="mt-6 w-full bg-muted/20 rounded-full h-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "30%" }}
                animate={{ width: "80%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="text-center flex flex-col items-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mb-6 p-3 rounded-full bg-green-100 dark:bg-green-900/50"
            >
              <Check
                className="text-green-600 dark:text-green-400"
                size={64}
                strokeWidth={2}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-foreground dark:text-white tracking-tight"
            >
              Redirecting now!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-muted-foreground"
            >
              You're being securely taken to your destination
            </motion.p>
            <motion.div
              className="mt-6 w-full bg-muted/20 rounded-full h-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-green-500 rounded-full"
                initial={{ width: "80%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Card className="w-full max-w-[400px] shadow-xl border-destructive/20 dark:border-destructive/30 bg-background/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="flex justify-center mb-4"
                >
                  <TriangleAlert
                    className="text-destructive"
                    size={64}
                    strokeWidth={1.5}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CardTitle className="text-destructive text-2xl">
                    Link Not Found
                  </CardTitle>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <CardDescription className="text-muted-foreground">
                    The URL you're trying to access doesn't exist or may have
                    been removed.
                  </CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    variant="destructive"
                    size="lg"
                    className="w-full"
                    onClick={handleHomeReturn}
                  >
                    Return to Homepage
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
