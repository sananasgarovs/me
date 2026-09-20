import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

const DIMENSION_QUOTES = [
  "Heç kim bilərəkdən var olmur. Heç kim heç yerə aid deyil. Hər kəs öləcək. Gəl televizora baxaq.",
  "Wubba lubba dub dub!",
  "Yaşamaq hər şeyi riskə atmaqdır, əks halda sadəcə kainatın sovurduğu təsadüfi molekul yığınından ibarətsən.",
  "Bəzən elm elmdən çox sənətdir, Morti.",
  "Reality is an illusion, the universe is a hologram, buy gold, bye!",
];

const PortalGunArtifact = () => {
  const [openPortal, setOpenPortal] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const activatePortal = () => {
    setQuoteIdx((prev) => (prev + 1) % DIMENSION_QUOTES.length);
    setOpenPortal(true);
  };

  return (
    <>
      {/* Floating Ambient Portal Gun Relic */}
      <div className="fixed bottom-6 right-6 z-30 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="group relative cursor-pointer"
          onClick={activatePortal}
          whileHover={{ scale: 1.08, rotate: -4 }}
          whileTap={{ scale: 0.95 }}
          title="C-137 Portal"
        >
          <div className="absolute -inset-3 rounded-full bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Micro Tag */}
          <div className="absolute -top-7 right-0 hidden group-hover:flex items-center gap-1 rounded-full border border-emerald-500/40 bg-black/90 px-2.5 py-0.5 text-[9px] font-mono text-emerald-400 shadow-lg">
            <Sparkles className="h-2.5 w-2.5 text-emerald-400 animate-pulse" />
            <span>C-137 Portalı</span>
          </div>

          <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-[#07130c]/90 p-2 shadow-[0_4px_20px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all group-hover:border-emerald-400/60 group-hover:shadow-[0_0_25px_rgba(57,255,20,0.35)]">
            <img
              src="./sanan-assets/po.png"
              alt="Portal Gun"
              className="h-full w-full object-contain filter contrast-110 drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Dimensional Portal Rift Modal */}
      <AnimatePresence>
        {openPortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            onClick={() => setOpenPortal(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 5 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-emerald-500/40 bg-[#051109] p-6 shadow-[0_0_50px_rgba(16,185,129,0.25)]"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <button
                onClick={() => setOpenPortal(false)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Bağla"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
                  Ölçülərarası C-137 Qəbuledicisi
                </span>
              </div>

              <div className="my-5 flex justify-center">
                <motion.img
                  src="./sanan-assets/po.png"
                  alt="Portal Gun"
                  className="h-20 w-auto object-contain filter drop-shadow-[0_0_18px_rgba(57,255,20,0.5)]"
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <p className="font-mono text-sm leading-relaxed text-emerald-100/90 italic text-center px-2">
                "{DIMENSION_QUOTES[quoteIdx]}"
              </p>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setQuoteIdx((prev) => (prev + 1) % DIMENSION_QUOTES.length)}
                  className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 font-mono text-xs text-emerald-300 transition-all hover:bg-emerald-500/25 active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                >
                  Növbəti Ölçüyə Keçid &rarr;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortalGunArtifact;
