import { MantineProvider } from '@mantine/core';

export const metadata = {
  title: 'Veed Clone',
  description: 'A VEED.io clone editor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
