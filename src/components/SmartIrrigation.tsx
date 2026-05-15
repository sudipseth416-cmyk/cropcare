import React from 'react';
import { Droplets, Calendar, Clock, AlertTriangle, TrendingDown, CheckCircle2, Waves } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SmartIrrigation() {
  const schedule = [
    { time: '06:00 AM', duration: '45 mins', status: 'Completed', date: 'Today' },
    { time: '06:00 PM', duration: '30 mins', status: 'Pending', date: 'Today' },
    { time: '06:00 AM', duration: '45 mins', status: 'Scheduled', date: 'Tomorrow' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-bold mb-2">Smart Irrigation</h2>
          <p className="text-text-muted">Moisture-aware water management to conserve resources and improve yield.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost border-primary/20 text-primary">Override Auto</button>
          <button className="btn btn-primary">Water Now</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Status Header */}
        <div className="col-span-12 lg:col-span-8">
          <div className="card bg-gradient-to-br from-bg-card to-info/5 border-info/10 p-8">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="var(--border)" strokeWidth="10" />
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="#3b82f6" strokeWidth="10" strokeDasharray="439.8" strokeDashoffset="175.9" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-info">60%</span>
                  <span className="text-[10px] text-text-dim font-bold uppercase tracking-widest">Moisture</span>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <span className="badge bg-info/10 text-info mb-2">Status: Optimal</span>
                  <h3 className="text-2xl font-bold">Next cycle in 4 hours</h3>
                  <p className="text-text-muted mt-1 text-sm">Based on soil data and 20% rain probability tomorrow.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-border">
                    <p className="text-xs text-text-dim uppercase font-bold mb-1">Weekly Saving</p>
                    <p className="text-xl font-bold text-primary">1,200 Liters</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-border">
                    <p className="text-xs text-text-dim uppercase font-bold mb-1">System Health</p>
                    <p className="text-xl font-bold">98% Efficient</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Sidebar */}
        <div className="col-span-12 lg:col-span-4">
          <div className="card h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-info" /> Irrigation Log
            </h3>
            <div className="space-y-4">
              {schedule.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${item.status === 'Completed' ? 'bg-primary/10 text-primary' : 'bg-info/10 text-info'}`}>
                      {item.status === 'Completed' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.time}</p>
                      <p className="text-[10px] text-text-dim font-bold uppercase">{item.duration} · {item.date}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'Completed' ? 'bg-primary/10 text-primary' : 
                    item.status === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-white/5 text-text-muted'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations & Logic */}
        <div className="col-span-12">
          <div className="card border-primary/20 bg-primary/5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-2xl text-primary">
                <Waves size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2">Smart Water Recommendation</h4>
                <p className="text-text-main leading-relaxed">
                  Our sensors detect a **2% drop** in moisture over the last 12 hours. However, since the **Humidity is high (65%)** and **Rain is predicted for tomorrow evening**, the system has automatically **delayed the evening cycle** to prevent waterlogging and root rot.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-text-muted">
                    <AlertTriangle size={16} className="text-warning" /> High Fungal Risk if over-watered
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-text-muted">
                    <Droplets size={16} className="text-info" /> Evaporation rate: Low
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
