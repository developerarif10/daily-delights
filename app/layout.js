import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*
  Root layout for the Next.js app router.
  This is a server component (default). It loads global CSS and provides the HTML shell.
*/

// REPLACE 'https://your-pizza-site.vercel.app' WITH YOUR ACTUAL DOMAIN
const baseUrl = "https://your-pizza-site.vercel.app";

export const metadata = {
  title: "Daily Delights Hub 🍕 | Hot Delivery to Your Hall",
  description:
    "Hungry? Order hot, cheesy pizza delivered directly to Shah Amanat, Shamsun Nahar, or any CU Hall gate in 20 mins. Order via WhatsApp!",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Daily Delights Hub 🍕 | Hot Delivery to Your Hall",
    description:
      "Order hot pizza directly to your Hall gate. 20 min delivery. Click to order!",
    url: baseUrl,
    siteName: "Daily Delights Hub",
    images: [
      {
        url: "/images/daily-delights-hub-og-image.png", // Must be in your public folder
        width: 1200,
        height: 630,
        alt: "Daily Delights Hub - Hot Delivery to Your Hall",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Delights Hub 🍕",
    description: "Hot pizza delivered to Daily Delights Halls in 20 mins.",
    images: ["/images/daily-delights-hub-og-image.jpg"], // Must be in public folder
  },
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
