'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CITIES = [
  'Buenos Aires', 'Miami', 'New York', 'Madrid', 'São Paulo',
  'Dubai', 'London', 'Mexico City', 'Bogotá', 'Lima',
];

const SERVICES = [
  {
    number: '01',
    name: 'Digital Strategy',
    text: 'We design end-to-end digital strategies that align your brand vision with measurable business outcomes. From market positioning to growth roadmaps.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    number: '02',
    name: 'Web & Digital Experiences',
    text: 'We craft high-performance websites and digital experiences that look world-class and are engineered to convert. Built to impress, designed to grow.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    number: '03',
    name: 'Branding & Identity',
    text: 'We build brands that become icons. Logo systems, visual identity, brand guidelines and messaging frameworks that make your business unforgettable.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    number: '04',
    name: 'Growth & Performance',
    text: 'Data-driven growth marketing, SEO, paid media and performance analytics. We turn traffic into revenue and users into loyal advocates for your brand.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

export default function ABNWebsite() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const heroLRef = useRef<HTMLHeadingElement>(null);
  const heroRRef = useRef<HTMLHeadingElement>(null);
  const heroLabelRef = useRef<HTMLDivElement>(null);
  const heroTaglineRef = useRef<HTMLDivElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const cityTrackRef = useRef<HTMLDivElement>(null);

  const [navScrolled, setNavScrolled] = useState(false);
  const [cityIndex, setCityIndex] = useState(0);
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [formSuccess, setFormSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ── Cursor ──
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;
    let mx = 0, my = 0, fx = 0, fy = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    };

    const animate = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animate();
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // ── Nav scroll ──
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── GSAP Hero animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(heroLRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0)
        .to(heroRRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.1)
        .to(heroLabelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.4)
        .to(heroTaglineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.6)
        .to(heroScrollRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.8);

      // Set initial states
      gsap.set([heroLRef.current, heroRRef.current], { opacity: 0, y: 60 });
      gsap.set([heroLabelRef.current, heroTaglineRef.current, heroScrollRef.current], { opacity: 0, y: 20 });

      // Redo with proper initial set before timeline runs
      const tl2 = gsap.timeline({ delay: 0.3 });
      tl2.fromTo(heroLabelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0)
         .fromTo(heroLRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.15)
         .fromTo(heroRRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.25)
         .fromTo(heroTaglineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.6)
         .fromTo(heroScrollRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.75);
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

  // ── City carousel ──
  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((i) => (i + 1) % CITIES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const track = cityTrackRef.current;
    if (!track) return;
    gsap.to(track, {
      y: -cityIndex * 48,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, [cityIndex]);

  const toggleChip = (chip: string) => {
    setActiveChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate network
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setFormSuccess(true);
  };

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />

      {/* ── NAV ── */}
      <nav className={`nav ${navScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#hero" className="nav-logo">
              ABN<span>.</span>
            </a>
            <ul className="nav-links">
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <a href="#contact" className="nav-cta">Get Started</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />
        <canvas className="hero-stars" id="hero-canvas" />
        <div className="hero-grain" />
        <div className="hero-grad-over" />

        <div className="container hero-content">
          <div className="hero-label" ref={heroLabelRef}>
            <span className="section-label" style={{ marginBottom: 0 }}>ABN Group — Buenos Aires</span>
          </div>

          <div className="hero-headline">
            <h1 ref={heroLRef}>Think<br />Bold.</h1>
            <h1 className="right" ref={heroRRef}>Grow<br />Digital.</h1>
          </div>

          <div className="hero-bottom">
            <div ref={heroTaglineRef} className="hero-tagline">
              We build <strong>world-class digital experiences</strong>, brands and strategies<br />
              for ambitious businesses ready to lead their market.
            </div>
            <div className="hero-scroll" ref={heroScrollRef}>
              <div className="hero-scroll-line" />
              <a href="#about">Scroll down ↓</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about" id="about">
        <div className="container">
          <span className="section-label reveal">About us</span>
          <p className="about-lead reveal reveal-delay-1">
            <span className="highlight">ABN Group</span> is a premium digital group that builds{' '}
            <span className="highlight">world-class brands, websites and digital experiences</span> for ambitious
            businesses across Latin America and the globe. From strategy to launch, we help you{' '}
            <span className="highlight">look premium and grow faster.</span>
          </p>

          <div className="about-divider reveal" />

          <div className="about-stats">
            <div className="reveal reveal-delay-1">
              <div className="about-stat-number">+<span>120</span></div>
              <div className="about-stat-label">Projects delivered</div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="about-stat-number"><span>8</span>+</div>
              <div className="about-stat-label">Years of experience</div>
            </div>
            <div className="reveal reveal-delay-3">
              <div className="about-stat-number"><span>15</span></div>
              <div className="about-stat-label">Countries reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services" id="services">
        <div className="container">
          <div className="services-header">
            <div>
              <span className="section-label reveal">What we do</span>
              <h2 className="services-title reveal reveal-delay-1">Our<br />Services.</h2>
            </div>
            <p className="services-desc reveal reveal-delay-2">
              End-to-end digital solutions for businesses that refuse to be ordinary.
              We turn vision into reality.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((s) => (
              <div key={s.number} className="service-card reveal">
                <div className="service-number">{s.number}</div>
                <div className="service-icon">{s.icon}</div>
                <div className="service-name">{s.name}</div>
                <p className="service-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIES ── */}
      <section className="cities">
        <div className="container">
          <div className="cities-inner">
            <div className="cities-label reveal">Operating worldwide</div>
            <div className="cities-divider reveal reveal-delay-1">
              <div className="cities-divider-line" />
              <svg className="cities-globe" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM4 12c0-.55.05-1.09.14-1.61L7 13.26V14a2 2 0 002 2v1.93A8.01 8.01 0 014 12zm13.93 5.64A1.99 1.99 0 0016 16h-1v-3a1 1 0 00-1-1H9v-2h2a1 1 0 001-1V7h2a2 2 0 002-2v-.41A8.002 8.002 0 0120 12a7.98 7.98 0 01-2.07 5.64z" />
              </svg>
              <div className="cities-divider-line" />
            </div>
            <div className="cities-carousel reveal reveal-delay-2">
              <div className="cities-track" ref={cityTrackRef}>
                {CITIES.map((city, i) => (
                  <div key={city} className={`city-item ${i === cityIndex ? 'active' : ''}`}>
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-grid">
            {/* Left: info */}
            <div>
              <span className="section-label reveal">Get in touch</span>
              <h2 className="contact-title reveal reveal-delay-1">
                Let&apos;s make your brand unforgettable.
              </h2>
              <p className="contact-desc reveal reveal-delay-2">
                If you&apos;re ready to lead your market, let&apos;s talk. Fill in the form or reach out
                directly — we respond within 24 hours.
              </p>
              <div className="contact-details">
                <div className="contact-detail reveal reveal-delay-1">
                  <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div>
                    <div className="contact-detail-label">Email</div>
                    <div className="contact-detail-value">
                      <a href="mailto:hello@abngroup.com">hello@abngroup.com</a>
                    </div>
                  </div>
                </div>
                <div className="contact-detail reveal reveal-delay-2">
                  <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <div className="contact-detail-label">Headquarters</div>
                    <div className="contact-detail-value">Buenos Aires, Argentina</div>
                  </div>
                </div>
                <div className="contact-detail reveal reveal-delay-3">
                  <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div>
                    <div className="contact-detail-label">WhatsApp</div>
                    <div className="contact-detail-value">
                      <a href="https://wa.me/541100000000" target="_blank" rel="noopener noreferrer">+54 11 0000-0000</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <div className="form-card reveal">
                {!formSuccess ? (
                  <>
                    <div className="form-status-pill">
                      <div className="form-status-dot" />
                      <span>Available for new projects</span>
                    </div>
                    <div className="form-card-title">From Brand to Icon.</div>
                    <div className="form-card-sub">Tell us about your project — we'll get back within 24 hours.</div>

                    <a href="https://wa.me/541100000000" target="_blank" rel="noopener noreferrer" className="form-wa-btn">
                      <svg className="form-wa-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <div>
                        <div className="form-wa-label">Start a WhatsApp Conversation</div>
                        <div className="form-wa-sub">Faster response — we&apos;re usually online</div>
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
                        <input className="form-input" type="text" placeholder="Your company name"
                          value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                      </div>

                      <div className="form-field">
                        <label className="form-label">What do you need? <span className="req">*</span></label>
                        <div className="form-chips">
                          {['Website', 'Branding', 'Strategy', 'Marketing', 'App', 'Other'].map((chip) => (
                            <span key={chip} className={`form-chip ${activeChips.includes(chip) ? 'active' : ''}`}
                              onClick={() => toggleChip(chip)}>
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="form-field">
                        <label className="form-label">Message</label>
                        <textarea className="form-input" rows={3} placeholder="Tell us about your project..."
                          style={{ resize: 'none' }}
                          value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                      </div>

                      <button type="submit" className="form-submit" disabled={submitting}>
                        {submitting ? (
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <span style={{ width: 16, height: 16, border: '2px solid rgba(255,107,53,0.3)', borderTopColor: '#ff6b35', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
                            Sending...
                          </span>
                        ) : 'Send Request →'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="form-success show">
                    <div className="form-success-icon">
                      <svg viewBox="0 0 52 52"><path d="M14 27l7.5 7.5L38 18" /></svg>
                    </div>
                    <div className="form-success-title">Request Sent!</div>
                    <p className="form-success-msg">Thanks for reaching out! We&apos;ll get back within 24 hours.</p>
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
            <div className="footer-logo">ABN<span>.</span></div>
            <p className="footer-copy">© {new Date().getFullYear()} ABN Group. All rights reserved.</p>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* ── Fixed CTA ── */}
      <div className="fixed-cta">
        <a href="#contact" className="fixed-cta-btn">
          Get Started ↗
        </a>
      </div>
    </>
  );
}
