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
      className="shrink-0"
    >
      {hasCopied ? (
        <ClipboardCheck className="size-4" />
      ) : (
        <Clipboard className="size-4" />
      )}
      <span className="sr-only">{hasCopied ? "Copied" : "Copy"}</span>
    </Button>
  );
}
