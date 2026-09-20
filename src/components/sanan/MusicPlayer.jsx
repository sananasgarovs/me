import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc } from 'lucide-react';

const TRACK = {
  title: 'Present',
  artist: 'Lloyd Vaan',
  album: 'Lens Flare',
  year: '2021',
  cover: './sanan-assets/present-cover.jpg',
  audioUrl: './sanan-assets/present.mp3',
};

const MusicPlayer = ({ shouldPlay = false }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  // Trigger play when user clicks "Hə" on the welcome popup
  useEffect(() => {
    if (shouldPlay && audioRef.current && !playing) {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        setPlaying(false);
      });
    }
  }, [shouldPlay]);

  // Toggle Play / Pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        setPlaying(false);
      });
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !muted;
    audioRef.current.muted = nextMuted;
    setMuted(nextMuted);
  };

  // Handle Timeline Scrubbing (Click or Drag)
  const handleSeek = (e) => {
    if (!audioRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = clickPosition * (duration || audioRef.current.duration || 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Sync Audio Events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c101a]/80 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15]"
    >
      {/* Hidden Audio Element with Full Track */}
      <audio ref={audioRef} src={TRACK.audioUrl} preload="metadata" />

      {/* Track & Vinyl Container */}
      <div className="flex items-center gap-3.5">
        {/* Album Artwork with Spinning Vinyl Illusion */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-md">
          <img
            src={TRACK.cover}
            alt={`${TRACK.title} - ${TRACK.artist}`}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {playing && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]"
            >
              <Disc className="h-8 w-8 text-white/70" />
            </motion.div>
          )}
        </div>

        {/* Track Metadata */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-sans text-sm font-medium tracking-wide text-white/95">
            {TRACK.title}
          </h3>
          <p className="truncate font-sans text-xs text-white/55">
            {TRACK.artist}
          </p>
          <p className="truncate font-mono text-[10px] text-white/35">
            {TRACK.album} &middot; {TRACK.year}
          </p>
        </div>

        {/* Volume & Play Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Səsi aç' : 'Səsi kəs'}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={togglePlay}
            aria-label={playing ? 'Durdur' : 'Başlat'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {playing ? (
              <Pause className="h-4 w-4 fill-black text-black" />
            ) : (
              <Play className="ml-0.5 h-4 w-4 fill-black text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Interactive Timeline Scrubber */}
      <div className="mt-3.5">
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          className="group/seek relative h-3 w-full cursor-pointer flex items-center"
          role="slider"
          aria-label="Musiqini irəli/geri çək"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          tabIndex={0}
        >
          {/* Track Bar Background */}
          <div className="h-1 w-full rounded-full bg-white/10 transition-all group-hover/seek:h-1.5">
            {/* Active Progress */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 relative"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Draggable Thumb Knob */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-2.5 w-2.5 rounded-full bg-white shadow-md opacity-0 group-hover/seek:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="flex items-center justify-between font-mono text-[10px] tabular-nums text-white/45">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
