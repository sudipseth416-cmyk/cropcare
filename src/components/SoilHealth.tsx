import { FlaskConical, Droplets, Thermometer, TestTube, CheckCircle2, TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const NutrientBar = ({ label, value, color, status }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-semibold text-text-muted uppercase tracking-wider">{label}</span>
      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
        status === 'Optimal' ? 'bg-primary/10 text-primary' : 
        status === 'Deficient' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
      }`}>
        {status}
      </span>
    </div>
    <div className="h-3 bg-white/5 rounded-full overflow-hidden flex">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color}`}
      />
    </div>
    <div className="flex justify-between text-[10px] text-text-dim font-bold">
      <span>0%</span>
      <span>50%</span>
      <span>100%</span>
    </div>
  </div>
);

export default function SoilHealth() {
  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-bold mb-2">Soil Intelligence</h2>
          <p className="text-text-muted">Analyze nutrient levels and moisture data for optimal crop growth.</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2">
          <FlaskConical size={18} /> New Soil Test
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Health Overview */}
        <div className="col-span-12 lg:col-span-4">
          <div className="card h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-primary" size={20} /> Overall Health
              </h3>
              <div className="flex justify-center my-8">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="88" fill="transparent" stroke="var(--border)" strokeWidth="12" />
                    <circle cx="96" cy="96" r="88" fill="transparent" stroke="var(--primary)" strokeWidth="12" strokeDasharray="552.92" strokeDashoffset="138.23" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold">75</span>
                    <span className="text-xs text-text-muted font-bold uppercase tracking-widest">Health Score</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-border">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Last Analysis</span>
                  <span className="text-xs text-text-dim">May 12, 2026</span>
                </div>
                <p className="text-xs text-text-muted italic">"Soil moisture is slightly high. Nutrient levels are stable but Nitrogen is depleting."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrient Profile */}
        <div className="col-span-12 lg:col-span-8">
          <div className="card h-full">
            <h3 className="text-xl font-bold mb-8">Nutrient Profile (NPK)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <NutrientBar label="Nitrogen (N)" value={42} color="bg-info" status="Deficient" />
              <NutrientBar label="Phosphorus (P)" value={78} color="bg-primary" status="Optimal" />
              <NutrientBar label="Potassium (K)" value={65} color="bg-accent" status="Optimal" />
              <NutrientBar label="Soil pH" value={68} color="bg-orange-500" status="Slightly Acidic" />
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-4">
                <TrendingUp className="text-primary mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-primary mb-1">Fertilizer Recommendation</h4>
                  <p className="text-sm text-text-main">
                    To reach optimal Nitrogen levels, apply **45kg/acre of Urea**. Avoid Potassium application for the next 15 days as levels are sufficient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="col-span-12 lg:col-span-4">
          <div className="card flex items-center gap-6">
            <div className="w-14 h-14 bg-info/10 text-info rounded-2xl flex items-center justify-center shrink-0">
              <Droplets size={28} />
            </div>
            <div>
              <p className="text-xs text-text-dim uppercase font-bold tracking-widest">Soil Moisture</p>
              <p className="text-2xl font-bold">64.5%</p>
              <div className="flex items-center gap-1 text-primary text-xs mt-1 font-bold">
                <TrendingUp size={12} /> +2.1% (High)
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="card flex items-center gap-6">
            <div className="w-14 h-14 bg-danger/10 text-danger rounded-2xl flex items-center justify-center shrink-0">
              <Thermometer size={28} />
            </div>
            <div>
              <p className="text-xs text-text-dim uppercase font-bold tracking-widest">Soil Temperature</p>
              <p className="text-2xl font-bold">24.2°C</p>
              <div className="flex items-center gap-1 text-info text-xs mt-1 font-bold">
                <TrendingDown size={12} /> -0.5% (Stable)
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="card flex items-center gap-6">
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center shrink-0">
              <TestTube size={28} />
            </div>
            <div>
              <p className="text-xs text-text-dim uppercase font-bold tracking-widest">Organic Carbon</p>
              <p className="text-2xl font-bold">0.85%</p>
              <div className="flex items-center gap-1 text-primary text-xs mt-1 font-bold">
                <TrendingUp size={12} /> Optimal Range
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
