import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { invite } from "./invite";

const display = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  variable: "--font-bevn",
});

export const metadata: Metadata = {
  title: `Thiệp mời lễ tốt nghiệp ${invite.name}`,
  description: `Trân trọng kính mời bạn đến dự lễ tốt nghiệp của ${invite.name}, ngày ${invite.dateText}.`,
};

export const viewport: Viewport = { themeColor: "#4d0711" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
