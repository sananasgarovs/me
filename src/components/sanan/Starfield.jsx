import { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate stars
    const starCount = Math.floor((width * height) / 8000);
    const stars = Array.from({ length: Math.min(starCount, 140) }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.75), // Mostly upper sky
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      baseAlpha: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    // Occasional shooting star
    let shootingStar = null;
    const spawnShootingStar = () => {
      shootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.3,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 10 + 12,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1,
      };
    };

    let shootingTimer = setInterval(spawnShootingStar, 9000);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Render static / twinkling stars
      stars.forEach((star) => {
        let alpha = star.alpha;
        if (!prefersReducedMotion) {
          alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.phase) * 0.25;
          alpha = Math.max(0.1, Math.min(0.9, alpha));
        }

        ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render shooting star if active
      if (shootingStar && !prefersReducedMotion) {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        );
        ctx.stroke();
        ctx.restore();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.02;

        if (shootingStar.opacity <= 0) {
          shootingStar = null;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(shootingTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default Starfield;
