import { TrendingUp, Info, DollarSign, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function YieldPrediction() {
  const history = [
    { year: '2023', yield: 18.5, target: 20 },
    { year: '2024', yield: 21.2, target: 20 },
    { year: '2025', yield: 19.8, target: 22 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-bold mb-2">Yield Intelligence</h2>
          <p className="text-text-muted">Predictive crop performance and financial forecasting based on AI insights.</p>
        </div>
        <div className="bg-accent/10 border border-accent/20 px-4 py-2 rounded-xl flex items-center gap-2 text-accent">
          <TrendingUp size={18} />
          <span className="text-sm font-bold uppercase tracking-widest">Growth Phase: Vegetative</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Prediction Card */}
        <div className="col-span-12 lg:col-span-8">
          <div className="card h-full bg-gradient-to-br from-bg-card to-accent/5 border-accent/10">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-sm text-text-muted uppercase font-bold tracking-widest mb-1">Predicted Yield (Quintals/Acre)</h3>
                <div className="flex items-baseline gap-4">
                  <p className="text-6xl font-bold">24.8</p>
                  <p className="text-primary font-bold flex items-center gap-1 text-lg">
                    <TrendingUp size={20} /> +12%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted uppercase font-bold tracking-widest mb-1">Current Confidence</p>
                <p className="text-2xl font-bold text-accent">92%</p>
              </div>
            </div>

            <div className="h-48 flex items-end gap-4 mb-8">
              {history.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full relative flex items-end justify-center group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(h.yield / 25) * 100}%` }}
                      className="w-full bg-white/5 border border-border rounded-t-xl group-hover:bg-primary/20 transition-colors"
                    />
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(h.target / 25) * 100}%` }}
                      className="absolute bottom-0 w-1/2 border-l-2 border-dashed border-accent opacity-50 h-full pointer-events-none"
                    />
                  </div>
                  <span className="text-xs text-text-muted font-bold">{h.year}</span>
                </div>
              ))}
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full relative flex items-end justify-center">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(24.8 / 25) * 100}%` }}
                    className="w-full bg-accent/30 border border-accent/50 rounded-t-xl shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                  />
                  <div className="absolute top-[-30px] badge badge-warning py-0.5">2026 Prediction</div>
                </div>
                <span className="text-xs text-text-main font-bold">2026</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
              <div className="space-y-1">
                <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest">Soil Health Impact</p>
                <p className="font-bold text-primary">+2.4 qtl</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest">Weather Risk</p>
                <p className="font-bold text-danger">-0.8 qtl</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest">Pest Impact</p>
                <p className="font-bold text-warning">-1.2 qtl</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest">Est. Market Value</p>
                <p className="font-bold text-accent">₹ 42,500/Acre</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profitability & Goals */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="card bg-primary/5 border-primary/10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <DollarSign size={20} className="text-primary" /> Profit Estimation
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Expected Revenue</span>
                <span className="font-bold">₹ 85,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Estimated Costs</span>
                <span className="font-bold text-danger">-₹ 32,400</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="font-bold">Net Profit</span>
                <span className="text-2xl font-bold text-primary">₹ 52,600</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target size={20} className="text-accent" /> Productivity Goals
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-text-muted">Target Yield (25 qtl)</span>
                  <span className="text-accent">99% Achieved</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '99%' }} className="h-full bg-accent" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-text-muted">Water Efficiency</span>
                  <span className="text-primary">85% Optimization</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="col-span-12">
          <div className="card border-accent/20 bg-accent/5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/20 rounded-2xl text-accent">
                <Info size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Yield Optimization Strategy</h4>
                <p className="text-text-main leading-relaxed">
                  Your predicted yield is currently **above average** for this season. To hit your target of **25 quintals**, we recommend increasing Phosphorus application by 5% in the next week during the flowering stage. Current soil data indicates high Nitrogen levels, so avoid additional Urea until further notice.
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="btn btn-ghost border-accent/30 text-accent text-sm py-2">Download Report</button>
                  <button className="btn btn-ghost border-accent/30 text-accent text-sm py-2">Adjust Fertilizer Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
