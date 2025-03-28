import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

export const metadata = {
  title: "Video Editor",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          defaultColorScheme="light"
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
