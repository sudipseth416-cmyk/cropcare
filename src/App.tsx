import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Leaf, 
  CloudSun, 
  FlaskConical, 
  MessageSquare, 
  Users, 
  Search,
  Camera,
  History,
  AlertTriangle,
  Droplets,
  Thermometer,
  Wind,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import CropScanner from './components/CropScanner';
import AgriChatbot from './components/AgriChatbot';
import WeatherIntel from './components/WeatherIntel';
import SoilHealth from './components/SoilHealth';
import Community from './components/Community';
import SmartIrrigation from './components/SmartIrrigation';
import YieldPrediction from './components/YieldPrediction';

// --- Sub-components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`btn btn-ghost w-full justify-start border-none px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-text-main'}`}
  >
    <Icon size={20} className={active ? 'text-primary' : ''} />
    <span className="font-medium ml-3">{label}</span>
    {active && <div className="ml-auto w-1 h-5 bg-primary rounded-full" />}
  </button>
);

const WeatherCard = () => (
  <div className="card h-full flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-text-muted text-sm uppercase tracking-wider font-semibold">Local Weather</h3>
        <p className="text-3xl font-bold mt-1">28°C</p>
        <p className="text-primary text-sm flex items-center gap-1 mt-1">
          <CloudSun size={14} /> Sunny · Punjab, IN
        </p>
      </div>
      <div className="p-3 bg-primary/10 rounded-2xl text-primary">
        <SunAnimation />
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
      <div className="text-center">
        <Droplets size={16} className="mx-auto text-info mb-1" />
        <p className="text-xs text-text-muted">Humidity</p>
        <p className="text-sm font-semibold">64%</p>
      </div>
      <div className="text-center">
        <Thermometer size={16} className="mx-auto text-danger mb-1" />
        <p className="text-xs text-text-muted">Soil Temp</p>
        <p className="text-sm font-semibold">24°C</p>
      </div>
      <div className="text-center">
        <Wind size={16} className="mx-auto text-text-dim mb-1" />
        <p className="text-xs text-text-muted">Wind</p>
        <p className="text-sm font-semibold">12km/h</p>
      </div>
    </div>
  </div>
);

const SunAnimation = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
  >
    <CloudSun size={28} />
  </motion.div>
);

const QuickAction = ({ icon: Icon, label, description, color, onClick }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="card cursor-pointer group"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${color}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold mb-1">{label}</h3>
    <p className="text-sm text-text-muted leading-relaxed">{description}</p>
    <div className="mt-4 flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
      Start Now →
    </div>
  </motion.div>
);

