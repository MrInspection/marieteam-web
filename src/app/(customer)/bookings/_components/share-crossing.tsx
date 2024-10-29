"use client"

import {Button} from "@/components/ui/button";
import {Share2} from "lucide-react";
import {toast} from "sonner";

export function ShareTripButton({id}: {id: string}) {
    async function copyToClipboard() {
        await navigator.clipboard.writeText(`${location.origin}/bookings/configure?trip=${id}`);
        toast.success("Crossing configuration link copied to clipboard");
    }

    return (
        <Button variant="outline" onClick={copyToClipboard}>
            <Share2 className="size-4" /> Share
        </Button>
    )
}