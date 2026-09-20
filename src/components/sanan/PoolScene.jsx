import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PoolScene = () => {
  const [activeQuote, setActiveQuote] = useState(false);

  return (
    <div className="relative w-full overflow-hidden select-none" style={{ minHeight: '340px', height: 'clamp(320px, 45vw, 460px)' }}>
      {/* Top Gradient Blend into Night */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#03050a] via-[#03050a]/80 to-transparent z-10 pointer-events-none" />

      {/* Main BoJack Pool Scene Backdrop */}
      <div className="absolute inset-0 flex items-end justify-center">
        <img
          src="./sanan-assets/ho.png"
          alt="Yolun yarısından olan hovuz mənzərəsi"
          className="h-full w-full object-contain object-bottom pointer-events-none opacity-90 water-shimmer"
        />
      </div>

      {/* Grounded Scene Characters & Artifacts */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-auto">
        <div className="relative w-full max-w-2xl h-full flex items-end justify-between px-8 sm:px-16 pb-4">
          
          {/* BoJack Horseman Silhouette / Figure */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="group/bo relative cursor-pointer z-20 flex flex-col items-center"
            onClick={() => setActiveQuote(!activeQuote)}
            whileHover={{ scale: 1.03 }}
          >
            {/* BoJack Speech Whisper in Azerbaijani */}
            <AnimatePresence>
              {activeQuote && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-amber-500/30 bg-black/85 px-3 py-1.5 shadow-2xl backdrop-blur-md"
                >
                  <p className="font-serif italic text-xs tracking-wide text-amber-200/90">
                    "Yolun yarısından olan mənzərə..."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <img
              src="./sanan-assets/bo.png"
              alt="BoJack Horseman"
              className="h-28 sm:h-36 w-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] filter contrast-105"
            />
            
            {/* Ambient Shadow / Reflection */}
            <div className="h-2 w-16 rounded-full bg-black/60 blur-sm" />
          </motion.div>

          {/* BoJack's Bottle of Booze resting on the pool deck */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileHover={{ rotate: [-2, 2, -2] }}
            className="relative cursor-pointer z-20"
            title="Hovuz kənarında sakit bir qurtum"
          >
            <img
              src="./sanan-assets/bu.png"
              alt="BoJack-in şüşəsi"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            />
            {/* Ambient Glass Glow */}
            <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-md pointer-events-none" />
          </motion.div>

        </div>
      </div>

      {/* Atmospheric Mist across the water bottom */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#03050a] to-transparent pointer-events-none z-30 opacity-70" />
    </div>
  );
};

export default PoolScene;
