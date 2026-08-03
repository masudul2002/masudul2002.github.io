import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "MD. MASUDUL HASAN | Software Engineer",
  description:
    "Software Engineer | FinTech Enthusiast. Portfolio of MD. MASUDUL HASAN — competitive programmer, campus leader, full-stack developer.",
  icons: { icon: "/favicon.ico" },
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