
import { Toaster } from "@/components/ui/sonner"

import UrlBox from "@/components/ui/UrlBox";
export default function Home() {
  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
      <Toaster richColors position="top-center" />

      <UrlBox />

    </div>
  );
}
