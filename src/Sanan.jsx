import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Starfield from './components/sanan/Starfield.jsx';
import Clock from './components/sanan/Clock.jsx';
import MusicPlayer from './components/sanan/MusicPlayer.jsx';
import FallingAssets from './components/sanan/FallingAssets.jsx';
import PoolScene from './components/sanan/PoolScene.jsx';
import SocialIcons from './components/sanan/SocialIcons.jsx';
import BookQuoteSlider from './components/sanan/BookQuoteSlider.jsx';

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const Sanan = () => {
  useEffect(() => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

    const ip = 'unknown';
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
  }, []);

  return (
    <div className="sanan-page">
      <Starfield />
      <FallingAssets />

      <div className="sanan-overlay">
        <div className="sanan-gradient" />

        <main className="sanan-main">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="sanan-avatar-wrapper"
          >
            <div className="sanan-avatar">
              <img src="./sanan-assets/profile.jpg" alt="Sanan" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="sanan-title"
          >
            <h1>SANAN</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="sanan-section"
          >
            <Clock />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
            className="sanan-section sanan-music-wrapper"
          >
            <MusicPlayer />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
            className="sanan-section"
          >
            <SocialIcons />
          </motion.div>

          <div className="sanan-section sanan-quotes">
            <BookQuoteSlider />
          </div>
        </main>

        <div className="sanan-pool">
          <PoolScene />
        </div>
      </div>
    </div>
  );
};

export default Sanan;
 
