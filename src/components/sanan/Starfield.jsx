import { useMemo } from 'react';
import { motion } from 'framer-motion';

const Star = ({ style, anim }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={style}
    animate={{
      opacity: [0.2, 0.9, 0.3, 0.7, 0.2],
      scale: [1, 1.2, 0.9, 1.1, 1],
    }}
    transition={{
      duration: anim.duration,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: anim.delay,
    }}
  />
);

const Starfield = () => {
  const stars = useMemo(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 640 ? 40 : 120;
    const arr = [];
    for (let i = 0; i < count; i++) {
      const size = 0.5 + Math.random() * 1.8;
      arr.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 70}%`,
          width: size,
          height: size,
          opacity: 0.2 + Math.random() * 0.4,
        },
        anim: {
          duration: 2 + Math.random() * 4,
          delay: Math.random() * 3,
        },
      });
    }
    return arr;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {stars.map((s) => (
        <Star key={s.id} style={s.style} anim={s.anim} />
      ))}
    </div>
  );
};

export default Starfield;
