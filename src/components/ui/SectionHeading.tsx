'use client';

import { ScrollReveal } from './ScrollReveal';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({ label, title, subtitle, centered = true, light = false }: SectionHeadingProps) {
  return (
    <ScrollReveal className={centered ? 'text-center' : ''}>
      {label && (
        <span className="inline-block text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: '#C9A84C' }}>
          {label}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 ${light ? 'text-white' : 'text-foreground'}`}>
        {title}
      </h2>
      <div className="section-divider" style={{ margin: centered ? '1rem auto' : '1rem 0' }} />
      {subtitle && (
        <p className={`max-w-2xl mt-4 text-base md:text-lg leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-muted-foreground'}`}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
