'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCcw, AlertTriangle, Camera, ArrowRight } from 'lucide-react';
import ImageUpload from './ImageUpload';
import AnalysisResult from './AnalysisResult';
import CameraScanner from './CameraScanner';
import { detectDisease, DetectionResult } from '@/lib/api/diseaseDetection';

export default function Scanner() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setShowCamera(false);

    try {
      const data = await detectDisease(file);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setIsAnalyzing(false);
  };

  return (
    <section className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <AnimatePresence>
        {showCamera && (
          <CameraScanner 
            onCapture={handleImageSelect} 
            onClose={() => setShowCamera(false)} 
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-3"
          >
            <Sparkles size={14} /> AI Diagnostics
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
            AI Crop Disease <span className="text-primary">Detection</span>
          </h1>
        </div>
        
        {result && (
          <button 
            onClick={reset}
            className="btn btn-ghost border-primary/20 text-primary flex items-center gap-2 group text-sm"
          >
            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            New Scan
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Input Column */}
        <div className="space-y-8">
          {/* Mobile Camera Trigger */}
          <div className="md:hidden">
            <button 
              onClick={() => setShowCamera(true)}
              className="w-full py-10 bg-primary rounded-[32px] flex flex-col items-center justify-center gap-4 shadow-xl shadow-primary/20 active:scale-95 transition-transform"
            >
              <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center">
                <Camera size={32} className="text-black" />
              </div>
              <span className="text-xl font-bold text-black">Scan Now</span>
            </button>
            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">or upload from gallery</span>
              <div className="h-px bg-white/5 flex-1" />
            </div>
          </div>

          <ImageUpload 
            onImageSelect={handleImageSelect} 
            onReset={reset}
            disabled={isAnalyzing}
          />

          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="card bg-primary/5 border-primary/20 overflow-hidden p-6"
              >
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-16 shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="text-primary animate-pulse" size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-primary animate-pulse leading-none mb-2">Analyzing...</h4>
                    <p className="text-xs text-text-muted">Scanning for patterns and fungal markers.</p>
                  </div>
                </div>
                <div className="mt-6 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="bg-primary h-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-danger/10 border border-danger/20 flex items-center gap-3 text-danger text-sm font-medium"
            >
              <AlertTriangle size={20} />
              {error}
            </motion.div>
          )}
        </div>

        {/* Result Column */}
        <div className="lg:sticky lg:top-32">
          {result ? (
            <AnalysisResult result={result} />
          ) : (
            <div className="card h-full flex flex-col items-center justify-center text-center p-12 border-dashed border-2 border-white/5 bg-transparent min-h-[400px]">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-text-dim">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-dim">Waiting for Scan</h3>
              <p className="text-text-muted mt-2 max-w-xs text-sm">
                Diagnosis results and treatment plans will appear here after analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
