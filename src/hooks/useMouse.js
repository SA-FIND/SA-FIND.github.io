import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Global mouse position tracker.
 * Returns normalized coordinates (0-1) and pixel coordinates.
 */
export function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, nx: 0.5, ny: 0.5 });

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
        nx: e.clientX / window.innerWidth,
        ny: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return mouse;
}

/**
 * Magnetic hover effect — element follows cursor when nearby.
 * @param {number} strength - How strongly the element follows (0.2 = subtle)
 * @param {number} radius - Activation radius in pixels
 */
export function useMagnetic(strength = 0.3, radius = 120) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < radius) {
        const factor = 1 - dist / radius;
        setOffset({
          x: distX * strength * factor,
          y: distY * strength * factor,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    });
  }, [strength, radius]);

  const handleLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMove, handleLeave]);

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 && offset.y === 0 ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.15s ease-out',
  };

  return { ref, style, offset };
}

/**
 * 3D tilt effect following mouse position over an element.
 * @param {number} maxTilt - Maximum tilt in degrees
 */
export function useTilt(maxTilt = 8) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shine: { x: 50, y: 50 } });
  const rafRef = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - y) * maxTilt * 2;

      setTilt({
        rotateX,
        rotateY,
        shine: { x: x * 100, y: y * 100 },
      });
    });
  }, [maxTilt]);

  const handleLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, shine: { x: 50, y: 50 } });
  }, []);

  const style = {
    transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    transition: tilt.rotateX === 0 ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.1s ease-out',
  };

  const shineStyle = {
    background: `radial-gradient(circle at ${tilt.shine.x}% ${tilt.shine.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    zIndex: 2,
  };

  return { ref, style, shineStyle, onMouseMove: handleMove, onMouseLeave: handleLeave };
}
