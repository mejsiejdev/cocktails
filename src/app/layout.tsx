import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cocktails",
  description: "Created by Maciej Malinowski",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-black dark:bg-neutral-900 dark:text-white flex flex-col items-center justify-start antialiased">
        <div className="container w-full">{children}</div>
      </body>
    </html>
  );
}
