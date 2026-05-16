'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, CloudSun, User, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { triggerHaptic } from '@/lib/native/bridge';

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { login } = useUser();
  const [step, setStep] = useState(0);
  const [isSplash, setIsSplash] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const STEPS = [
    {
      title: "AI Crop Scanning",
      desc: "Instantly detect 30+ crop diseases with 95% accuracy using your phone's camera.",
      icon: <Zap className="text-primary" size={48} />,
      color: "bg-primary/20"
    },
    {
      title: "Weather Intelligence",
      desc: "Get localized weather alerts and AI-driven farming advice tailored to your land.",
      icon: <CloudSun className="text-info" size={48} />,
      color: "bg-info/20"
    },
    {
      title: "Expert Network",
      desc: "Connect with verified agricultural specialists and fellow farmers in your region.",
      icon: <ShieldCheck className="text-accent" size={48} />,
      color: "bg-accent/20"
    },
    {
      title: "Farmer Profile",
      desc: "Tell us about your farm to get personalized crop alerts and weather updates.",
      icon: <User className="text-primary" size={48} />,
      color: "bg-primary/20"
    }
  ];

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      triggerHaptic();
    } else {
      if (!formData.name || !formData.location) return;
      login(formData);
      triggerHaptic();
      onComplete();
    }
  };

  if (isSplash) {
    return (
      <motion.div 
        className="fixed inset-0 z-[1000] bg-bg-dark flex flex-col items-center justify-center p-8"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-24 h-24 bg-primary rounded-[32px] flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            <div className="w-8 h-8 bg-black rounded-full" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold font-heading tracking-tight">CropCare <span className="text-primary">AI</span></h1>
            <p className="text-text-muted mt-2 font-bold uppercase tracking-[0.3em] text-xs">Smart Farming • Secure Future</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="h-1 bg-primary/20 mt-12 rounded-full overflow-hidden"
        >
          <motion.div 
            animate={{ x: [-200, 200] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1/2 h-full bg-primary shadow-[0_0_15px_#10b981]"
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 z-[900] bg-bg-dark flex flex-col p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 flex flex-col items-center w-full max-w-sm"
          >
            <div className={`w-24 h-24 rounded-[32px] ${STEPS[step].color} flex items-center justify-center shadow-2xl shrink-0`}>
              {STEPS[step].icon}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-heading">{STEPS[step].title}</h2>
              <p className="text-text-muted text-sm leading-relaxed">{STEPS[step].desc}</p>
            </div>

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-4"
              >
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/50 outline-none text-sm"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                  <input
                    type="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/50 outline-none text-sm"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                  <input
                    type="text"
                    placeholder="Farm Location (e.g. Ludhiana)"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/50 outline-none text-sm"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-12">
          {STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-primary' : 'w-2 bg-white/10'}`} 
            />
          ))}
        </div>
      </div>

      <div className="pb-12 pt-4">
        <button 
          onClick={handleNext}
          disabled={step === 3 && (!formData.name || !formData.location)}
          className="w-full btn btn-primary py-5 flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/20 disabled:opacity-50 transition-all"
        >
          {step < STEPS.length - 1 ? 'Continue' : 'Start Farming'} <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}
