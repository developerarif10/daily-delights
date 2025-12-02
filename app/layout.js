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
const baseUrl = "https://dailydelights.vercel.app";

export const metadata = {
  title: "Daily Delights Hub 🍕 | Hot Delivery to Your Hall",
  description:
    "Hungry? Order hot, cheesy pizza delivered directly to Daily Delights Halls in 20 mins. Order via WhatsApp!",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Daily Delights Hub 🍕 | Hot Delivery to Your Hall",
    description:
      "Order hot pizza directly to your Hall gate. 20 min delivery. Click to order!",
    url: baseUrl,
    siteName: "Daily Delights Hub",
    images: [
      {
        url: `${baseUrl}/images/daily-delights-hub-og-image.png`, // Must be in your public folder
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
    images: [`${baseUrl}/images/daily-delights-hub-og-image.png`], // Must be in public folder
  },
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Decorative background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#fff7f3] via-white to-white">
          <div className="absolute -top-48 -left-20 w-[520px] h-[520px] bg-orange-500 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-56 -right-24 w-[600px] h-[600px] bg-green-200 opacity-6 rounded-full blur-3xl"></div>
        </div>

        <div className="min-h-screen flex flex-col items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
