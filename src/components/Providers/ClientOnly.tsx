'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const VoiceAssistant = dynamic(() => import("@/components/VoiceAssistant/VoiceAssistant"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/Chat/ChatBot"), { ssr: false });
const OfflineSync = dynamic(() => import("@/components/Offline/OfflineSync"), { ssr: false });
const InstallPrompt = dynamic(() => import("@/components/PWA/InstallPrompt"), { ssr: false });

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <VoiceAssistant />
      <ChatBot />
      <OfflineSync />
      <InstallPrompt />
    </>
  );
}
