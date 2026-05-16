import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';

const VoiceAssistant = dynamic(() => import("@/components/VoiceAssistant/VoiceAssistant"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/Chat/ChatBot"), { ssr: false });
const OfflineSync = dynamic(() => import("@/components/Offline/OfflineSync"), { ssr: false });
const InstallPrompt = dynamic(() => import("@/components/PWA/InstallPrompt"), { ssr: false });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CropCare AI | Precision Agriculture",
  description: "AI-powered crop disease detection and smart farming platform.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
        <VoiceAssistant />
        <ChatBot />
        <OfflineSync />
        <InstallPrompt />
      </body>
    </html>
  );
}
