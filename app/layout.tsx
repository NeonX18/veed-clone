"use client";
import "@mantine/core/styles.css";
import "./globals.css";

import { MantineProvider } from "@mantine/core";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
