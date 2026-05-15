import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const q = searchParams.get('q') || 'Ludhiana';

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!API_KEY || API_KEY === 'your_key_here') {
    return NextResponse.json({
      name: `${q} (Demo Mode)`,
      main: { temp: 28.5, humidity: 75, pressure: 1012 },
      weather: [{ main: "Clouds", description: "broken clouds", icon: "04d" }],
      wind: { speed: 4.2 },
      sys: { country: "IN" }
    });
  }

  try {
    const url = lat && lon 
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}
