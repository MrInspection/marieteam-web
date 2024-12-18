"use client"

import {Button} from "@/components/ui/button";
import {Check, Share2} from "lucide-react";
import {toast} from "sonner";
import {useState} from "react";

export function ShareTripButton({id}: { id: string }) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(`${location.origin}/bookings/configure?trip=${id}`);
    toast.success("Crossing link copied to clipboard.");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="outline" onClick={copyToClipboard} disabled={copied}>
      {copied ?
        <>
          <Check className="size-4"/> Copied
        </> : <>
          <Share2 className="size-4"/> Share
        </>}
    </Button>
  )
}