"use client";

import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={handleCopy}
      className="transition-all hover:scale-105"
    >
      {hasCopied ? (
        <ClipboardCheck className="h-4 w-4 text-green-500" />
      ) : (
        <Clipboard className="h-4 w-4" />
      )}
      <span className="sr-only">{hasCopied ? "Copied" : "Copy"}</span>
    </Button>
  );
}
