"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
const UrlBox = () => {
    return (
        <div>
            <div className="flex gap-4">
                <Input type="text" placeholder="Enter URL" />
                <Button onClick={() => toast("Test")}>Generate</Button>

            </div>
        </div>
    )
}

export default UrlBox
