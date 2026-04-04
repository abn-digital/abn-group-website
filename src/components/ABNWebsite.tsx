'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Phone, Mail, MapPin, Globe, MessageCircle, Home, Layers, Info } from 'lucide-react';
import { MagicCard } from './magicui/magic-card';
import { BentoGrid, BentoCard } from './magicui/bento-grid';
import { Dock, DockIcon } from './magicui/dock';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Testimonials } from './ui/unique-testimonial';
import { LiquidButton, MetalButton } from './ui/liquid-glass-button';
import { LocationTag } from './ui/location-tag';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { Gallery4 } from './ui/gallery4';
import { GoogleGeminiEffect } from './ui/google-gemini-effect';
import { useScroll, useTransform } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}



const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic">ABN</span>
    <div className="h-5 w-[1px] bg-red-600 opacity-50 hidden md:block"></div>
    <span className="text-[10px] tracking-[0.4em] font-light hidden md:block opacity-40 uppercase text-white">Group</span>
  </div>
);

const COMPANIES = [
  {
    name: 'ABN Digital',
    url: 'https://abndigital.com.ar',
    tag: 'Digital Media & Data',
    color: 'rgba(255, 59, 59, 0.12)',
    borderColor: 'rgba(255, 59, 59, 0.25)',
    glowColor: 'rgba(255, 59, 59, 0.04)',
    accentColor: '#ff3b3b',
    icon: <img src="/logos/abn-digital-logo.png" alt="ABN Digital" style={{ width: 48, height: 48, objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />,
    description:
      'Agencia de Digital Media & Data enfocada en performance de alto impacto. Paid Media, Retail Media, Programmatic y todo el stack de Data & Tech.',
    tags: ['Paid Media', 'Retail Media', 'Programmatic', 'Data & Tech'],
    className: 'col-span-3 lg:col-span-1',
    background: <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
  },
  {
    name: 'ABN Studio',
    url: 'https://abndigital.com.ar',
    tag: 'Creative & Brand',
    color: 'rgba(255, 149, 0, 0.12)',
    borderColor: 'rgba(255, 149, 0, 0.25)',
    glowColor: 'rgba(255, 149, 0, 0.04)',
    accentColor: '#ff9500',
    icon: (
      <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,149,0,0.12)', borderRadius: 8, border: '1px solid rgba(255,149,0,0.25)' }}>
        <span style={{ fontFamily: 'var(--font-spartan)', fontWeight: 900, fontSize: '1.5rem', color: '#ff9500', letterSpacing: '-0.05em' }}>S</span>
      </div>
    ),
    description:
      'Estudio creativo especializado en brand identity, producción audiovisual y diseño de experiencias digitales para marcas que quieren diferenciarse.',
    tags: ['Brand Identity', 'Motion', 'UX/UI', 'Content'],
    className: 'col-span-3 lg:col-span-1',
    background: <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
  },
  {
    name: 'Hike',
    url: 'https://hikethecloud.com',
    tag: 'Automation & IA',
    color: 'rgba(0, 122, 255, 0.12)',
    borderColor: 'rgba(0, 122, 255, 0.25)',
    glowColor: 'rgba(0, 122, 255, 0.04)',
    accentColor: '#007aff',
    icon: <img src="/logos/hike-logo.png" alt="Hike" style={{ width: 48, height: 48, objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />,
    description:
      'Automatización e IA para operaciones de marketing. Desde infraestructura BigQuery hasta Agentes de IA en Google Cloud.',
    tags: ['AI Agents', 'GMP', 'Cloud Automation'],
    className: 'col-span-3 lg:col-span-1',
    background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
  },
  {
    name: 'Detrics',
    url: 'https://detrics.io',
    tag: 'Data Pipeline SaaS',
    color: 'rgba(175, 82, 222, 0.12)',
    borderColor: 'rgba(175, 82, 222, 0.25)',
    glowColor: 'rgba(175, 82, 222, 0.04)',
    accentColor: '#af52de',
    icon: <img src="/logos/detrics-logo.svg" alt="Detrics" style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 8 }} />,
    description:
      'Automatización de data pipelines para agencias PPC. Conectamos Meta, Google y TikTok Ads con Sheets y Looker Studio.',
    tags: ['Data Pipelines', 'SaaS', 'Analytics'],
    className: 'col-span-3 lg:col-span-1',
    background: <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
  },
];

const CITIES = ['Buenos Aires', 'Miami', 'Madrid', 'Montevideo'];

const OFFICES = [
  { city: 'Buenos Aires', country: 'Argentina', flag: '🇦🇷', tz: 'America/Argentina/Buenos_Aires', since: '2021' },
  { city: 'Miami', country: 'United States', flag: '🇺🇸', tz: 'America/New_York', since: '2023' },
  { city: 'Madrid', country: 'Spain', flag: '🇪🇸', tz: 'Europe/Madrid', since: '2024' },
  { city: 'Montevideo', country: 'Uruguay', flag: '🇺🇾', tz: 'America/Montevideo', since: '2024' },
  { city: 'Lima', country: 'Peru', flag: '🇵🇪', tz: 'America/Lima', since: '2025' },
];

const OfficeTime = ({ tz }: { tz: string }) => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return <span>{time}</span>;
};

