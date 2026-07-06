import { useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Wraps any element with a subtle "floating" motion that reacts to mouse
 * position. The physics are intentionally cheap (no external engine).
 */
export default function FloatingWrapper({ children, className }) {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [10, -10]);
  const rotateY = useTransform(x, [-30, 30], [-10, 10]);

  // Gentle repulsion from cursor local to the card
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / 25;
      const dy = (e.clientY - cy) / 25;
      x.set(dx);
      y.set(dy);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [x, y]);

  return (
    <motion.div
      ref={containerRef}
      className={`floating ${className || ""}`}
      style={{ x, y, rotateX, rotateY }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
    >
      {children}
    </motion.div>
  );
}
