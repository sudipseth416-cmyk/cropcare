import { CloudRain, Sun, Cloud, Wind, Droplets, Thermometer, AlertTriangle, Calendar } from 'lucide-react';

export default function WeatherIntel() {
  const forecast = [
    { day: 'Mon', temp: 28, condition: 'Sunny', icon: Sun, humidity: 45 },
    { day: 'Tue', temp: 26, condition: 'Cloudy', icon: Cloud, humidity: 55 },
    { day: 'Wed', temp: 24, condition: 'Rain', icon: CloudRain, humidity: 80 },
    { day: 'Thu', temp: 27, condition: 'Sunny', icon: Sun, humidity: 40 },
    { day: 'Fri', temp: 29, condition: 'Hot', icon: Sun, humidity: 35 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-bold mb-2">Weather Intelligence</h2>
          <p className="text-text-muted">Personalized farming alerts based on hyper-local weather data.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-text-dim uppercase font-bold tracking-widest">Local Station</p>
            <p className="font-bold">Ludhiana, Punjab</p>
          </div>
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Sun size={24} className="text-black" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Current Weather Detail */}
        <div className="col-span-12 lg:col-span-8">
          <div className="card bg-gradient-to-br from-bg-card to-primary/5 border-primary/10 p-8 h-full">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="flex-1">
                <span className="badge badge-success mb-6">Optimal for Sowing</span>
                <div className="flex items-center gap-6">
                  <h3 className="text-7xl font-bold">28°</h3>
                  <div>
                    <p className="text-2xl font-semibold">Sunny</p>
                    <p className="text-text-muted">Feels like 31°C</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-info/10 text-info rounded-lg"><Droplets size={20} /></div>
                    <div>
                      <p className="text-xs text-text-dim uppercase font-bold">Humidity</p>
                      <p className="font-bold">45%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg"><Wind size={20} /></div>
                    <div>
                      <p className="text-xs text-text-dim uppercase font-bold">Wind</p>
                      <p className="font-bold">12km/h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-danger/10 text-danger rounded-lg"><Thermometer size={20} /></div>
                    <div>
                      <p className="text-xs text-text-dim uppercase font-bold">Soil Temp</p>
                      <p className="font-bold">24°C</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 text-accent rounded-lg"><Calendar size={20} /></div>
                    <div>
                      <p className="text-xs text-text-dim uppercase font-bold">Rain Prob</p>
                      <p className="font-bold">5%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-64 space-y-4">
                <div className="card bg-black/20 border-white/5">
                  <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-warning" /> Disease Risk
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Fungal Infection</span>
                      <span className="text-primary font-bold text-[10px]">LOW</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[20%]" />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Pest Migration</span>
                      <span className="text-warning font-bold text-[10px]">MEDIUM</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-warning h-full w-[45%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="col-span-12 lg:col-span-4">
          <div className="card h-full">
            <h3 className="text-xl font-bold mb-6">5-Day Forecast</h3>
            <div className="space-y-4">
              {forecast.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <p className="w-10 font-medium text-text-muted">{item.day}</p>
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <item.icon size={20} className={item.condition === 'Rain' ? 'text-info' : 'text-primary'} />
                    </div>
                    <div>
                      <p className="font-semibold">{item.condition}</p>
                      <p className="text-[10px] text-text-dim font-bold uppercase">{item.humidity}% Humidity</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">{item.temp}°</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather Insights */}
        <div className="col-span-12">
          <div className="card border-info/20 bg-info/5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-info/20 rounded-2xl text-info">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Agricultural Insight</h4>
                <p className="text-text-main">
                  Current conditions are ideal for **Wheat irrigation**. High humidity expected on Wednesday may trigger fungal growth in tomato crops. We recommend completing any planned pesticide sprays before Tuesday evening to ensure 24-hour absorption time.
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="btn btn-ghost border-info/30 text-info text-sm py-2">View Irrigation Plan</button>
                  <button className="btn btn-ghost border-info/30 text-info text-sm py-2">Set Rain Alert</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