const DiseaseHistory = () => (
  <div className="card">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <History size={20} className="text-primary" /> Recent Scans
      </h3>
      <button className="text-primary text-sm font-medium hover:underline">View All</button>
    </div>
    <div className="space-y-4">
      {[
        { crop: 'Tomato', disease: 'Early Blight', status: 'Warning', date: '2 hours ago' },
        { crop: 'Rice', disease: 'Healthy', status: 'Optimal', date: 'Yesterday' },
        { crop: 'Wheat', disease: 'Leaf Rust', status: 'Critical', date: '3 days ago' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
          <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
            <Leaf size={20} className={item.status === 'Optimal' ? 'text-primary' : 'text-warning'} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{item.crop}</h4>
            <p className="text-xs text-text-dim">{item.date}</p>
          </div>
          <div className="text-right">
            <span className={`badge ${item.status === 'Optimal' ? 'badge-success' : item.status === 'Warning' ? 'badge-warning' : 'badge-danger'}`}>
              {item.disease}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Application ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("CropCare AI Initializing...");
    setIsLoaded(true);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'scan': return <CropScanner />;
      case 'chat': return <AgriChatbot />;
      case 'weather': return <WeatherIntel />;
      case 'soil': return <SoilHealth />;
      case 'irrigation': return <SmartIrrigation />;
      case 'yield': return <YieldPrediction />;
      case 'community': return <Community />;
      case 'dashboard':
      default:
        return (
          <div className="animate-fade-in">
            <header className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold">Welcome back, Farmer Sahab</h2>
                <p className="text-text-muted mt-1">Your farm is looking healthy today. 2 tasks require attention.</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search crops..." 
                    className="bg-bg-card border border-border rounded-xl py-2.5 pl-10 pr-4 w-64 focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">
                <div className="card h-[280px] relative overflow-hidden bg-gradient-to-br from-bg-card to-[#0a1a12]">
                  <div className="relative z-10 h-full flex flex-col justify-center max-w-md">
                    <span className="badge badge-success mb-4 w-fit">AI Analysis Live</span>
                    <h3 className="text-4xl font-bold mb-4 leading-tight">Precision Farming Powered by AI</h3>
                    <p className="text-text-muted mb-6">CropCare AI helps you detect diseases, pests, and optimize yield with 94% higher accuracy.</p>
                    <div className="flex gap-3">
                      <button className="btn btn-primary" onClick={() => setActiveTab('scan')}>
                        <Camera size={18} /> Start New Scan
                      </button>
                      <button className="btn btn-ghost" onClick={() => setActiveTab('yield')}>Check Yield</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-12 lg:col-span-4">
                <WeatherCard />
              </div>

              <div className="col-span-12 lg:col-span-3">
                <QuickAction icon={FlaskConical} label="Soil & Fertilizer" description="Detailed NPK profiling." color="bg-info/10 text-info" onClick={() => setActiveTab('soil')} />
              </div>
              <div className="col-span-12 lg:col-span-3">
                <QuickAction icon={Droplets} label="Smart Irrigation" description="Optimize water usage." color="bg-primary/10 text-primary" onClick={() => setActiveTab('irrigation')} />
              </div>
              <div className="col-span-12 lg:col-span-3">
                <QuickAction icon={TrendingUp} label="Yield Forecast" description="AI-driven predictions." color="bg-accent/10 text-accent" onClick={() => setActiveTab('yield')} />
              </div>
              <div className="col-span-12 lg:col-span-3">
                <QuickAction icon={Users} label="Outbreak Network" description="Stay informed." color="bg-danger/10 text-danger" onClick={() => setActiveTab('community')} />
              </div>

              <div className="col-span-12 lg:col-span-7">
                <DiseaseHistory />
              </div>
              
              <div className="col-span-12 lg:col-span-5">
                <div className="card h-full bg-gradient-to-tr from-bg-card to-[#1a140e]">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-warning" /> Critical Alerts
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-warning/5 border border-warning/10 text-sm">
                      <p className="font-bold text-warning mb-1">Heavy Rainfall Expected</p>
                      <p className="text-text-muted">Expected 45mm rainfall tomorrow.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  if (!isLoaded) return <div className="h-screen w-screen flex items-center justify-center bg-bg-dark text-primary font-bold">Loading CropCare AI...</div>;

  return (
    <div className="app-container flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-border p-4 lg:p-6 flex flex-row lg:flex-col gap-4 lg:gap-8 glass sticky top-0 z-50 lg:h-screen overflow-x-auto lg:overflow-y-auto no-scrollbar">
        <div className="flex items-center gap-3 px-2 shrink-0">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Leaf className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">CropCare <span className="text-primary">AI</span></h1>
          </div>
        </div>

        <nav className="flex flex-row lg:flex-col gap-1 flex-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={Camera} label="Scan" active={activeTab === 'scan'} onClick={() => setActiveTab('scan')} />
          <SidebarItem icon={CloudSun} label="Weather" active={activeTab === 'weather'} onClick={() => setActiveTab('weather')} />
          <SidebarItem icon={FlaskConical} label="Soil" active={activeTab === 'soil'} onClick={() => setActiveTab('soil')} />
          <SidebarItem icon={Droplets} label="Water" active={activeTab === 'irrigation'} onClick={() => setActiveTab('irrigation')} />
          <SidebarItem icon={TrendingUp} label="Yield" active={activeTab === 'yield'} onClick={() => setActiveTab('yield')} />
          <SidebarItem icon={MessageSquare} label="AI Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
          <SidebarItem icon={Users} label="Group" active={activeTab === 'community'} onClick={() => setActiveTab('community')} />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content flex-1 p-6 lg:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
