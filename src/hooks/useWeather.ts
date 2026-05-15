'use client';

import { useState, useEffect } from 'react';
import { getCachedWeather, cacheWeather } from '@/lib/db/indexedDB';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  rain?: {
    "1h"?: number;
  };
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);

  const fetchWeather = async (lat?: number, lon?: number) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    
    if (!API_KEY || API_KEY === 'your_key_here') {
      setWeather(getMockWeather());
      setLoading(false);
      setIsCached(true);
      return;
    }

    try {
      setLoading(true);
      const url = lat && lon 
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        : `https://api.openweathermap.org/data/2.5/weather?q=Ludhiana&appid=${API_KEY}&units=metric`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message);
      
      setWeather(data);
      await cacheWeather(data);
      setIsCached(false);
    } catch (err) {
      setError("Using offline data.");
    } finally {
      setLoading(false);
    }
  };

  function getMockWeather() {
    return {
      name: "Ludhiana (Demo)",
      main: { temp: 28.5, humidity: 75, pressure: 1012 },
      weather: [{ main: "Clouds", description: "broken clouds", icon: "04d" }],
      wind: { speed: 4.2 },
      sys: { country: "IN" }
    };
  }

  useEffect(() => {
    const loadWeather = async () => {
      // 1. Try to load from cache first
      try {
        const cached = await getCachedWeather();
        if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour TTL
          setWeather(cached.data);
          setIsCached(true);
          setLoading(false);
        }
      } catch (e) {
        console.error("Cache load failed", e);
      }

      // 2. Fetch fresh data
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await fetch(`/api/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
          const data = await res.json();
          setWeather(data);
          await cacheWeather(data);
          setIsCached(false);
        } catch (err) {
          setError("Failed to fetch fresh weather. Using offline data.");
        } finally {
          setLoading(false);
        }
      });
    };

    loadWeather();
  }, []);

  return { weather, loading, error, isCached, refresh: fetchWeather };
}
