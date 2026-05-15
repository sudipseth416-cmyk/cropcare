'use client';

import React, { useState } from 'react';
import PostCard from './PostCard';
import { Plus, Image as ImageIcon, Send, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '@/lib/native/bridge';

const DUMMY_POSTS = [
  {
    id: '1',
    author: 'Rajesh Kumar',
    location: 'Punjab',
    content: 'Observing some yellowing on the edges of my wheat leaves. Is this early stage Rust or just nitrogen deficiency? Any experts here?',
    image: 'https://images.unsplash.com/photo-1594751439417-df7a627f749a?auto=format&fit=crop&q=80&w=800',
    likes: 24,
    comments: 8,
    time: '2h ago',
    isExpert: false
  },
  {
    id: '2',
    author: 'Dr. Amit Sharma',
    location: 'Delhi (Agri Expert)',
    content: 'The recent weather alerts indicate high humidity. Please ensure your paddy fields have proper drainage to avoid root rot.',
    likes: 156,
    comments: 42,
    time: '5h ago',
    isExpert: true
  }
];

export default function CommunityFeed() {
  const [showCreate, setShowCreate] = useState(false);
  const [postContent, setPostContent] = useState('');

  const handleCreatePost = () => {
    setShowCreate(false);
    setPostContent('');
    triggerHaptic();
    // In real app, push to state/DB
  };

  return (
    <div className="max-w-xl mx-auto -mx-6 md:mx-auto">
      {/* Quick Post Trigger - Instagram style */}
      <div className="bg-bg-card p-4 border-b border-white/5 flex items-center gap-4 mb-2 md:rounded-3xl md:mb-8">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
          Y
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="flex-1 text-left py-3 px-6 bg-white/5 rounded-full text-text-dim text-sm"
        >
          What's happening on your farm?
        </button>
        <button className="text-primary"><ImageIcon size={24} /></button>
      </div>

      {/* Post Feed */}
      <div className="space-y-0 md:space-y-4">
        {DUMMY_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => setShowCreate(true)}
        className="fixed bottom-32 right-6 z-[100] w-14 h-14 bg-primary text-black rounded-full shadow-2xl flex items-center justify-center md:hidden"
      >
        <Plus size={28} />
      </button>

      {/* Create Post Modal / Bottom Sheet */}
      <AnimatePresence>
        {showCreate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreate(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[500]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 z-[600] bg-bg-card rounded-t-[40px] p-8 border-t border-white/10 flex flex-col gap-6"
            >
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto" />
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold font-heading">New Post</h3>
                <button onClick={() => setShowCreate(false)}><X size={24} /></button>
              </div>
              
              <textarea 
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your farming experience..."
                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 min-h-[150px] text-white focus:outline-none focus:border-primary/50"
              />

              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-text-dim">
                  <button className="flex items-center gap-2 text-xs font-bold uppercase"><ImageIcon size={18} /> Photo</button>
                  <button className="flex items-center gap-2 text-xs font-bold uppercase"><MapPin size={18} /> Location</button>
                </div>
                <button 
                  onClick={handleCreatePost}
                  disabled={!postContent.trim()}
                  className="btn btn-primary px-8 py-3 flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  Post <Send size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
