import type { Metadata } from "next";
import { Epilogue, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-epilogue-var",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans-var",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-caveat-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madni Education Trust — One Trust. Four Schools. A Thousand Futures.",
  description:
    "Madni Education Trust runs 4 schools providing quality education to underprivileged children through zakat, sadaqah, and subsidy funding across Gujarat since 2012.",
  keywords: [
    "Madni Education Trust",
    "zakat",
    "education",
    "Gujarat",
    "charity",
    "school",
    "sadaqah",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${dmSans.variable} ${caveat.variable}`}
    >
      <body
        style={{ fontFamily: "var(--font-dm-sans-var), 'DM Sans', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
