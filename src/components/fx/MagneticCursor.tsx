import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * A soft emerald halo that trails the pointer and swells over interactive
 * elements.
 *
 * Deliberately additive: the native cursor is never hidden, so nobody loses
 * track of where they are clicking. Only mounts for fine pointers (a real
 * mouse) and never under prefers-reduced-motion.
 */
export function MagneticCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 380, damping: 30, mass: 0.35 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia('(pointer: fine)');
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = e.target as HTMLElement | null;
      setHot(
        Boolean(
          el?.closest('a, button, [role="button"], input, select, textarea, [data-magnetic]'),
        ),
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full mix-blend-multiply"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        width: hot ? 54 : 26,
        height: hot ? 54 : 26,
        background: hot
          ? 'radial-gradient(circle, rgba(23,179,102,0.20) 0%, rgba(14,165,201,0.10) 55%, transparent 72%)'
          : 'radial-gradient(circle, rgba(23,179,102,0.24) 0%, transparent 70%)',
        boxShadow: hot ? '0 0 0 1px rgba(23,179,102,0.35)' : '0 0 0 1px rgba(23,179,102,0.22)',
        opacity: visible ? 1 : 0,
        transition:
          'width 260ms var(--ease-spring), height 260ms var(--ease-spring), opacity 200ms linear, background 260ms linear',
      }}
    />
  );
}
