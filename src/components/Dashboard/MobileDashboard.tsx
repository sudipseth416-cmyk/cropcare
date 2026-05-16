'use client';

import React from 'react';
import { 
  Camera, 
  CloudSun, 
  AlertTriangle, 
  History, 
  MessageCircle, 
  Mic, 
  ArrowRight,
  Droplets,
  Wind,
  Thermometer
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useWeather } from '@/hooks/useWeather';

export default function MobileDashboard({ onAction }: { onAction: (tab: string) => void }) {
  const { weather, loading: weatherLoading } = useWeather();
  const RECENT_SCANS = [
    { id: '1', crop: 'Tomato', status: 'Healthy', date: 'Oct 24', color: 'text-success' },
    { id: '2', crop: 'Wheat', status: 'Infected', date: 'Oct 22', color: 'text-danger' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Weather Summary Widget */}
      <div className="grid grid-cols-1 gap-4">
        <motion.div 
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction('alerts')}
          className="card bg-gradient-to-br from-primary/20 to-bg-card border-primary/20 p-6 flex justify-between items-center group min-h-[110px]"
        >
          {weatherLoading ? (
             <div className="flex items-center gap-3 animate-pulse">
               <div className="w-8 h-8 bg-white/10 rounded-full" />
               <div className="space-y-2">
                 <div className="w-16 h-4 bg-white/10 rounded" />
                 <div className="w-24 h-3 bg-white/5 rounded" />
               </div>
             </div>
          ) : (
            <>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
                  <CloudSun size={14} /> Live Weather
                </div>
                <p className="text-3xl font-bold">{weather?.main?.temp ? Math.round(weather.main.temp) : '--'}°C</p>
                <p className="text-text-muted text-xs">
                  {weather?.weather?.[0]?.main ? `${weather.weather[0].main} • ${weather?.name || 'Local Farm'}` : 'Updating location...'}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <Droplets size={14} className="text-info mb-1" />
                    <span className="text-[10px] font-bold">{weather?.main?.humidity ?? '--'}%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Wind size={14} className="text-accent mb-1" />
                    <span className="text-[10px] font-bold">{weather?.wind?.speed ?? '--'}km/h</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <ArrowRight size={16} className="text-primary" />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* 2. Primary Scan CTA */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onAction('scan')}
        className="w-full bg-primary rounded-[32px] p-10 flex flex-col items-center justify-center gap-4 shadow-2xl shadow-primary/20 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-20 h-20 bg-black/10 rounded-full flex items-center justify-center mb-2">
          <Camera size={40} className="text-black" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-black">Scan Your Crop</h3>
          <p className="text-black/60 text-xs font-bold uppercase tracking-widest mt-1">Instant AI Diagnosis</p>
        </div>
      </motion.button>

      {/* 3. Urgent Alerts */}
      <section className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-text-dim flex items-center gap-2">
          <AlertTriangle size={16} className="text-danger" /> Urgent Alerts
        </h4>
        <div className="card bg-danger/5 border-danger/20 p-5 flex gap-4">
          <div className="w-12 h-12 bg-danger/10 rounded-2xl flex items-center justify-center shrink-0">
            <Droplets className="text-danger" />
          </div>
          <div>
            <h5 className="font-bold text-sm">Fungal Outbreak Risk</h5>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">High humidity expected today. Apply preventive fungicide to tomato crops.</p>
          </div>
        </div>
      </section>

      {/* 4. Quick Actions Row */}
      <div className="grid grid-cols-2 gap-4">
        <button className="card bg-white/5 p-6 flex flex-col items-center gap-3 active:bg-primary/10 transition-colors">
          <div className="w-12 h-12 bg-info/10 rounded-2xl flex items-center justify-center text-info">
            <MessageCircle size={24} />
          </div>
          <span className="text-xs font-bold">Ask AI Chat</span>
        </button>
        <button className="card bg-white/5 p-6 flex flex-col items-center gap-3 active:bg-primary/10 transition-colors">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Mic size={24} />
          </div>
          <span className="text-xs font-bold">Voice Guide</span>
        </button>
      </div>

      {/* 5. Recent History */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold uppercase tracking-widest text-text-dim flex items-center gap-2">
            <History size={16} /> Recent Scans
          </h4>
          <button className="text-[10px] font-bold text-primary uppercase">View All</button>
        </div>
        <div className="space-y-3">
          {RECENT_SCANS.map(scan => (
            <div key={scan.id} className="card bg-black/20 p-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full bg-current ${scan.color}`} />
                </div>
                <div>
                  <p className="text-sm font-bold">{scan.crop}</p>
                  <p className="text-[10px] text-text-dim">{scan.date}</p>
                </div>
              </div>
              <span className={`text-xs font-bold ${scan.color}`}>{scan.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
