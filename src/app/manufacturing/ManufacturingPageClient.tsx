'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Factory, Microscope, Package, Warehouse, Truck, ShieldCheck, Cpu, Leaf, CheckCircle } from 'lucide-react';

export default function ManufacturingPageClient() {
  const sections = [
    { icon: Factory, title: 'Factory Overview', desc: 'Our 15,000 square meter production facility in Lagos is equipped with the latest beverage manufacturing technology. With tripled capacity from our 2023 expansion, we produce over 50,000 bottles daily across all product lines.', items: ['15,000 sqm production floor', '3 independent production lines', '50,000+ bottles daily capacity', '24/7 automated monitoring'] },
    { icon: Cpu, title: 'Production Process', desc: 'Every product follows a meticulously controlled production process, from raw material sourcing to finished product packaging. Our integrated quality checkpoints ensure consistency at every stage.', items: ['Raw material inspection', 'Automated mixing & blending', 'Temperature-controlled fermentation', 'Multi-stage filtration', 'Automated bottling & sealing'] },
    { icon: Microscope, title: 'Quality Control', desc: 'Our ISO 22000 certified quality control laboratory conducts over 200 tests daily across all product batches. Every product must pass our stringent quality gates before release.', items: ['200+ daily quality tests', 'ISO 22000 certified lab', 'Batch traceability system', 'Microbiological testing', 'Chemical composition analysis'] },
    { icon: Package, title: 'Packaging', desc: 'We use premium packaging materials that protect product integrity and enhance shelf appeal. Our packaging lines handle glass and PET bottles with equal precision.', items: ['Premium glass bottles for wines', 'BPA-free PET bottles for water', 'Quality cork & cap closures', 'Tamper-evident sealing'] },
    { icon: Warehouse, title: 'Storage & Distribution', desc: 'Our climate-controlled warehouse ensures optimal storage conditions. Strategic distribution centers in Lagos, Abuja, Port Harcourt, and Kano enable nationwide coverage.', items: ['Climate-controlled warehousing', '4 distribution centers', 'GPS-tracked delivery fleet', 'Same-day Lagos delivery'] },
    { icon: ShieldCheck, title: 'Food Safety', desc: 'Food safety is non-negotiable at Superior Beverages. Our HACCP-based food safety system covers every stage of production, from sourcing to delivery.', items: ['HACCP food safety system', 'NAFDAC certified products', 'Regular third-party audits', 'Allergen management program'] },
    { icon: Cpu, title: 'Technology', desc: 'We invest in cutting-edge manufacturing technology to maintain our competitive edge and ensure product consistency.', items: ['SCADA process control system', 'Automated bottling lines', 'Real-time quality monitoring', 'ERP integration'] },
    { icon: Leaf, title: 'Environmental Sustainability', desc: 'We are committed to reducing our environmental footprint through sustainable manufacturing practices and continuous improvement.', items: ['Water recycling system (60% reuse)', 'Solar panel installation (40% energy)', 'Biodegradable packaging initiative', 'Zero-waste target by 2028'] },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #0F1A30 0%, #1B2A4A 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: '#C9A84C' }}>
            Our Facility
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Manufacturing Excellence
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/70 max-w-2xl mx-auto">
            Where world-class technology meets Nigerian craftsmanship to produce beverages of uncompromising quality.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {sections.map((section, i) => (
              <ScrollReveal key={section.title} delay={i * 0.08}>
                <div className="glass-card p-8 h-full">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(114,47,55,0.08)' }}>
                      <section.icon className="w-6 h-6" style={{ color: '#722F37' }} />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-foreground">{section.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{section.desc}</p>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C9A84C' }} />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
