import { useMemo } from 'react';
import { motion } from 'framer-motion';

const rand = (min, max) => Math.random() * (max - min) + min;

const BoFloater = () => {
  const params = useMemo(() => ({
    dur: rand(22, 35),
    delay: rand(0, 8),
    yRange: [rand(20, 35), rand(50, 65)],
    xDrift: rand(15, 35),
    rotRange: rand(3, 8),
    breathDur: rand(5, 9),
  }), []);

  return (
    <motion.div
      className="absolute pointer-events-none max-sm:scale-[0.35] max-sm:origin-top"
      style={{
        left: '50%',
        top: 0,
        width: 155,
        height: 220,
        zIndex: 20,
        translateX: '-50%',
      }}
      animate={{
        y: [`${params.yRange[0]}%`, `${params.yRange[1]}%`, `${params.yRange[0]}%`],
        x: [`-${params.xDrift}px`, `${params.xDrift}px`, `-${params.xDrift * 0.5}px`, `${params.xDrift * 0.7}px`, `-${params.xDrift}px`],
        rotate: [-params.rotRange, params.rotRange * 0.7, -params.rotRange * 0.4, params.rotRange, -params.rotRange],
        opacity: [0, 1, 0.95, 1, 0],
      }}
      transition={{
        duration: params.dur,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        delay: params.delay,
      }}
    >
      <motion.img
        src="./sanan-assets/bo.png"
        alt="bo"
        className="h-full w-full object-contain drop-shadow-[0_0_50px_rgba(100,100,255,0.2)]"
        animate={{ scale: [1, 1.07, 0.97, 1.05, 1] }}
        transition={{ duration: params.breathDur, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

const BottleFloater = () => {
  const params = useMemo(() => ({
    dur: rand(16, 28),
    delay: rand(0, 12),
    startOffset: rand(-25, 25),
    drift: rand(10, 40),
    rotPeak: rand(25, 55),
    startY: rand(-30, -10),
    peakY: rand(20, 45),
    endY: rand(60, 90),
    breathDur: rand(4, 8),
    xDir: Math.random() > 0.5 ? 1 : -1,
  }), []);

  const rightReach = params.startOffset + params.drift * params.xDir;

  return (
    <motion.div
      className="absolute pointer-events-none max-sm:scale-[0.4] max-sm:origin-top-left"
      style={{
        left: '50%',
        top: 0,
        width: 43,
        height: 106,
        zIndex: 10,
      }}
      animate={{
        x: [
          `${params.startOffset}vw`,
          `${params.startOffset + params.xDir * params.drift * 0.3}vw`,
          `${rightReach}vw`,
          `${params.startOffset + params.xDir * params.drift * 0.5}vw`,
          `${params.startOffset}vw`,
        ],
        y: [`${params.startY}%`, `${params.peakY}%`, `${params.endY}%`, `${params.peakY + 10}%`, `${params.endY + 5}%`],
        rotate: [0, -params.rotPeak * 0.5, params.rotPeak, -params.rotPeak * 0.3, 0],
        opacity: [0, 0.6, 1, 0.5, 0],
      }}
      transition={{
        duration: params.dur,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.4, 0.95],
        times: [0, 0.15, 0.4, 0.65, 1],
        delay: params.delay,
      }}
    >
      <motion.img
        src="./sanan-assets/bu.png"
        alt="bu"
        className="h-full w-full object-contain drop-shadow-[0_0_30px_rgba(180,150,80,0.15)]"
        animate={{ rotate: [0, 6, -4, 5, 0] }}
        transition={{ duration: params.breathDur, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.015] to-transparent"
        style={{
          maskImage: 'url(./sanan-assets/bu.png)',
          WebkitMaskImage: 'url(./sanan-assets/bu.png)',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    </motion.div>
  );
};

const PortalGunFloater = () => {
  const params = useMemo(() => ({
    dur: rand(18, 30),
    delay: rand(0, 10),
    startOffset: rand(-30, 30),
    drift: rand(15, 45),
    rotPeak: rand(20, 50),
    startY: rand(-35, -15),
    peakY: rand(15, 40),
    endY: rand(55, 85),
    breathDur: rand(4, 7),
    xDir: Math.random() > 0.5 ? 1 : -1,
  }), []);

  const rightReach = params.startOffset + params.drift * params.xDir;

  return (
    <motion.div
      className="absolute pointer-events-none max-sm:scale-[0.35] max-sm:origin-top"
      style={{
        left: '50%',
        top: 0,
        width: 70,
        height: 98,
        zIndex: 15,
      }}
      animate={{
        x: [
          `${params.startOffset}vw`,
          `${params.startOffset + params.xDir * params.drift * 0.3}vw`,
          `${rightReach}vw`,
          `${params.startOffset + params.xDir * params.drift * 0.5}vw`,
          `${params.startOffset}vw`,
        ],
        y: [`${params.startY}%`, `${params.peakY}%`, `${params.endY}%`, `${params.peakY + 10}%`, `${params.endY + 5}%`],
        rotate: [0, -params.rotPeak * 0.4, params.rotPeak * 0.6, -params.rotPeak * 0.3, 0],
        opacity: [0, 0.5, 1, 0.5, 0],
      }}
      transition={{
        duration: params.dur,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.4, 0.95],
        times: [0, 0.15, 0.4, 0.65, 1],
        delay: params.delay,
      }}
    >
      <motion.img
        src="./sanan-assets/po.png"
        alt="portal gun"
        className="h-full w-full object-contain drop-shadow-[0_0_40px_rgba(0,255,100,0.25)]"
        animate={{ rotate: [0, 5, -3, 4, 0], scale: [1, 1.05, 0.95, 1.03, 1] }}
        transition={{ duration: params.breathDur, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

const FallingAssets = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      <BoFloater />
      <BottleFloater />
      <BottleFloater />
      <PortalGunFloater />
    </div>
  );
};

export default FallingAssets;
