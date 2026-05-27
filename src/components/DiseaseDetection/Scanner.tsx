'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCcw, AlertTriangle, Camera, Layers, Sprout } from 'lucide-react';
import ImageUpload from './ImageUpload';
import AnalysisResult from './AnalysisResult';
import CameraScanner from './CameraScanner';
import MultiImageUpload from './MultiImageUpload';
import FieldAnalysisResultView from './FieldAnalysisResultView';
import { detectDisease, DetectionResult } from '@/lib/api/diseaseDetection';
import { useFieldAnalysis } from '@/hooks/useFieldAnalysis';

export default function Scanner() {
  // Mode toggle: 'single' | 'field'
  const [scanMode, setScanMode] = useState<'single' | 'field'>('single');

  // Single Image State
  const [isAnalyzingSingle, setIsAnalyzingSingle] = useState(false);
  const [singleResult, setSingleResult] = useState<DetectionResult | null>(null);
  const [singleError, setSingleError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Multi-Image Hook
  const fieldAnalysis = useFieldAnalysis();

  const handleSingleImageSelect = async (file: File) => {
    setIsAnalyzingSingle(true);
    setSingleError(null);
    setSingleResult(null);
    setShowCamera(false);

    try {
      const data = await detectDisease(file);
      setSingleResult(data);
    } catch (err: any) {
      setSingleError(err.message || 'Something went wrong during analysis');
    } finally {
      setIsAnalyzingSingle(false);
    }
  };

  const handleSingleReset = () => {
    setSingleResult(null);
    setSingleError(null);
    setIsAnalyzingSingle(false);
  };

  const activeResult = scanMode === 'single' ? singleResult : fieldAnalysis.result;
  const isAnalyzing = scanMode === 'single' ? isAnalyzingSingle : (fieldAnalysis.isAnalyzing || fieldAnalysis.isSaving);
  const activeError = scanMode === 'single' ? singleError : fieldAnalysis.error;

  const handleGlobalReset = () => {
    if (scanMode === 'single') {
      handleSingleReset();
    } else {
      fieldAnalysis.resetAnalysis();
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <AnimatePresence>
        {showCamera && (
          <CameraScanner 
            onCapture={handleSingleImageSelect} 
            onClose={() => setShowCamera(false)} 
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
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
        
        {activeResult && (
          <button 
            type="button"
            onClick={handleGlobalReset}
            className="btn btn-ghost border-primary/20 text-primary flex items-center gap-2 group text-sm"
          >
            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            New Scan
          </button>
        )}
      </div>

      {/* Mode Selector Switcher */}
      {!activeResult && !isAnalyzing && (
        <div className="flex justify-center mb-10">
          <div className="relative flex bg-white/5 border border-white/10 p-1.5 rounded-[20px] max-w-md w-full">
            <button
              type="button"
              onClick={() => setScanMode('single')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider rounded-[14px] transition-all z-10 ${scanMode === 'single' ? 'text-black' : 'text-text-muted hover:text-white'}`}
            >
              <Sprout size={16} />
              Single Crop Scan
            </button>
            <button
              type="button"
              onClick={() => setScanMode('field')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider rounded-[14px] transition-all z-10 ${scanMode === 'field' ? 'text-black' : 'text-text-muted hover:text-white'}`}
            >
              <Layers size={16} />
              Field-Wide Scan
            </button>
            
            {/* Slide Indicator */}
            <motion.div
              layoutId="mode-indicator"
              className="absolute top-1.5 bottom-1.5 left-1.5 bg-primary rounded-[14px]"
              animate={{
                x: scanMode === 'single' ? '0%' : '100%',
                width: 'calc(50% - 3px)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Input Column */}
        <div className="space-y-8">
          {scanMode === 'single' ? (
            <>
              {/* Mobile Camera Trigger */}
              <div className="md:hidden">
                <button 
                  type="button"
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
                onImageSelect={handleSingleImageSelect} 
                onReset={handleSingleReset}
                disabled={isAnalyzingSingle}
              />
            </>
          ) : (
            <MultiImageUpload 
              previews={fieldAnalysis.previews}
              isCompressing={fieldAnalysis.isCompressing}
              disabled={fieldAnalysis.isAnalyzing}
              onImageAdd={fieldAnalysis.compressAndAddImage}
              onImageRemove={fieldAnalysis.removeImage}
              onAnalyze={fieldAnalysis.startFieldAnalysis}
            />
          )}

          {/* Loading Skeletons / States */}
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
                    <h4 className="font-bold text-lg text-primary animate-pulse leading-none mb-2">
                      {scanMode === 'single' ? "Analyzing Single Leaf..." : "Analyzing Field Context..."}
                    </h4>
                    <p className="text-xs text-text-muted">
                      {scanMode === 'single' 
                        ? "Scanning for patterns and fungal markers." 
                        : "Detecting patterns, calculating spread & generating reports."}
                    </p>
                  </div>
                </div>
                <div className="mt-6 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: "easeInOut" }}
                    className="bg-primary h-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {activeError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-danger/10 border border-danger/20 flex items-center gap-3 text-danger text-sm font-medium"
            >
              <AlertTriangle size={20} />
              {activeError}
            </motion.div>
          )}
        </div>

        {/* Result Column */}
        <div className="lg:sticky lg:top-32">
          {activeResult ? (
            scanMode === 'single' ? (
              <AnalysisResult result={singleResult as DetectionResult} />
            ) : (
              <FieldAnalysisResultView 
                result={fieldAnalysis.result!} 
                onReset={fieldAnalysis.resetAnalysis} 
              />
            )
          ) : (
            <div className="card h-full flex flex-col items-center justify-center text-center p-12 border-dashed border-2 border-white/5 bg-transparent min-h-[400px]">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-text-dim">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-dim">
                {scanMode === 'single' ? "Waiting for Single Scan" : "Waiting for Field Scan"}
              </h3>
              <p className="text-text-muted mt-2 max-w-xs text-sm">
                Diagnosis results, spread estimation, and fertilizer plans will appear here after collective analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
