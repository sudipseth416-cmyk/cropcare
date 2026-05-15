import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import VoiceAssistant from "@/components/VoiceAssistant/VoiceAssistant";
import ChatBot from "@/components/Chat/ChatBot";
import OfflineSync from "@/components/Offline/OfflineSync";
import InstallPrompt from "@/components/PWA/InstallPrompt";

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
