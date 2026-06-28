import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const ALBUM_ART = 'https://cdn-images.dzcdn.net/images/cover/e80a187f732e116fde8bd7ca9d9b4b91/0x1900-000000-80-0-0.jpg';
const TRACK = {
  title: 'Nightcall',
  artist: 'Kavinsky',
  album: 'OutRun',
  year: '2013',
};

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    setAudioUrl('./sanan-assets/Kavinsky - Nightcall _Drive_.mp3');
  }, []);

  const updateProgress = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    if (audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
    animFrameRef.current = requestAnimationFrame(updateProgress);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    if (playing) {
      audio.pause();
      cancelAnimationFrame(animFrameRef.current);
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      animFrameRef.current = requestAnimationFrame(updateProgress);
      setPlaying(true);
    }
  }, [playing, audioUrl, updateProgress]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      cancelAnimationFrame(animFrameRef.current);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [audioUrl]);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-2xl"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      <div className="relative flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5">
          <img
            src={ALBUM_ART}
            alt={TRACK.album}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {playing && (
            <motion.div
              className="absolute inset-0 rounded-xl border border-white/10"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white/90">{TRACK.title}</p>
          <p className="truncate text-xs text-white/40">{TRACK.artist}</p>
          <p className="truncate text-[11px] text-white/25">{TRACK.album} &middot; {TRACK.year}</p>
        </div>
      </div>

      <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-white/30"
          style={{ width: `${progress}%` }}
          layout
        />
      </div>

      <div className="relative mt-3 flex items-center justify-between">
        <span className="font-['Space_Mono',monospace] text-[10px] tabular-nums text-white/25">
          {fmt(currentTime)}
        </span>

        <button
          onClick={togglePlay}
          disabled={!audioUrl}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 disabled:opacity-30"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>

        <span className="font-['Space_Mono',monospace] text-[10px] tabular-nums text-white/25">
          {fmt(duration)}
        </span>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
