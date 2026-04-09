"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "hsl(var(--card))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
          boxShadow: "var(--shadow-luxe)",
        },
        success: {
          iconTheme: {
            primary: "hsl(var(--gold-bright))",
            secondary: "hsl(var(--primary-foreground))",
          },
        },
      }}
    />
  );
}