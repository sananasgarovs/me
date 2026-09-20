import { useState, useEffect } from 'react';

const DAYS = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];
const MONTHS = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');

  const dayName = DAYS[time.getDay()];
  const dateNum = time.getDate();
  const monthName = MONTHS[time.getMonth()];
  const year = time.getFullYear();

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center text-center select-none">
      {/* 24-Hour Digits without seconds (Space Mono) */}
      <div className="flex items-center justify-center font-mono font-light tabular-nums tracking-wider text-white/95">
        <span className="text-4xl sm:text-5xl">{hh}</span>
        <span className="mx-2 text-3xl sm:text-4xl text-cyan-400/80 animate-pulse">:</span>
        <span className="text-4xl sm:text-5xl">{mm}</span>
      </div>

      {/* Date */}
      <p className="mt-2 font-sans text-xs sm:text-sm font-light tracking-[0.12em] text-white/45">
        {dayName}, {dateNum} {monthName} {year}
      </p>
    </div>
  );
};

export default Clock;
