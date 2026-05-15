'use client';

import React, { useState, memo } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  BadgeCheck, 
  MapPin, 
  Clock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '@/lib/native/bridge';

interface PostProps {
  post: {
    id: string;
    author: string;
    location: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    time: string;
    isExpert?: boolean;
  }
}

function PostCardComponent({ post }: PostProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    if (!liked) triggerHaptic();
  };

  return (
    <div className="bg-bg-card border-b border-white/5 md:border-none md:rounded-3xl md:mb-8 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
            {post.author[0]}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm">{post.author}</h4>
              {post.isExpert && <BadgeCheck size={14} className="text-info" />}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-text-dim uppercase tracking-widest font-bold">
              <span className="flex items-center gap-1"><MapPin size={10} /> {post.location}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={10} /> {post.time}</span>
            </div>
          </div>
        </div>
        <button className="text-text-dim"><MoreHorizontal size={20} /></button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-sm text-text-muted leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="aspect-square w-full bg-black/20 overflow-hidden">
          <img src={post.image} alt="Post" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}

      {/* Actions */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${liked ? 'text-danger' : 'text-text-dim'}`}
          >
            <motion.div
              animate={liked ? { scale: [1, 1.4, 1] } : {}}
            >
              <Heart size={24} fill={liked ? "currentColor" : "none"} />
            </motion.div>
            <span className="text-xs font-bold">{likeCount}</span>
          </button>
          
          <button className="flex items-center gap-2 text-text-dim">
            <MessageCircle size={24} />
            <span className="text-xs font-bold">{post.comments}</span>
          </button>
          
          <button className="text-text-dim">
            <Share2 size={22} />
          </button>
        </div>
        
        <div className="flex -space-x-2">
          {[1,2,3].map(i => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-bg-card bg-primary/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

const PostCard = memo(PostCardComponent);
export default PostCard;
