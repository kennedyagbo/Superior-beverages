'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { careers } from '@/lib/data';
import { MapPin, Briefcase, Clock, Check, Upload, Heart, Users, TrendingUp, GraduationCap } from 'lucide-react';

export default function CareersPageClient() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const benefits = [
    { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical coverage for you and your dependents.' },
    { icon: TrendingUp, title: 'Career Growth', desc: 'Clear advancement paths with mentorship and training programs.' },
    { icon: GraduationCap, title: 'Learning & Development', desc: 'Annual training budget and professional certification support.' },
    { icon: Users, title: 'Team Culture', desc: 'Collaborative, supportive work environment that celebrates diversity.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #722F37 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: '#C9A84C' }}>Join Our Team</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Careers</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/70 max-w-2xl mx-auto">Build your career with Nigeria&apos;s premier beverage manufacturer.</motion.p>
        </div>
      </section>

      {/* Culture & Benefits */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Why Work With Us" title="Our Culture" subtitle="We invest in our people because they are the foundation of our success." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.1}>
                <div className="glass-card p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: 'rgba(114,47,55,0.08)' }}>
                    <b.icon className="w-6 h-6" style={{ color: '#722F37' }} />
                  </div>
                  <h3 className="font-serif font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, var(--cream) 0%, var(--background) 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Open Positions" title="Current Opportunities" />
          <div className="mt-12 space-y-4">
            {careers.map((job, i) => (
              <ScrollReveal key={job.id} delay={i * 0.08}>
                <div className="glass-card overflow-hidden">
                  <button onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)} className="w-full px-6 py-5 text-left flex items-center justify-between gap-4" aria-expanded={selectedJob === job.id}>
                    <div>
                      <h3 className="font-serif font-bold text-foreground text-lg">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: '#722F37' }}>{selectedJob === job.id ? 'Close' : 'View'}</span>
                  </button>
                  {selectedJob === job.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                      <div className="px-6 pb-6 border-t border-muted pt-4">
                        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Requirements:</h4>
                        <ul className="space-y-1 mb-6">
                          {job.requirements.map((req) => (
                            <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C9A84C' }} />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Apply Now" title="Submit Your Application" />
          <ScrollReveal className="mt-12">
            {submitted ? (
              <div className="glass-card p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}>
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Application Submitted!</h3>
                <p className="text-muted-foreground">Our HR team will review your application and contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-medium text-foreground mb-1">Full Name *</label><input type="text" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                  <div><label className="block text-sm font-medium text-foreground mb-1">Email *</label><input type="email" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-medium text-foreground mb-1">Phone *</label><input type="tel" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                  <div><label className="block text-sm font-medium text-foreground mb-1">Position *</label>
                    <select required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy">
                      <option value="">Select position</option>
                      {careers.map((c) => <option key={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Upload CV *</label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-burgundy transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload your CV (PDF, DOC)</p>
                  </div>
                </div>
                <div><label className="block text-sm font-medium text-foreground mb-1">Cover Letter</label><textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy resize-none" /></div>
                <button type="submit" className="btn-primary w-full">Submit Application</button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
