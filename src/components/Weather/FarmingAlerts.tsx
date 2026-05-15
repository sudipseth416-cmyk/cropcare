'use client';

import React from 'react';
import { AlertTriangle, Info, Droplets, CloudRain } from 'lucide-react';
import { WeatherData } from '@/hooks/useWeather';

interface Alert {
  type: 'warning' | 'info' | 'danger';
  message: string;
  icon: any;
}

export default function FarmingAlerts({ weather }: { weather: WeatherData }) {
  const alerts: Alert[] = [];

  // Logic for farming alerts
  if (weather.main.humidity > 70) {
    alerts.push({
      type: 'warning',
      message: 'High humidity detected. Increased risk of fungal diseases (e.g., Blight). Monitor closely.',
      icon: Droplets
    });
  }

  if (weather.rain && weather.rain["1h"] && weather.rain["1h"] > 0) {
    alerts.push({
      type: 'danger',
      message: 'Active rainfall detected. Irrigation systems should be deactivated immediately.',
      icon: CloudRain
    });
  }

  if (weather.main.temp > 35) {
    alerts.push({
      type: 'warning',
      message: 'Extreme heat alert. Consider increasing irrigation frequency to prevent crop wilting.',
      icon: AlertTriangle
    });
  }

  if (weather.wind.speed > 5) {
    alerts.push({
      type: 'info',
      message: 'Strong winds detected. Avoid pesticide or fertilizer spraying to prevent drift.',
      icon: Info
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      type: 'info',
      message: 'Weather conditions are stable for standard farming activities.',
      icon: Info
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle size={20} className="text-warning" /> AI Farming Alerts
      </h3>
      {alerts.map((alert, i) => (
        <div 
          key={i} 
          className={`
            p-4 rounded-2xl border flex gap-4 items-start transition-all
            ${alert.type === 'warning' ? 'bg-warning/10 border-warning/20 text-warning' : ''}
            ${alert.type === 'danger' ? 'bg-danger/10 border-danger/20 text-danger' : ''}
            ${alert.type === 'info' ? 'bg-info/10 border-info/20 text-info' : ''}
          `}
        >
          <div className="mt-1"><alert.icon size={20} /></div>
          <p className="text-sm font-medium leading-relaxed">{alert.message}</p>
        </div>
      ))}
    </div>
  );
}
