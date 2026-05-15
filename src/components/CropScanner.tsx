import { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle2, AlertCircle, X, Search, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScanResult {
  type: 'Disease' | 'Pest';
  disease: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High' | 'Emergency';
  recommendation: string;
  rescueActions?: string[];
}

export default function CropScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState<'Disease' | 'Pest'>('Disease');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        startScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setError(null);
    setResult(null);

    // Simulate AI Processing
    setTimeout(() => {
      setIsScanning(false);
      if (scanMode === 'Disease') {
        setResult({
          type: 'Disease',
          disease: "Tomato Early Blight",
          confidence: 94.8,
          severity: "Emergency",
          recommendation: "Apply Mancozeb spray immediately. This infection is spreading rapidly due to high humidity.",
          rescueActions: [
            "Prune all infected leaves immediately",
            "Apply Fungicide within 6 hours",
            "Isolate this section of the field"
          ]
        });
      } else {
        setResult({
          type: 'Pest',
          disease: "Fall Armyworm",
          confidence: 89.2,
          severity: "High",
          recommendation: "Detected severe infestation. We recommend an integrated pest management approach.",
          rescueActions: [
            "Hand-pick larvae if area is small",
            "Apply Neem-based bio-pesticide",
            "Set up pheromone traps"
          ]
        });
      }
    }, 3000);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 font-heading">AI Crop Scanner</h2>
        <p className="text-text-muted max-w-lg mx-auto">
          Upload a clear photo of the infected leaf or fruit to get instant diagnosis and treatment advice.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="bg-bg-card p-1 rounded-2xl border border-border flex gap-1">
          <button 
            onClick={() => setScanMode('Disease')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${scanMode === 'Disease' ? 'bg-primary text-black' : 'text-text-muted hover:text-text-main'}`}
          >
            Disease Detection
          </button>
          <button 
            onClick={() => setScanMode('Pest')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${scanMode === 'Pest' ? 'bg-primary text-black' : 'text-text-muted hover:text-text-main'}`}
          >
            Pest Detection
          </button>
        </div>
      </div>

      {!image ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card border-dashed border-2 border-primary/30 bg-primary/5 p-16 flex flex-col items-center justify-center cursor-pointer hover:border-primary/60 transition-all group"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*"
          />
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Camera className="text-primary" size={40} />
          </div>
          <h3 className="text-xl font-bold mb-2">Upload or Take Photo</h3>
          <p className="text-text-dim text-sm">JPG, PNG, WEBP (Max 10MB)</p>
          <div className="mt-8 flex gap-4">
            <button className="btn btn-primary px-8">Select File</button>
            <button className="btn btn-ghost px-8 flex items-center gap-2">
              <Upload size={18} /> Mobile Camera
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-0 relative aspect-square overflow-hidden bg-black"
          >
            <img src={image} alt="Crop scan" className="w-full h-full object-cover" />
            
            {isScanning && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Search className="text-primary animate-pulse" size={24} />
                  </div>
                </div>
                <p className="mt-6 font-bold text-lg text-primary tracking-widest animate-pulse">ANALYZING HEALTH...</p>
                
                {/* Scanner line animation */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-1 bg-primary/50 shadow-[0_0_15px_var(--primary)] z-20"
                />
              </div>
            )}
            
            <button 
              onClick={reset}
              className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-black transition-colors z-30"
            >
              <X size={20} />
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="card border-primary/10 flex flex-col justify-center space-y-6 p-8"
              >
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse" />
                    <div className="h-3 bg-white/5 rounded-full w-full animate-pulse" />
                  </div>
                ))}
              </motion.div>
            ) : result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="card border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="text-primary" size={24} />
                    <h3 className="text-2xl font-bold">Analysis Complete</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-text-muted uppercase font-bold tracking-widest">Detected Disease</label>
                      <p className="text-2xl font-bold text-primary">{result.disease}</p>
                    </div>
                    
                    <div className="flex gap-8">
                      <div>
                        <label className="text-xs text-text-muted uppercase font-bold tracking-widest">Confidence</label>
                        <p className="text-xl font-bold">{result.confidence}%</p>
                      </div>
                      <div>
                        <label className="text-xs text-text-muted uppercase font-bold tracking-widest">Severity</label>
                        <span className={`badge mt-1 inline-block ${
                          result.severity === 'Low' ? 'badge-success' : 
                          result.severity === 'Medium' ? 'badge-warning' : 
                          result.severity === 'Emergency' ? 'bg-danger text-white animate-pulse' : 'badge-danger'
                        }`}>
                          {result.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {result.severity === 'Emergency' && (
                  <div className="card border-danger/30 bg-danger/10">
                    <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-danger">
                      <AlertCircle size={18} /> EMERGENCY RESCUE ACTIONS
                    </h4>
                    <ul className="space-y-2">
                      {result.rescueActions?.map((action, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-danger rounded-full" /> {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="card border-accent/20 bg-accent/5">
                  <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-accent">
                    <CheckCircle2 size={18} /> Treatment Recommendation
                  </h4>
                  <p className="text-text-main leading-relaxed">
                    {result.recommendation}
                  </p>
                  <div className="mt-6 flex gap-3">
                    <button className="btn btn-primary bg-accent text-black hover:bg-yellow-500 flex-1">
                      Save to History
                    </button>
                    <button className="btn btn-ghost border-accent/30 text-accent hover:bg-accent/10 flex-1" onClick={reset}>
                      Scan Again
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}

      {/* Guidelines Section */}
      {!image && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="text-primary mb-4 flex justify-center"><CheckCircle2 size={32} /></div>
            <h4 className="font-bold mb-2">Good Lighting</h4>
            <p className="text-xs text-text-muted">Ensure the crop is well-lit but avoid direct harsh sunlight.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-primary mb-4 flex justify-center"><CheckCircle2 size={32} /></div>
            <h4 className="font-bold mb-2">Focus on Detail</h4>
            <p className="text-xs text-text-muted">Hold the camera 10-15cm away from the infected part.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-primary mb-4 flex justify-center"><CheckCircle2 size={32} /></div>
            <h4 className="font-bold mb-2">Clean Lens</h4>
            <p className="text-xs text-text-muted">Make sure your camera lens is clean for the best AI accuracy.</p>
          </div>
        </div>
      )}
    </div>
  );
}
