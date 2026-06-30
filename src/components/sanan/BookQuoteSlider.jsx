import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  { text: 'Kelimeler, albayım, bazı anlamlara gelmiyor.' },
  { text: 'Həqiqət absolutdur.' },
  { text: 'Wubba lubba dub dub' },
];

const TYPE_SPEED = 40;
const DISPLAY_DURATION = 10000;

const BookQuoteSlider = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing');
  const iRef = useRef(0);
  const timerRef = useRef(null);

  const startTyping = useCallback(() => {
    const full = QUOTES[quoteIndex].text;
    iRef.current = 0;
    setDisplayed('');
    setPhase('typing');

    timerRef.current = setInterval(() => {
      iRef.current += 1;
      if (iRef.current > full.length) {
        clearInterval(timerRef.current);
        setPhase('showing');
        timerRef.current = setTimeout(() => {
          setPhase('hiding');
          timerRef.current = setTimeout(() => {
            setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
          }, 600);
        }, DISPLAY_DURATION);
        return;
      }
      setDisplayed(full.slice(0, iRef.current));
    }, TYPE_SPEED);
  }, [quoteIndex]);

  useEffect(() => {
    startTyping();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startTyping]);

  return (
    <div className="relative mx-auto flex min-h-[120px] w-full max-w-lg items-center justify-center px-4 py-8">
      <AnimatePresence mode="wait">
        {phase !== 'hiding' && (
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            <p className="font-['Georgia',serif] text-base leading-relaxed tracking-wide text-white/85 italic">
              {displayed}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'steps(2)' }}
                className="ml-0.5 inline-block h-4 w-[2px] bg-white/60"
              />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-2">
        {QUOTES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === quoteIndex ? 'w-5 bg-white/40' : 'w-1.5 bg-white/15'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BookQuoteSlider;
