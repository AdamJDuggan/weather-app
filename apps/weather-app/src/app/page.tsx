'use client';
// React
import { useState } from 'react';
// Next.js
import Image from 'next/image';
// Google fonts
import { Capriola } from 'next/font/google';
// Components
import Card from './components/Card';
import Temperaute from './components/Temperaute';
import Time from './components/Time';
// Assets
import celsiusButton from './assets/celciusButton.svg';
import FarenheitButton from './assets/farenheitButton.svg';
// Types
import Day from './types/Day';
// Mock data
import _days from './days';
// Consts
const CAPRIOLA = Capriola({ subsets: ['latin'], weight: '400' });
const TEMPRETURE_SCALE_BUTTON_SIZE = 45;

const days = _days; // Array(6).fill(false);

const today = days[0]; //false;

export default function Index() {
  const [pending] = useState(false);
  const [scale, setScale] = useState('fahrenheit');

  return (
    <div className="wrapper" style={{ fontFamily: CAPRIOLA.style.fontFamily }}>
      <aside></aside>
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
            {days.slice(1, 6).map((day: Day) => (
              <Card
                key={day.datetime}
                type="day"
                ready={day}
                pending={pending}
                data={{
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
