import { motion } from 'framer-motion';

const NETWORKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/sananasgarovs',
    hoverGlow: 'group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
    hoverBorder: 'hover:border-white/40',
    path: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/asgarlysanan/',
    hoverGlow: 'group-hover:shadow-[0_0_20px_rgba(225,48,108,0.35)]',
    hoverBorder: 'hover:border-pink-500/50',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sananasgarovs/',
    hoverGlow: 'group-hover:shadow-[0_0_20px_rgba(10,102,194,0.35)]',
    hoverBorder: 'hover:border-sky-500/50',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@fearstosanan',
    hoverGlow: 'group-hover:shadow-[0_0_20px_rgba(37,244,238,0.3)]',
    hoverBorder: 'hover:border-cyan-400/50',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
];

const SocialIcons = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      {NETWORKS.map((network) => (
        <motion.a
          key={network.name}
          href={network.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={network.name}
          whileHover={{ y: -3, scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0e18]/80 text-white/70 shadow-lg backdrop-blur-md transition-all duration-300 hover:text-white ${network.hoverBorder} ${network.hoverGlow} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 sm:h-5.5 sm:w-5.5 transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          >
            <path d={network.path} />
          </svg>

          {/* Tooltip Tag on Hover */}
          <span className="pointer-events-none absolute -bottom-7 rounded-md border border-white/10 bg-black/90 px-2 py-0.5 font-mono text-[9px] text-white/80 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            {network.name}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialIcons;
