import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACADEx — Education Operating Environment",
  description: "The Bloomberg Terminal for Education. Institutional operations, identity infrastructure, workflow management, and operational intelligence in one unified environment.",
  keywords: ["education", "ERP", "operating environment", "institutional management", "academic identity"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
