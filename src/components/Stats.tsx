"use client";

import { useState, useEffect, useRef } from "react";

const stats = [
  { target: 12, suffix: "", label: "Capítulos" },
  { target: 34, suffix: "k", label: "Palavras" },
  { target: 15, suffix: "+", label: "Autores Citados" },
  { target: 30, suffix: "+", label: "Ref. Bíblicas" },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

function StatItem({ target, suffix, label, active }: { target: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(target, 1800, active);

  return (
    <div className="stat-item text-center py-6 sm:py-8 px-3 sm:px-4">
      <div className="font-serif text-[36px] sm:text-[52px] font-bold text-gold leading-none mb-2">
        {count}{suffix}
      </div>
      <div className="text-[11px] text-text-muted tracking-[2px] uppercase font-medium">{label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-14 sm:py-20 px-5 sm:px-6 border-t border-border"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% 50%, rgba(200, 164, 78, 0.03) 0%, transparent 70%), var(--color-bg-deep)`,
      }}
    >
      <div ref={ref} className="max-w-[900px] mx-auto reveal">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map((s) => (
            <StatItem key={s.label} target={s.target} suffix={s.suffix} label={s.label} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
