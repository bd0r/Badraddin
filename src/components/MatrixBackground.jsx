import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function MatrixBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let columns, drops, particles;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]<>/=+-_;:.,!?|~`\u200B\u200C\u200D∫∂√πΣΔΩλφ';
    const fontSize = 14;

    function initParticles() {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1).map(() => Math.random() * -100);
      initParticles();
    }

    function draw() {
      const isDark = theme === 'dark';
      const bgAlpha = isDark ? 'rgba(10, 10, 15, 0.06)' : 'rgba(245, 240, 232, 0.06)';
      const charColor = isDark ? '#00f0ff' : '#008c96';

      ctx.fillStyle = bgAlpha;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < columns; i++) {
        if (Math.random() > 0.975) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          const opacity = Math.random() * 0.15 + 0.02;
          ctx.fillStyle = charColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba').replace('#', '');

          // Convert hex to rgba
          const r = parseInt(charColor.slice(1, 3), 16);
          const g = parseInt(charColor.slice(3, 5), 16);
          const b = parseInt(charColor.slice(5, 7), 16);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

          ctx.fillText(char, x, y);
        }
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
      }

      // Draw floating particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const r2 = parseInt(charColor.slice(1, 3), 16);
        const g2 = parseInt(charColor.slice(3, 5), 16);
        const b2 = parseInt(charColor.slice(5, 7), 16);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r2}, ${g2}, ${b2}, ${p.opacity})`;
        ctx.fill();
      });

      // Draw sparse connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const r3 = parseInt(charColor.slice(1, 3), 16);
            const g3 = parseInt(charColor.slice(3, 5), 16);
            const b3 = parseInt(charColor.slice(5, 7), 16);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${r3}, ${g3}, ${b3}, ${(1 - dist / 150) * 0.06})`;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    // Clear canvas fully once on init
    const isDark = theme === 'dark';
    ctx.fillStyle = isDark ? '#0a0a0f' : '#f5f0e8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
