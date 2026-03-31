"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import styles from "./topbar.module.css";

type NavItem = {
  label: string;
  href: string;
};

type LandingTopbarProps = {
  items: readonly NavItem[];
  profileLabel?: string;
};

export function LandingTopbar({
  items,
  profileLabel = "Shubh",
}: LandingTopbarProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarInner}>
        <Link aria-label="Go to homepage" className={styles.brand} href="/">
          <span className={styles.brandGlyph}>
            <span />
            <span />
          </span>
        </Link>
        <NavigationMenu className={styles.topbarNav}>
          <NavigationMenuList className={styles.topbarNavList}>
            {items.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild>
                  <Link
                    className={`${styles.topbarNavLink} ${pathname === item.href ? styles.topbarNavLinkActive : ""}`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className={styles.topbarActions}>
          <span className={styles.profileName}>{profileLabel}</span>
          <Button
            asChild
            className={styles.profileAvatar}
            size="sm"
            variant="default"
          >
            <Link href="/builder">Open Builder</Link>
          </Button>
        </div>
        <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
          <SheetTrigger asChild>
            <Button
              aria-label="Open navigation"
              className={styles.topbarMenuButton}
              size="icon-sm"
              type="button"
              variant="ghost"
            >
              <span />
              <span />
              <span />
            </Button>
          </SheetTrigger>
          <SheetContent className={styles.mobileSheetContent} side="right">
            <SheetHeader className={styles.mobileSheetHeader}>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Browse the marketing pages and open the builder.
              </SheetDescription>
            </SheetHeader>
            <div className={styles.mobileNavPanel}>
              {items.map((item) => (
                <Link
                  className={`${styles.mobileNavLink} ${pathname === item.href ? styles.mobileNavLinkActive : ""}`}
                  href={item.href}
                  key={item.label}
                  onClick={() => setIsNavOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                className={styles.mobileBuilderButton}
                size="sm"
                variant="default"
              >
                <Link href="/builder" onClick={() => setIsNavOpen(false)}>
                  Open Builder
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
