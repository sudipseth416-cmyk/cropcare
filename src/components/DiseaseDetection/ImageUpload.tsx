'use client';

import React, { useState, useRef } from 'react';
import { Camera, Upload, X, ImageIcon, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateImageQuality, ImageQualityReport } from '@/lib/utils/imageValidation';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onReset: () => void;
  disabled?: boolean;
}

export default function ImageUpload({ onImageSelect, onReset, disabled }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [qualityReport, setQualityReport] = useState<ImageQualityReport | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setCurrentFile(file);
      setIsValidating(true);
      setQualityReport(null);
      
      const report = await validateImageQuality(file);
      setQualityReport(report);
      setIsValidating(false);

      if (report.isValid) {
        completeSelection(file);
      }
    }
  };

  const completeSelection = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      onImageSelect(file);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => !disabled && !isValidating && fileInputRef.current?.click()}
            className={`
              relative group cursor-pointer border-2 border-dashed rounded-[32px] p-12
              flex flex-col items-center justify-center transition-all duration-300
              ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/5'}
              ${disabled || isValidating ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden" 
              accept="image/*"
            />
            
            {isValidating ? (
              <div className="flex flex-col items-center gap-4">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <ShieldCheck size={48} className="text-primary" />
                </motion.div>
                <p className="text-sm font-bold uppercase tracking-widest text-primary animate-pulse">Checking Image Quality...</p>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Camera className="text-primary" size={32} />
                </div>
                
                <h3 className="text-xl font-bold mb-2">Capture or Upload</h3>
                <p className="text-text-muted text-center text-sm max-w-xs">
                  Drag and drop an image of the infected leaf or click to select from your gallery.
                </p>
                
                <div className="mt-8 flex gap-4">
                  <button className="btn btn-primary" disabled={disabled}>Select Photo</button>
                  <button className="btn btn-ghost" disabled={disabled}>
                    <ImageIcon size={18} /> Take Photo
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[32px] overflow-hidden aspect-video group"
          >
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
              <div className="bg-success/20 backdrop-blur-md px-4 py-2 rounded-full border border-success/30 flex items-center gap-2">
                <CheckCircle2 className="text-primary" size={16} />
                <span className="text-sm font-bold text-white">Quality Verified</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setPreview(null); setQualityReport(null); onReset(); }}
                className="p-4 bg-danger text-white rounded-full hover:scale-110 transition-transform"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quality Warnings */}
      <AnimatePresence>
        {qualityReport && !qualityReport.isValid && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-6 rounded-[24px] bg-danger/10 border border-danger/20"
          >
            <div className="flex items-center gap-2 text-danger font-bold mb-4 uppercase tracking-widest text-xs">
              <AlertTriangle size={16} /> Image Quality Issues Detected
            </div>
            <ul className="space-y-3">
              {qualityReport.warnings.map((warning, i) => (
                <li key={i} className="text-sm text-text-main flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-danger rounded-full mt-1.5" /> {warning}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => { setQualityReport(null); fileInputRef.current?.click(); }}
                className="btn btn-primary bg-danger hover:bg-red-600 text-white flex-1"
              >
                Retake Photo
              </button>
              <button 
                onClick={() => { 
                  if (currentFile) completeSelection(currentFile);
                }}
                className="btn btn-ghost border-danger/20 text-danger flex-1"
              >
                Skip & Analyze
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
