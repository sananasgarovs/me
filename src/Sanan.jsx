import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';
import Starfield from './components/sanan/Starfield.jsx';
import Clock from './components/sanan/Clock.jsx';
import MusicPlayer from './components/sanan/MusicPlayer.jsx';
import PortalGunArtifact from './components/sanan/FallingAssets.jsx';
import PoolScene from './components/sanan/PoolScene.jsx';
import SocialIcons from './components/sanan/SocialIcons.jsx';
import BookQuoteSlider from './components/sanan/BookQuoteSlider.jsx';

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8865030626:AAHZ_TSEBMNSkPGl_T1SsiMm1zgJGrVSfmI';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const Sanan = () => {
  // Autoplay prompt state
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const [playMusic, setPlayMusic] = useState(false);

  // Handle Autoplay Choice
  const handleMusicChoice = (enable) => {
    setShowMusicPrompt(false);
    if (enable) {
      setPlayMusic(true);
    }
  };

  // Visitor Telemetry via Telegram (with real IP from ipify)
  useEffect(() => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

    if (sessionStorage.getItem('visited_notified')) return;
    sessionStorage.setItem('visited_notified', 'true');

    const trackVisit = async () => {
      let ip = 'Bilinmir';
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          ip = ipData.ip || 'Bilinmir';
        }
      } catch {
        // blocked by adblocker or network error
      }

      const ua = navigator.userAgent || 'unknown';
      const referer = document.referrer || '-';
      const timestamp = new Date().toLocaleString('az-AZ', { timeZone: 'Asia/Baku' });

      const deviceType = /mobile|android|iphone|ipad|ipod/i.test(ua) ? 'mobile' : /tablet|ipad/i.test(ua) ? 'tablet' : 'desktop';
      let deviceName = 'Bilinmir';
      if (/iphone/i.test(ua)) deviceName = 'Apple iPhone';
      else if (/ipad/i.test(ua)) deviceName = 'Apple iPad';
      else if (/android/i.test(ua)) {
        const match = ua.match(/Android\s[\d.]+[^)]*\)/i);
        deviceName = match ? match[0].replace(')', '') : 'Android';
      } else if (/windows/i.test(ua)) deviceName = 'Windows PC';
      else if (/macintosh|mac os/i.test(ua)) deviceName = 'Apple Mac';
      else if (/linux/i.test(ua)) deviceName = 'Linux';
      const deviceIcon = deviceType === 'mobile' ? '📱' : deviceType === 'tablet' ? '📟' : '💻';

      const osMatch = ua.match(/(Windows NT [\d.]+|Mac OS X [\d_]+|Android [\d.]+|iOS [\d_]+|Linux)/i);
      const os = osMatch ? osMatch[1].replace(/_/g, '.') : 'Bilinmir';
      const browserMatch = ua.match(/(Chrome\/[\d.]+|Firefox\/[\d.]+|Safari\/[\d.]+|Edge\/[\d.]+|Opera\/[\d.]+)/i);
      const browser = browserMatch ? browserMatch[1] : 'Bilinmir';

      const text =
        `👀 <b>Sanan səhifəsinə baxış</b>\n\n` +
        `🕐 <b>Tarix:</b> ${timestamp}\n` +
        `🌐 <b>IP:</b> <code>${ip}</code>\n` +
        `${deviceIcon} <b>Cihaz:</b> ${deviceType} · ${deviceName}\n` +
        `🖥 <b>ƏS:</b> ${os}\n` +
        `🌍 <b>Brauzer:</b> ${browser}\n` +
        `📋 <b>Referer:</b> <code>${referer}</code>`;

      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
      }).catch(() => {});
    };

    trackVisit();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#03050a] text-white selection:bg-cyan-500/30 selection:text-white">
      {/* 35mm Analog Film Grain Texture */}
      <div className="film-grain" />

      {/* Canvas Midnight Starfield */}
      <Starfield />

      {/* Interactive Rick & Morty Portal Gun Easter Egg */}
      <PortalGunArtifact />

      {/* Music Autoplay Welcome Modal Popup */}
      <AnimatePresence>
        {showMusicPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-[#0b0f19] p-6 text-center shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            >
              {/* Ambient Music Glow */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

              {/* Icon */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
                <Music className="h-7 w-7 text-cyan-300" />
              </div>

              {/* Title in Azerbaijani */}
              <h3 className="font-sans text-lg font-medium tracking-wide text-white">
                Musiqi: Hə ya da Yox?
              </h3>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => handleMusicChoice(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-sans text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <VolumeX className="h-3.5 w-3.5" />
                    <span>Yox</span>
                  </span>
                </button>

                <button
                  onClick={() => handleMusicChoice(true)}
                  className="flex-1 rounded-xl bg-white px-4 py-2.5 font-sans text-xs font-semibold text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Volume2 className="h-3.5 w-3.5 fill-black" />
                    <span>Hə</span>
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Layout Container */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        
        {/* Upper Content Spine */}
        <main className="mx-auto flex w-full max-w-xl flex-col items-center px-4 pt-10 sm:pt-16 pb-6">
          
          {/* Avatar with Ambient Backlight Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="group relative mb-4"
          >
            {/* Ambient Cyan/Amber Radial Aura */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-500/30 to-amber-500/30 blur-md transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 opacity-60" />

            <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border border-white/20 bg-black/40 shadow-2xl backdrop-blur-xl">
              <img
                src="./sanan-assets/profile.jpg"
                alt="Sənan"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: '56% 78%' }}
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-center"
          >
            <h1 className="font-sans text-2xl sm:text-3xl font-light tracking-[0.3em] text-white/95 uppercase">
              SANAN
            </h1>
          </motion.div>

          {/* Precision Clock Widget (24-Hour) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mb-8 w-full"
          >
            <Clock />
          </motion.div>

          {/* Audiophile Music Player with Autoplay Link */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8 w-full"
          >
            <MusicPlayer shouldPlay={playMusic} />
          </motion.div>

          {/* Social Links (GitHub, Instagram, LinkedIn, TikTok) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mb-8 w-full"
          >
            <SocialIcons />
          </motion.div>

          {/* Literary Quotes (Azerbaijani) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full"
          >
            <BookQuoteSlider />
          </motion.div>

        </main>

        {/* Anchoring Horizon: BoJack Pool Scene */}
        <footer className="relative w-full mt-6">
          <PoolScene />
        </footer>

      </div>
    </div>
  );
};

export default Sanan;
