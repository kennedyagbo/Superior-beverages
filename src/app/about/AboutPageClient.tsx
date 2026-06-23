'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatsCounter } from '@/components/ui/StatsCounter';
import { timeline, teamMembers, stats } from '@/lib/data';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield, Award, Users, Leaf, Lightbulb } from 'lucide-react';

export default function AboutPageClient() {
  const values = [
    { icon: Shield, title: 'Quality First', description: 'We never compromise on quality. Every product passes through rigorous testing before reaching our customers.' },
    { icon: Heart, title: 'Customer Focus', description: 'Our customers are at the heart of everything we do. We listen, understand, and deliver beyond expectations.' },
    { icon: Lightbulb, title: 'Innovation', description: 'We continuously invest in technology and processes to improve our products and operations.' },
    { icon: Leaf, title: 'Sustainability', description: 'We are committed to environmentally responsible manufacturing and reducing our ecological footprint.' },
    { icon: Users, title: 'Integrity', description: 'We conduct business with the highest ethical standards, building trust with every interaction.' },
    { icon: Award, title: 'Excellence', description: 'We strive for excellence in every aspect of our operations, from production to customer service.' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #722F37 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs tracking-[0.3em] uppercase font-semibold mb-4"
            style={{ color: '#C9A84C' }}
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            About Superior Beverages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            From a bold vision in 2009 to Nigeria&apos;s leading beverage manufacturer, our journey has been defined by passion, quality, and an unwavering commitment to excellence.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(114,47,55,0.1), rgba(201,168,76,0.1))' }}>
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #722F37, #C9A84C)' }}>
                      <span className="text-white font-bold text-2xl font-serif">SB</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Superior Beverages Headquarters</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#C9A84C' }}>Founded 2009</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-6">
                A Legacy of Nigerian Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Superior Beverages was founded with a singular vision: to produce world-class beverages in Nigeria that Nigerians could be truly proud of. What began as a small operation in Lagos has grown into one of the country&apos;s most respected beverage manufacturers.
                </p>
                <p>
                  Our founder, Engr. Olusegun Adebanjo, recognized that Nigeria had the talent and resources to produce beverages that could compete with the best in the world. With this conviction, he assembled a team of passionate professionals and invested in state-of-the-art production technology.
                </p>
                <p>
                  Today, Superior Beverages produces a range of premium products including champagne, classic wine, non-alcoholic wine, and premium table water. Each product reflects our commitment to quality, innovation, and the celebration of Nigerian excellence.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, var(--cream) 0%, var(--background) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="glass-card p-8 md:p-10 h-full" style={{ background: 'linear-gradient(135deg, rgba(114,47,55,0.05), rgba(201,168,76,0.05))' }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(114,47,55,0.1)' }}>
                  <Target className="w-7 h-7" style={{ color: '#722F37' }} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To produce and deliver premium beverages of the highest quality that enrich the lives of our consumers, create value for our partners, and contribute positively to the Nigerian economy. We are committed to maintaining international standards in every aspect of our operations.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 md:p-10 h-full" style={{ background: 'linear-gradient(135deg, rgba(27,42,74,0.05), rgba(114,47,55,0.05))' }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(27,42,74,0.1)' }}>
                  <Eye className="w-7 h-7" style={{ color: '#1B2A4A' }} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be Africa&apos;s most trusted and innovative beverage manufacturer, recognized globally for our uncompromising quality, sustainable practices, and the positive impact we create in communities across the continent. We envision a future where every Superior product is synonymous with excellence.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Values" title="What We Stand For" subtitle="These core values guide every decision we make and every product we create." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div className="glass-card p-8 group">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors" style={{ background: 'rgba(114,47,55,0.05)' }}>
                    <value.icon className="w-6 h-6" style={{ color: '#722F37' }} />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1A30 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Journey" title="Milestones" light />
          <div className="mt-16 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'rgba(201,168,76,0.3)' }} />
            {timeline.map((event, i) => (
              <ScrollReveal key={event.year} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''} hidden md:block`}>
                    <div className="glass-card p-6" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                      <span className="text-sm font-bold" style={{ color: '#C9A84C' }}>{event.year}</span>
                      <h3 className="text-lg font-serif font-bold text-white mt-1">{event.title}</h3>
                      <p className="text-sm text-white/60 mt-2">{event.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10 mt-2" style={{ background: '#C9A84C' }} />
                  <div className="flex-1 md:hidden pl-10">
                    <div className="glass-card p-6" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                      <span className="text-sm font-bold" style={{ color: '#C9A84C' }}>{event.year}</span>
                      <h3 className="text-lg font-serif font-bold text-white mt-1">{event.title}</h3>
                      <p className="text-sm text-white/60 mt-2">{event.description}</p>
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Leadership" title="Meet the Team" subtitle="The dedicated professionals behind Superior Beverages' success." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="glass-card overflow-hidden text-center">
                  <div className="h-48 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(114,47,55,0.1), rgba(201,168,76,0.1))' }}>
                    <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #722F37, #C9A84C)' }}>
                      <span className="text-white text-2xl font-serif font-bold">{member.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-bold text-foreground">{member.name}</h3>
                    <p className="text-sm mb-3" style={{ color: '#C9A84C' }}>{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section id="awards" className="py-20" style={{ background: 'linear-gradient(180deg, var(--cream) 0%, var(--background) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Recognition" title="Awards & Certifications" subtitle="Our commitment to quality has been recognized by industry bodies and regulatory agencies." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { title: 'NAFDAC Certification', desc: 'All products fully certified' },
              { title: 'ISO 22000:2018', desc: 'Food Safety Management System' },
              { title: 'SON Quality Award', desc: 'Standards Organisation of Nigeria' },
              { title: 'Best Beverage Brand', desc: 'Nigeria Manufacturing Excellence Awards 2024' },
            ].map((award, i) => (
              <ScrollReveal key={award.title} delay={i * 0.1}>
                <div className="glass-card p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.1)' }}>
                    <Award className="w-8 h-8" style={{ color: '#C9A84C' }} />
                  </div>
                  <h3 className="font-serif font-bold text-foreground mb-2">{award.title}</h3>
                  <p className="text-sm text-muted-foreground">{award.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Responsibility */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Responsibility" title="Giving Back to Our Community" subtitle="We believe in creating value beyond business. Our corporate responsibility initiatives focus on the communities we serve." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { title: 'Clean Water Initiative', desc: 'Providing clean drinking water to underserved communities across Lagos and neighboring states through our Water for All program.' },
              { title: 'Youth Empowerment', desc: 'Supporting young entrepreneurs through training, mentorship, and micro-financing programs to build the next generation of business leaders.' },
              { title: 'Environmental Sustainability', desc: 'Investing in renewable energy, water recycling, and biodegradable packaging to minimize our environmental footprint.' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="glass-card p-8">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(114,47,55,0.1)' }}>
                    <Leaf className="w-5 h-5" style={{ color: '#722F37' }} />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
