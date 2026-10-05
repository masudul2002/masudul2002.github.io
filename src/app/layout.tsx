import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Cursor from "@/components/Cursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#00f2ff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.masudulhasan.me"),
  title: {
    default: "MD. MASUDUL HASAN | Software Engineer",
    template: "%s | MD. MASUDUL HASAN",
  },
  description:
    "Software Engineer | FinTech Enthusiast. Portfolio of MD. MASUDUL HASAN — competitive programmer, campus leader, full-stack developer.",
  keywords: [
    "MD. Masudul Hasan",
    "Masudul Hasan",
    "Software Engineer",
    "FinTech",
    "Competitive Programmer",
    "Full-Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "MD. MASUDUL HASAN", url: "https://www.masudulhasan.me" }],
  creator: "MD. MASUDUL HASAN",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "MD. MASUDUL HASAN | Software Engineer",
    description:
      "Software Engineer | FinTech Enthusiast. Portfolio of MD. MASUDUL HASAN — competitive programmer, campus leader, full-stack developer.",
    url: "https://www.masudulhasan.me",
    siteName: "MD. MASUDUL HASAN Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MD. MASUDUL HASAN Logo & Branding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD. MASUDUL HASAN | Software Engineer",
    description:
      "Software Engineer | FinTech Enthusiast. Portfolio of MD. MASUDUL HASAN",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-bg text-text antialiased overflow-x-hidden selection:bg-primary selection:text-black">
        <Cursor />
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </body>
    </html>
  );
}