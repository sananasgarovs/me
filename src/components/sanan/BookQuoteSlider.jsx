import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const THOUGHTS = [
  "Kelimeler, albayım, bazı anlamlara gelmiyor.",
  "İnsanlar həyatında sadəcə bir müddətlik qonaqdırlar. Bütün qazandığın insanlar gedəcək və hər şey bir gün səndən ayrılacaq. Yaxşı həyat nə qədər şey topladığınla ölçülmür, nə qədərini itirəndən sonra nə qədər davam edə bildiyinlə ölçülür.",
  "Həqiqət absolyutdur.",
  "Şəhvət sevgini öldürür.",
  "Gözleriniz çok ses çıkarıyor, albayım.",
  "Come along with me with the butterflies and bees, we can wander through the forest and do so as we please.",
  "I'm not here. This isn't happening.",
  "For a minute there, I lost myself...",
  "Yalnızca her şeyi kaybettikten sonra her şeyi yapmakta özgür oluruz. Sahip oldukların sonunda sana sahip olur.",
  "Evren zalim ve kayıtsız bir boşluktur. Mutlu olmanın anahtarı anlam aramak değil; sadece ölene kadar kendini önemsiz şeylerle meşgul etmektir.",
  "Atlamadan önce, yolun yarısından olan manzarayı görmeliydim.",
  "Yalnızlık bütün hayatım boyunca beni takip etti. Her yerde... Kaçış yok. Ben Tanrı'nın yalnız adamıyım.",
  "İnsanlar da fotoğraflar gibidir; ne kadar büyütürsen, o kadar düşer kalitesi.",
  "Reality is an illusion, the universe is a hologram, buy gold, bye!",
];

const BookQuoteSlider = () => {
  const [index, setIndex] = useState(0);

  // Auto-advance thought every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % THOUGHTS.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % THOUGHTS.length);
  };

  return (
    <div className="relative mx-auto w-full max-w-xl px-4 py-2 select-none">
      {/* Interactive Minimalist Thought Card (Click anywhere to cycle) */}
      <motion.div
        onClick={handleNext}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group relative min-h-[125px] sm:min-h-[115px] cursor-pointer flex items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0a0d16]/70 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-colors hover:border-white/[0.12]"
        title="Növbəti düşüncə üçün klikləyin"
      >
        {/* Subtle Decorative Quote Glyph */}
        <span className="absolute -top-3 left-4 font-serif text-5xl leading-none text-white/[0.05] pointer-events-none">
          &ldquo;
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="w-full text-center"
          >
            <p className="font-serif text-base sm:text-lg italic leading-relaxed tracking-wide text-white/90">
              &ldquo;{THOUGHTS[index]}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Discreet Minimalist Pagination Indicator */}
      <div className="mt-3 flex items-center justify-center gap-1.5 flex-wrap px-2">
        {THOUGHTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Düşüncə ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-5 bg-amber-400/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                : 'w-1.5 bg-white/15 hover:bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BookQuoteSlider;
