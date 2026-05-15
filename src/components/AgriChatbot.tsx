import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Mic, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AgriChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Farming Assistant. How can I help you today? You can ask about crop diseases, fertilizer calculations, or weather impacts.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('fertilizer') || q.includes('urea')) {
      return "For most rice varieties in your region, a split application of Urea is recommended: 50% at transplanting and 50% at the tillering stage. Would you like me to calculate exact quantities for your acreage?";
    }
    if (q.includes('tomato') || q.includes('blight')) {
      return "Early Blight in tomatoes is common during high humidity. I recommend applying a copper-based fungicide or Mancozeb. Also, prune the lower leaves to prevent soil-borne spores from splashing up.";
    }
    if (q.includes('weather') || q.includes('rain')) {
      return "The forecast shows a 70% chance of rain in your area tomorrow evening. I suggest delaying any spray applications until the weather clears to prevent the chemicals from washing away.";
    }
    return "That's an interesting question. Based on my database, I'd suggest checking your soil pH first. Would you like to see a guide on how to perform a simple soil test at home?";
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="text-primary" /> CropCare AI Assistant
          </h2>
          <p className="text-text-muted">24/7 Expert agricultural guidance in your pocket.</p>
        </div>
        <div className="flex gap-2">
          <span className="badge badge-success flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> Gemini Pro Active
          </span>
        </div>
      </div>

      <div className="card flex-1 flex flex-col p-0 overflow-hidden border-primary/10">
        {/* Messages area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-muted'
                }`}>
                  {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-black font-medium rounded-tr-none' 
                    : 'bg-white/5 text-text-main border border-border rounded-tl-none'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-2 ${msg.sender === 'user' ? 'text-black/60' : 'text-text-dim'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Bot size={20} className="text-text-muted" />
                </div>
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-border">
                  <div className="flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-6 border-t border-border bg-black/20">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about crops, fertilizer, soil, or weather..."
              className="w-full bg-bg-card border border-border rounded-2xl py-4 pl-14 pr-32 focus:outline-none focus:border-primary transition-all text-sm"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim flex gap-2">
              <Paperclip size={20} className="cursor-pointer hover:text-text-main" />
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
              <button className="p-2 text-text-dim hover:text-primary transition-colors">
                <Mic size={20} />
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="btn btn-primary px-4 py-2 text-sm disabled:opacity-50 disabled:grayscale"
              >
                <Send size={18} /> Send
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-3 px-2">
            <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest">Suggested:</p>
            <button onClick={() => setInput('How to treat Leaf Rust in Wheat?')} className="text-[10px] text-primary hover:underline">Wheat Rust Help</button>
            <button onClick={() => setInput('Calculate Urea for 2 acres of Rice.')} className="text-[10px] text-primary hover:underline">Fertilizer Calc</button>
            <button onClick={() => setInput('Will it rain tomorrow?')} className="text-[10px] text-primary hover:underline">Weather Check</button>
          </div>
        </div>
      </div>
    </div>
  );
}
