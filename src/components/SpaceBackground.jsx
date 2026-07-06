import { useEffect, useRef } from "react";

/**
 * High-performance Space-themed Canvas Background.
 * - Starfield: Twinkling, floating stars of various colors and sizes.
 * - Nebula Clouds: Slowly morphing/drifting gas clouds using radial gradients.
 * - Galaxies: Drifting, slowly rotating spiral galaxies composed of hundreds of glowing star-dust particles.
 * - Shooting Stars (Meteors): Occasional meteors flashing across the screen.
 * - Parallax Scroll effect.
 */
export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let stars = [];
    let nebulae = [];
    let galaxies = [];
    let meteors = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initNebulae();
      initGalaxies();
    };
    window.addEventListener("resize", handleResize);

    // Initialize stars
    const initStars = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 8000); // proportional to screen size
      const starColors = ["#ffffff", "#e0ffff", "#ffe4e1", "#fffacd", "#b0c4de"];

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5 + 0.5,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
          twinkleFactor: Math.random() * Math.PI,
          speedX: (Math.random() - 0.5) * 0.05,
          speedY: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    // Initialize nebulae (Drifting gas clouds using radial gradients)
    const initNebulae = () => {
      nebulae = [
        {
          x: width * 0.2,
          y: height * 0.3,
          r: Math.min(width, height) * 0.4,
          color: "rgba(139, 92, 246, 0.06)", // Deep violet
          vx: 0.02,
          vy: 0.01,
        },
        {
          x: width * 0.8,
          y: height * 0.7,
          r: Math.min(width, height) * 0.45,
          color: "rgba(6, 182, 212, 0.06)", // Cyan
          vx: -0.015,
          vy: -0.02,
        },
        {
          x: width * 0.5,
          y: height * 0.5,
          r: Math.min(width, height) * 0.35,
          color: "rgba(236, 72, 153, 0.04)", // Soft pink/magenta
          vx: 0.01,
          vy: -0.015,
        },
      ];
    };

    // Initialize galaxies
    const initGalaxies = () => {
      galaxies = [];
      const galaxyCount = 3; // 3 galaxies
      const galaxyColors = [
        { core: "#ffffff", arms: "rgba(139, 92, 246, 0.35)", outer: "rgba(6, 182, 212, 0.05)" }, // Violet-Cyan
        { core: "#ffffff", arms: "rgba(236, 72, 153, 0.35)", outer: "rgba(139, 92, 246, 0.05)" }, // Pink-Purple
        { core: "#e0ffff", arms: "rgba(6, 182, 212, 0.35)", outer: "rgba(34, 197, 94, 0.05)" } // Cyan-Green
      ];

      for (let g = 0; g < galaxyCount; g++) {
        const particles = [];
        const particleCount = 200;
        const colorTheme = galaxyColors[g % galaxyColors.length];
        const armsCount = 2 + Math.floor(Math.random() * 2); // 2 or 3 arms
        const size = Math.random() * 40 + 70; // size of galaxy (radius)

        for (let p = 0; p < particleCount; p++) {
          const arm = p % armsCount;
          const angleOffset = (arm * 2 * Math.PI) / armsCount;
          // Exponential distribution towards center
          const t = Math.pow(Math.random(), 1.5);
          const theta = t * Math.PI * 3.5;
          const r = t * size;
          
          // Add dispersion to make spiral arms look cloud-like/dusty
          const spreadX = (Math.random() - 0.5) * (size * 0.15) * (1 - t + 0.1);
          const spreadY = (Math.random() - 0.5) * (size * 0.15) * (1 - t + 0.1);

          particles.push({
            r: r,
            theta: theta + angleOffset,
            spreadX: spreadX,
            spreadY: spreadY,
            size: Math.random() * 1.5 + 0.3,
            opacity: Math.random() * 0.7 * (1 - t) + 0.1,
            color: Math.random() < 0.25 ? colorTheme.core : (Math.random() < 0.6 ? colorTheme.arms : colorTheme.outer)
          });
        }

        galaxies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: size,
          particles: particles,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() * 0.002 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          colorTheme: colorTheme
        });
      }
    };

    // Spawn a meteor
    const spawnMeteor = () => {
      if (Math.random() < 0.002 && meteors.length < 2) {
        meteors.push({
          x: Math.random() * width,
          y: 0,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 10 + 6,
          thickness: Math.random() * 1.5 + 0.5,
          opacity: 1,
          decay: Math.random() * 0.02 + 0.01,
        });
      }
    };

    // Scroll parallax tracking
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    initStars();
    initNebulae();
    initGalaxies();

    const loop = () => {
      // Background base
      ctx.fillStyle = "#020205";
      ctx.fillRect(0, 0, width, height);

      const parallaxOffset = scrollY * 0.15; // Slow parallax shift

      // 1. Draw Nebulae
      nebulae.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Bounce nebulae off edges gently
        if (n.x < -n.r || n.x > width + n.r) n.vx *= -1;
        if (n.y < -n.r || n.y > height + n.r) n.vy *= -1;

        const grad = ctx.createRadialGradient(
          n.x,
          n.y + parallaxOffset * 0.5,
          0,
          n.x,
          n.y + parallaxOffset * 0.5,
          n.r
        );
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y + parallaxOffset * 0.5, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Galaxies (under stars)
      galaxies.forEach((g) => {
        g.x += g.vx;
        g.y += g.vy;
        g.rotation += g.rotationSpeed;

        // Wrap around screen
        if (g.x < -g.size * 2) g.x = width + g.size * 2;
        if (g.x > width + g.size * 2) g.x = -g.size * 2;
        if (g.y < -g.size * 2) g.y = height + g.size * 2;
        if (g.y > height + g.size * 2) g.y = -g.size * 2;

        const shiftedY = (g.y + parallaxOffset * 0.3) % (height + g.size * 4) - g.size * 2;

        // Core radial glow
        const coreGrad = ctx.createRadialGradient(
          g.x, shiftedY, 0,
          g.x, shiftedY, g.size * 0.4
        );
        coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
        coreGrad.addColorStop(0.2, g.colorTheme.arms);
        coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(g.x, shiftedY, g.size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Draw galaxy particles
        g.particles.forEach((p) => {
          const currentAngle = p.theta + g.rotation;
          const px = Math.cos(currentAngle) * p.r + p.spreadX;
          const py = Math.sin(currentAngle) * p.r + p.spreadY;

          ctx.beginPath();
          ctx.arc(g.x + px, shiftedY + py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        });
        ctx.globalAlpha = 1.0; // Reset alpha
      });

      // 3. Draw Stars
      stars.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;

        s.twinkleFactor += s.twinkleSpeed;
        const currentOpacity = s.opacity * (0.4 + 0.6 * Math.sin(s.twinkleFactor));

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, (s.y + parallaxOffset) % height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // 4. Draw Meteors
      spawnMeteor();
      meteors.forEach((m, index) => {
        ctx.strokeStyle = `rgba(224, 255, 255, ${m.opacity})`;
        ctx.lineWidth = m.thickness;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.length * 0.8, m.y + m.length * 0.6);
        ctx.stroke();

        m.x += m.speed;
        m.y += m.speed * 0.75;
        m.opacity -= m.decay;

        if (m.opacity <= 0 || m.x > width || m.y > height) {
          meteors.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
