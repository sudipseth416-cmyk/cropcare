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
    try {
      setLoading(true);
      setError(null);
      
      const query = lat && lon ? `lat=${lat}&lon=${lon}` : `q=Ludhiana`;
      const res = await fetch(`/api/weather?${query}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      
      setWeather(data);
      await cacheWeather(data);
      setIsCached(false);
    } catch (err: any) {
      console.error("Weather fetch error:", err);
      setError(err.message || "Using offline data.");
      
      // Try to load from cache on failure
      const cached = await getCachedWeather();
      if (cached) {
        setWeather(cached.data);
        setIsCached(true);
      }
    } finally {
      setLoading(false);
    }
  };

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

      // 2. Try to get geolocation and fetch
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
          () => fetchWeather() // Fallback to default city on permission error
        );
      } else {
        fetchWeather();
      }
    };

    loadWeather();
  }, []);

  return { weather, loading, error, isCached, refresh: fetchWeather };
}
