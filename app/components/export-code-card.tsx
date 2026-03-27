"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type ExportCodeCardProps = {
  title: string;
  description: string;
  copyKey: string;
  copiedState: string;
  onCopy: (label: string, value: string) => void;
  value: string;
};

export function ExportCodeCard({
  title,
  description,
  copyKey,
  copiedState,
  onCopy,
  value,
}: ExportCodeCardProps) {
  const isCopied = copiedState === copyKey;
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const updateHeight = () => {
      setHeaderHeight(node.getBoundingClientRect().height);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
      <div
        ref={headerRef}
        className="absolute inset-x-0 top-0 z-10 grid auto-rows-min grid-cols-[1fr_auto] items-start gap-x-3 gap-y-1 bg-linear-to-b from-white from-0% via-white/88 via-42% via-white/48 via-74% to-transparent to-100% px-4 py-4"
      >
        <div className="min-w-0">
          <h3 className="font-heading text-base leading-snug font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => onCopy(copyKey, value)}
          aria-label={`Copy ${title}`}
          title={isCopied ? "Copied" : "Copy code"}
          className="self-start justify-self-end"
        >
          {isCopied ? "✓" : "⧉"}
        </Button>
      </div>

      <ScrollArea className="h-full min-h-0 [&_[data-slot=scroll-area-viewport]>div]:!block [&_[data-slot=scroll-area-viewport]>div]:min-w-0 [&_[data-slot=scroll-area-viewport]>div]:w-full">
        <div
          className="min-w-0 max-w-full px-4 pb-4"
          style={{
            paddingTop: headerHeight + 16,
          }}
        >
          <pre className="min-w-0 max-w-full pr-4 font-mono text-xs leading-[1.5] whitespace-pre-wrap [overflow-wrap:anywhere] break-words">
            {value}
          </pre>
        </div>
      </ScrollArea>
    </div>
  );
}
