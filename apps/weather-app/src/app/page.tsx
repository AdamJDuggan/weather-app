'use client';
// React
import { useState, FormEvent, useMemo, useEffect } from 'react';
// Next.js
import Image from 'next/image';
// Google fonts
import { Capriola } from 'next/font/google';
// Components
import Card from './components/Card';
import Temperaute from './components/Temperaute';
import Time from './components/Time';
// Assets
import arrowButton from './assets/arrowButton.svg';
import celsiusButton from './assets/celciusButton.svg';
import FarenheitButton from './assets/farenheitButton.svg';
// Types
import Day from './types/Day';
// Consts
const CAPRIOLA = Capriola({ subsets: ['latin'], weight: '400' });
const TEMPRETURE_SCALE_BUTTON_SIZE = 45;
const DEFAULT_LOCATION = 'Brighton';

export default function Index() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [search, setSearch] = useState(DEFAULT_LOCATION);
  const [scale, setScale] = useState('fahrenheit');
  const [days, setDays] = useState(Array(6).fill(false));

  const onSearch = async () => {
    setError(false);
    setDays(Array(6).fill(false));
    setPending(true);
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?unitGroup=us&key=${process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY}&contentType=json`
      );
      const data = await response.json();
      const sixDays = data.days.slice(0, 6);
      setLocation(data.resolvedAddress);
      setDays(
        sixDays.map((day: any) => ({
          conditions: day.conditions,
          datetime: day.datetime,
          temp: day.temp,
          tempmax: day.tempmax,
          tempmin: day.tempmin,
          humidity: day.humidity,
          icon: day.icon,
          cloudcover: day.cloudcover,
          sunrise: day.sunrise,
          sunset: day.sunset,
        }))
      );

      setError(false);
      setPending(false);
    } catch (err) {
      setLocation('');
      setPending(false);
      setError(true);
    }
  };

  useEffect(() => {
    onSearch();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSearch();
  };

  const today = useMemo(() => days[0] || false, [days]);

  return (
    <div className="wrapper" style={{ fontFamily: CAPRIOLA.style.fontFamily }}>
      <aside className="sidebar-container">
        <div className="sidebar">
          <form onSubmit={onSubmit}>
            <input
              style={{ border: error ? '2px solid red' : '' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" disabled={pending || !search.length}>
              <Image
                src={arrowButton}
                alt="Arrow pointing right"
                width={30}
                height={30}
              />
            </button>
            {error && (
              <span className="error-message">
                Error. Please try a different location
              </span>
            )}
          </form>

          <div className="sidebar-data-container">
            <div>
              <Card
                type="today"
                pending={pending}
                ready={today && location}
                data={{
                  conditions: today.conditions,
                  location,
                  tempreture: today.temp,
                  date: today.datetime,
                  scale,
                  icon: today.icon,
                }}
              />
            </div>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <div className="header">
          <h2>Day overview</h2>
          <div>
            <button
              style={{ opacity: scale === 'celsius' ? 1 : 0.6 }}
              onClick={() => setScale(`celsius`)}
              type="button"
              className="highlight"
            >
              <Image
                src={celsiusButton}
                alt="celsius symbol"
                width={TEMPRETURE_SCALE_BUTTON_SIZE}
                height={TEMPRETURE_SCALE_BUTTON_SIZE}
              />
            </button>
            <button
              style={{ opacity: scale === 'fahrenheit' ? 1 : 0.6 }}
              onClick={() => setScale(`fahrenheit`)}
              type="button"
              className="scale-button"
            >
              <Image
                src={FarenheitButton}
                alt="Farenheit symbol"
                width={TEMPRETURE_SCALE_BUTTON_SIZE}
                height={TEMPRETURE_SCALE_BUTTON_SIZE}
              />
            </button>
          </div>
        </div>
        <section className="progress-cards">
          <Card
            type="progress"
            ready={today}
            pending={pending}
            data={{ type: 'humidity', progress: days[0].humidity }}
          />
          <Card
            type="progress"
            ready={today}
            pending={pending}
            data={{ type: 'cloud', progress: days[0].cloudcover }}
          />
        </section>
        <section className="stat-cards">
          <Card
            type="stat"
            ready={today}
            pending={pending}
            data={{
              title: 'Min temp',
              render: () => <Temperaute value={today.tempmin} scale={scale} />,
            }}
          />
          <Card
            type="stat"
            ready={today}
            pending={pending}
            data={{
              title: 'Max temp',
              render: () => <Temperaute value={today.tempmax} scale={scale} />,
            }}
          />

          <Card
            type="stat"
            ready={today}
            pending={pending}
            data={{
              title: 'Sunrise',
              render: () => <Time time={today.sunrise} />,
            }}
          />
          <Card
            type="stat"
            ready={today}
            pending={pending}
            data={{
              title: 'Sunset',
              render: () => <Time time={today.sunset} />,
            }}
          />
        </section>
        <section className="five-day-forcast">
          <h2>5 Day Forcast</h2>
          <div className="day-cards">
            {days.slice(1, 6).map((day: Day, index: number) => (
              <Card
                key={index}
                type="day"
                ready={day}
                pending={pending}
                data={{
                  conditions: day.conditions,
                  date: day.datetime,
                  icon: 'cloudy',
                  high: day.tempmax,
                  low: day.tempmin,
                  scale: scale,
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