const CitiesCarousel = () => (
  <div className="reveal">
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <span className="section-label" style={{ display: 'flex', justifyContent: 'center' }}>Presencia Global</span>
      <h2 style={{ fontFamily: 'var(--font-spartan)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
        5 Oficinas.<br /><span style={{ color: 'rgba(255,255,255,0.3)' }}>1 Equipo.</span>
      </h2>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
      {OFFICES.map((o, i) => (
        <div key={o.city} className="reveal" style={{ animationDelay: `${i * 0.1}s`, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-xl)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '2rem' }}>{o.flag}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.7)', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Live</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-spartan)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'white', marginBottom: '0.2rem' }}>{o.city}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{o.country}</div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.15rem' }}>Local time</div>
              <div style={{ fontFamily: 'var(--font-spartan)', fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.01em' }}>
                <OfficeTime tz={o.tz} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.15rem' }}>Since</div>
              <div style={{ fontFamily: 'var(--font-spartan)', fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '-0.01em' }}>{o.since}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


const ABN_BRANDS = ['ABN Digital', 'ABN Studio', 'Hike', 'Detrics'];

const BrandScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const p1 = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const p2 = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const p3 = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const p4 = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const p5 = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      ref={ref}
      className="h-[250vh] w-full overflow-clip relative"
      style={{ background: 'var(--color-bg)' }}
    >
      <GoogleGeminiEffect
        pathLengths={[p1, p2, p3, p4, p5]}
        title="ABN Group"
        description="Holding Digital — LATAM"
        brands={ABN_BRANDS}
      />
    </div>
  );
};

export default function ABNWebsite() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const heroLRef = useRef<HTMLHeadingElement>(null);
  const heroLabelRef = useRef<HTMLDivElement>(null);
  const heroTaglineRef = useRef<HTMLDivElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);

  const [navScrolled, setNavScrolled] = useState(false);
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [formSuccess, setFormSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [heroVariant, setHeroVariant] = useState<1 | 2>(1);

  // ── Cursor ──
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;
    let mx = 0, my = 0, fx = 0, fy = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const onHover = () => follower.classList.add('active');
    const onLeave = () => follower.classList.remove('active');
    
    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });
    
    const animate = () => {
      fx += (mx - fx) * 0.15;
      fy += (my - fy) * 0.15;
      follower.style.transform = `translate(${fx}px, ${fy}px)`;
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  // ── Nav scroll ──
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── GSAP Hero ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = document.querySelectorAll('.char');
      gsap.timeline({ delay: 0.5 })
        .fromTo(heroLabelRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' })
        .fromTo(chars, { 
          opacity: 0, 
          y: 60,
          rotateX: -45
        }, { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1.2, 
          stagger: 0.03, 
          ease: 'expo.out' 
        }, '-=0.8')
        .fromTo(heroTaglineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=1')
        .fromTo(heroScrollRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 }, '-=0.5');
    });
    return () => ctx.revert();
  }, []);

  // ── Scroll reveal ──
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('in-view', e.isIntersecting)),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);


  const toggleChip = (chip: string) =>
    setActiveChips((prev) => prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setFormSuccess(true);
  };

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />

      {/* ── NAV ── */}
      <nav className={`nav ${navScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#hero" className="nav-logo">
              <Logo />
            </a>
            <ul className="nav-links">
              <li><a href="#about" className="tracking-widest uppercase text-[10px] font-bold opacity-60 hover:opacity-100 transition-opacity">About</a></li>
              <li><a href="#companies" className="tracking-widest uppercase text-[10px] font-bold opacity-60 hover:opacity-100 transition-opacity">Companies</a></li>
              <li><a href="#contact" className="tracking-widest uppercase text-[10px] font-bold opacity-60 hover:opacity-100 transition-opacity">Contact</a></li>
              <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginLeft: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                {([1, 2] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => { setHeroVariant(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{
                      fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
                      padding: '0.3rem 0.65rem', borderRadius: 'var(--radius-full)',
                      border: heroVariant === v ? '1px solid rgba(255,255,255,0.35)' : '1px solid rgba(255,255,255,0.1)',
                      background: heroVariant === v ? 'rgba(255,255,255,0.1)' : 'transparent',
                      color: heroVariant === v ? 'white' : 'rgba(255,255,255,0.35)',
                      cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase',
                    }}
                  >
                    Home {v}
                  </button>
                ))}
              </li>
            </ul>
            <a href="#contact">
              <LiquidButton size="sm">Get in touch</LiquidButton>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      {heroVariant === 1 ? (
        <section className="hero" id="hero">
        <div className="hero-mesh" />
        <div className="hero-grain" />
        <div className="container hero-content">
          <div className="hero-label" ref={heroLabelRef}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <HoverBorderGradient
                as="div"
                duration={2}
                containerClassName="cursor-default"
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 px-3 py-1.5"
              >
                ✦ Holding Digital — LATAM
              </HoverBorderGradient>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <LocationTag city="Buenos Aires" country="ARG" timezone="ART" timezoneName="America/Argentina/Buenos_Aires" />
              <LocationTag city="Miami" country="USA" timezone="EST" timezoneName="America/New_York" />
              <LocationTag city="Madrid" country="ESP" timezone="CET" timezoneName="Europe/Madrid" />
            </div>
          </div>
          <div className="hero-headline">
            <h1 ref={heroLRef} className="perspective-1000">
              {['G','R','O','W','T','H'].map((lt, i) => <span key={i} className="char inline-block">{lt}</span>)}
              <br />
              <div className="text-stroke text-transparent leading-[0.8]">
                {['P','O','W','E','R','E','D',' ','B','Y'].map((lt, i) => <span key={i} className="char inline-block">{lt === ' ' ? '\u00A0' : lt}</span>)}
              </div>
              <span className="gradient-text">
                {['D','A','T','A','.'].map((lt, i) => <span key={i} className="char inline-block">{lt}</span>)}
              </span>
            </h1>
          </div>
          <div className="hero-bottom">
            <div ref={heroTaglineRef} className="hero-tagline">
              Impulsamos el crecimiento digital de empresas a través de una visión integrada que combina <strong>Marketing, Data & Tecnología.</strong>
            </div>
            <div className="hero-scroll" ref={heroScrollRef}>
              <div className="hero-scroll-line" />
              <a href="#about">Scroll down ↓</a>
            </div>
          </div>
        </div>
      </section>
      ) : (
        <div id="hero" style={{ background: 'var(--color-bg)' }}>
          <BrandScroll />
          <div style={{ textAlign: 'center', paddingBottom: '3rem', marginTop: '-6rem', position: 'relative', zIndex: 10 }}>
            <a href="#about" style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
              Scroll down ↓
            </a>
          </div>
        </div>
      )}

      {/* ── ABOUT ── */}
      <section className="about" id="about">
        <div className="container">
          <HoverBorderGradient
            as="div"
            duration={3}
            containerClassName="mb-8 cursor-default reveal"
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 px-3 py-1.5"
          >
            Quiénes somos
          </HoverBorderGradient>
          <p className="about-lead reveal reveal-delay-1">
            <span className="highlight">ABN Group</span> nace para responder a los nuevos desafíos del crecimiento digital. Somos un holding especializado con cuatro unidades de negocio: <span className="highlight">ABN Digital</span> (Media & Data), <span className="highlight">ABN Studio</span> (Creative), <span className="highlight">Hike</span> (Automation & AI) y <span className="highlight">Detrics</span> (Data Pipelines).
          </p>
          <div className="about-divider reveal" />
          <div className="about-stats">
            <div className="reveal reveal-delay-1">
              <div className="about-stat-number">+<span>1K</span></div>
              <div className="about-stat-label">Agencies trust Detrics</div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="about-stat-number"><span>4</span></div>
              <div className="about-stat-label">Specialized ventures</div>
            </div>
            <div className="reveal reveal-delay-3">
              <div className="about-stat-number"><span>4</span></div>
              <div className="about-stat-label">Countries with offices</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANIES ── */}
      <section className="services" id="companies" style={{ background: 'var(--color-bg-2)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="services-header">
            <div>
              <HoverBorderGradient
                as="div"
                duration={3}
                containerClassName="mb-4 cursor-default reveal"
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 px-3 py-1.5"
              >
                Nuestras Ventures
              </HoverBorderGradient>
              <h2 className="services-title reveal reveal-delay-1">Cuatro<br />Empresas.</h2>
            </div>
            <p className="services-desc reveal reveal-delay-2">
              Cuatro unidades especializadas. Un ecosistema completo de Media, Creatividad, Automatización y Data.
            </p>
          </div>

          <BentoGrid className="lg:grid-cols-4">
            {COMPANIES.map((co) => (
              <MagicCard
                key={co.name}
                className={cn(
                  "flex flex-col gap-4 p-8 border border-white/5 bg-white/[0.02] transition-all rounded-2xl overflow-hidden",
                  co.className
                )}
                gradientColor={co.accentColor}
                gradientOpacity={0.06}
                gradientSize={180}
                mode="gradient"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10" style={{ color: co.accentColor }}>
                        {co.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xl tracking-tight text-white">{co.name}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{co.tag}</span>
                      </div>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed mb-8">{co.description}</p>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                      {co.tags.map(t => (
                        <span key={t} className="text-[9px] font-bold uppercase px-3 py-1 rounded-full border border-white/10 bg-white/5 opacity-60">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={co.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all"
                      style={{ color: co.accentColor }}
                    >
                      Visit Platform <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </MagicCard>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <Gallery4 />

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: 'var(--color-bg-2)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="text-center reveal" style={{ paddingTop: '5rem', paddingBottom: '1rem' }}>
            <span className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>Lo que dicen</span>
            <h2 style={{ fontFamily: 'var(--font-spartan)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'white', marginTop: '0.5rem' }}>Nuestros Clientes</h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ── CITIES ── */}
      <section className="cities">
        <div className="container">
          <CitiesCarousel />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div>
              <span className="section-label reveal">Get in touch</span>
              <h2 className="contact-title reveal reveal-delay-1">
                Let&apos;s talk about your next move.
              </h2>
              <p className="contact-desc reveal reveal-delay-2">
                Whether you&apos;re looking for media strategy, marketing automation, data pipelines or
                all of the above — we&apos;re ready to help you grow.
              </p>
              <div className="contact-details">
                <div className="contact-detail reveal reveal-delay-1">
                  <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div>
                    <div className="contact-detail-label">Email</div>
                    <div className="contact-detail-value">
                      <a href="mailto:hello@abndigital.com.ar">hello@abndigital.com.ar</a>
                    </div>
                  </div>
                </div>
                <div className="contact-detail reveal reveal-delay-2">
                  <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <div className="contact-detail-label">Offices</div>
                    <div className="contact-detail-value">Buenos Aires · Miami · Madrid · Montevideo</div>
                  </div>
                </div>
                <div className="contact-detail reveal reveal-delay-3">
                  <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div>
                    <div className="contact-detail-label">WhatsApp</div>
                    <div className="contact-detail-value">
                      <a href="https://wa.me/5491156341079" target="_blank" rel="noopener noreferrer">+54 9 11 5634-1079</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="form-card reveal">
                {!formSuccess ? (
                  <>
                    <div className="form-status-pill">
                      <div className="form-status-dot" />
                      <span>Available for new projects</span>
                    </div>
                    <div className="form-card-title">Start a conversation.</div>
                    <div className="form-card-sub">Tell us about your business — we&apos;ll connect you with the right team.</div>

                    <a href="https://wa.me/5491156341079" target="_blank" rel="noopener noreferrer" className="form-wa-btn">
                      <svg className="form-wa-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <div>
                        <div className="form-wa-label">Chat by WhatsApp</div>
                        <div className="form-wa-sub">Quick response — we&apos;re usually online</div>
                      </div>
                      <span className="form-wa-arrow">→</span>
                    </a>

                    <div className="form-divider"><span>or fill the form</span></div>

                    <form onSubmit={handleSubmit}>
                      <div className="form-grid">
                        <div className="form-field">
                          <label className="form-label">Name <span className="req">*</span></label>
                          <input className="form-input" type="text" placeholder="Your name" required
                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="form-field">
                          <label className="form-label">Email <span className="req">*</span></label>
                          <input className="form-input" type="email" placeholder="your@email.com" required
                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                      </div>
                      <div className="form-field">
                        <label className="form-label">Company</label>
                        <input className="form-input" type="text" placeholder="Your company"
                          value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">I&apos;m interested in <span className="req">*</span></label>
                        <div className="form-chips">
                          {['ABN Digital', 'ABN Studio', 'Hike', 'Detrics', 'All of the above'].map((chip) => (
                            <span key={chip} className={`form-chip ${activeChips.includes(chip) ? 'active' : ''}`}
                              style={{ borderRadius: 'var(--radius-full)' }}
                              onClick={() => toggleChip(chip)}>{chip}</span>
                          ))}
                        </div>
                      </div>
                      <div className="form-field">
                        <label className="form-label">Message</label>
                        <textarea className="form-input" rows={3} placeholder="Tell us about your project..."
                          style={{ resize: 'none' }}
                          value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                      </div>
                      <MetalButton 
                        type="submit" 
                        variant="primary" 
                        disabled={submitting} 
                        className="w-full h-14"
                      >
                        {submitting ? 'Sending...' : 'Send Message →'}
                      </MetalButton>
                    </form>
                  </>
                ) : (
                  <div className="form-success show">
                    <div className="form-success-icon">
                      <svg viewBox="0 0 52 52"><path d="M14 27l7.5 7.5L38 18" /></svg>
                    </div>
                    <div className="form-success-title">Message Sent!</div>
                    <p className="form-success-msg">The right team will get back to you within 24 hours.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <Logo />
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} ABN Group. All rights reserved.</p>
            <ul className="footer-links">
              <li><a href="https://abndigital.com.ar" target="_blank" rel="noopener noreferrer">ABN Digital</a></li>
              <li><a href="https://abndigital.com.ar" target="_blank" rel="noopener noreferrer">ABN Studio</a></li>
              <li><a href="https://hikethecloud.com" target="_blank" rel="noopener noreferrer">Hike</a></li>
              <li><a href="https://detrics.io" target="_blank" rel="noopener noreferrer">Detrics</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* ── Fixed Dock Navigation ── */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[2000] hidden md:block">
        <Dock direction="middle">
          <DockIcon>
            <a href="#hero" className="p-3 text-white/50 hover:text-white transition-colors"><Home className="h-5 w-5" /></a>
          </DockIcon>
          <DockIcon>
            <a href="#about" className="p-3 text-white/50 hover:text-white transition-colors"><Info className="h-5 w-5" /></a>
          </DockIcon>
          <DockIcon>
            <a href="#companies" className="p-3 text-white/50 hover:text-white transition-colors"><Layers className="h-5 w-5" /></a>
          </DockIcon>
          <DockIcon>
            <a href="#contact" className="p-3 text-white/50 hover:text-white transition-colors"><MessageCircle className="h-5 w-5" /></a>
          </DockIcon>
        </Dock>
      </div>

      {/* ── Mobile Fixed CTA ── */}
      <div className="fixed-cta md:hidden">
        <a href="#contact">
          <LiquidButton size="lg">Get in touch ↗</LiquidButton>
        </a>
      </div>
    </>
  );
}
