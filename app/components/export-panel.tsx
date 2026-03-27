"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { ExportCodeCard } from "./export-code-card";
import { BuilderSection } from "./panel-controls";

type ExportPanelProps = {
  copiedState: string;
  onCopy: (label: string, value: string) => void;
  generatedFramerCode: string;
  generatedAppsScript: string;
  generatedSetup: string;
};

export function BuilderExportPanel({
  copiedState,
  onCopy,
  generatedFramerCode,
  generatedAppsScript,
  generatedSetup,
}: ExportPanelProps) {
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  return (
    <>
      <BuilderSection
        title="Export Output"
        description="Copy the exact artifacts a Framer user needs to ship."
        action={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsIntroOpen(true)}
          >
            Intro
          </Button>
        }
      >
        <div className="builder-code-grid">
          <ExportCodeCard
            title="Framer Component.jsx"
            description="Live generated"
            copyKey="framer"
            copiedState={copiedState}
            onCopy={onCopy}
            value={generatedFramerCode}
          />
          <ExportCodeCard
            title="GoogleScript.gs"
            description="Conditional export"
            copyKey="script"
            copiedState={copiedState}
            onCopy={onCopy}
            value={generatedAppsScript}
          />
        </div>
      </BuilderSection>

      <Sheet open={isIntroOpen} onOpenChange={setIsIntroOpen}>
        <SheetContent side="right" className="builder-export-intro-sheet">
          <SheetTitle>Intro</SheetTitle>
          <SheetDescription>
            Quick setup notes for using the exported Framer component and Google Apps Script.
          </SheetDescription>
          <ScrollArea className="builder-export-intro-scroll">
            <pre className="builder-export-intro-copy">{generatedSetup}</pre>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
