"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Uključi svetlu temu" : "Uključi tamnu temu"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("relative", className)}
    >
      {mounted ? (
        isDark ? (
          <SunIcon className="size-[1.15rem]" />
        ) : (
          <MoonIcon className="size-[1.15rem]" />
        )
      ) : (
        <span className="size-[1.15rem]" />
      )}
    </Button>
  );
}
