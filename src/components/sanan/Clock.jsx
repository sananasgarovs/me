import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const hours = time.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  const mm = String(time.getMinutes()).padStart(2, '0');

  const days = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];
  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

  return (
    <div className="text-center tracking-wider">
      <div className="font-['Space_Mono',monospace] text-[2.5rem] font-light tabular-nums text-white/90 sm:text-6xl">
        {String(h12).padStart(2, '0')}:{mm}
        <span className="ml-2 sm:ml-3 text-base sm:text-xl text-white/30">{ampm}</span>
      </div>
      <p className="mt-2 font-['Inter',sans-serif] text-sm font-light tracking-[0.15em] text-white/40">
        {days[time.getDay()]}, {time.getDate()} {months[time.getMonth()]} {time.getFullYear()}
      </p>
    </div>
  );
};

export default Clock;
