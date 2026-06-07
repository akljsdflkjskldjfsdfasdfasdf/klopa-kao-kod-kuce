"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/smooth-scroll";

function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      theme={(resolvedTheme as "light" | "dark") ?? "light"}
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "font-sans",
          title: "font-heading",
        },
      }}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SmoothScroll>{children}</SmoothScroll>
      <ThemedToaster />
    </ThemeProvider>
  );
}
