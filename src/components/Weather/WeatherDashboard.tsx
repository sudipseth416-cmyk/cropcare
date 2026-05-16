'use client';

import React from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Thermometer, 
  Navigation,
  RefreshCcw,
  CloudRain
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useWeather } from '@/hooks/useWeather';
import FarmingAlerts from './FarmingAlerts';

export default function WeatherDashboard() {
  const { weather, loading, error, refresh } = useWeather();

  if (loading) {
    return (
      <div className="card h-full flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <RefreshCcw className="animate-spin text-primary" size={32} />
          <p className="text-text-muted font-bold tracking-widest uppercase text-xs">Syncing Weather Station...</p>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="card h-full flex items-center justify-center text-center p-8">
        <p className="text-danger mb-4 font-bold">{error || 'Unable to load weather data'}</p>
        <button onClick={() => refresh()} className="btn btn-ghost">Try Again</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Current Weather Main Card */}
      <div className="lg:col-span-8">
        <div className="card h-full bg-gradient-to-br from-bg-card to-primary/5 p-10 relative overflow-hidden">
          {/* Animated Background Element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12 h-full">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-text-muted mb-6">
                <Navigation size={16} className="text-primary" />
                <span className="font-bold uppercase tracking-widest text-xs">{weather.name}, {weather.sys.country}</span>
              </div>
              
              <div className="flex items-center gap-8 mb-10">
                <h2 className="text-8xl font-bold font-heading tracking-tighter">
                  {weather?.main?.temp ? Math.round(weather.main.temp) : '--'}°
                </h2>
                <div>
                  <p className="text-3xl font-bold text-text-main">{weather?.weather?.[0]?.main || 'Stable'}</p>
                  <p className="text-text-muted capitalize">{weather?.weather?.[0]?.description || 'Clear skies'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-info/10 text-info rounded-xl flex items-center justify-center">
                    <Droplets size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-dim font-bold uppercase">Humidity</p>
                    <p className="font-bold">{weather?.main?.humidity || '--'}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Wind size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-dim font-bold uppercase">Wind Speed</p>
                    <p className="font-bold">{weather?.wind?.speed || '--'} km/h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning/10 text-warning rounded-xl flex items-center justify-center">
                    <CloudRain size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-dim font-bold uppercase">Rainfall</p>
                    <p className="font-bold">{weather?.rain?.['1h'] || 0} mm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-center justify-center text-primary group">
               <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               >
                 <CloudSun size={120} strokeWidth={1} className="drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]" />
               </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Farming Alerts Sidebar */}
      <div className="lg:col-span-4">
        <div className="card h-full">
          <FarmingAlerts weather={weather} />
          
          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/5 text-xs text-text-muted italic leading-relaxed">
            "Pro Tip: High humidity detected in your region. Consider delayed evening irrigation to prevent root rot."
          </div>
        </div>
      </div>
    </div>
  );
}
