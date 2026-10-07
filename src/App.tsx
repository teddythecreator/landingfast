import { useEffect, useRef, useState, useCallback } from 'react';
import { animate, createScope, createTimeline, createSpring } from 'animejs';
import { stagger } from 'animejs/utils';

// ===== SCROLL PROGRESS =====
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} />;
}

// ===== CURTAIN REVEAL =====
function CurtainReveal({ onComplete }: { onComplete: () => void }) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline({
      defaults: { ease: 'inOutQuart' },
    });

    tl.add(textRef.current!, {
      opacity: { to: 1 },
      scale: { from: 0.8, to: 1 },
      duration: 800,
    });

    tl.add(leftRef.current!, {
      translateX: { to: '-100%' },
      duration: 1200,
    }, '+=400');

    tl.add(rightRef.current!, {
      translateX: { to: '100%' },
      duration: 1200,
    }, '<');

    tl.add('.main-content', {
      opacity: { to: 1 },
      duration: 600,
    }, '-=600');

    tl.then(() => onComplete());

    return () => { /* cleanup */ };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div ref={leftRef} className="absolute top-0 left-0 w-1/2 h-full" style={{ background: '#050508' }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>
      <div ref={rightRef} className="absolute top-0 right-0 w-1/2 h-full" style={{ background: '#050508' }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>
      <div ref={textRef} className="absolute inset-0 flex items-center justify-center opacity-0">
        <div className="text-center">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #00f5ff, #a855f7)' }}>
            <span className="text-black font-bold text-xl">N</span>
          </div>
          <div className="font-display text-2xl font-bold tracking-tight">
            NEXUS<span style={{ color: '#00f5ff' }}>AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== NAVIGATION =====
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    animate(navRef.current, {
      opacity: { to: 1 },
      translateY: { to: 0 },
      duration: 1000,
      delay: 2800,
      ease: 'outExpo',
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 opacity-0 -translate-y-4 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00f5ff, #a855f7)' }}>
            <span className="text-black font-bold text-sm">N</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            NEXUS<span style={{ color: '#00f5ff' }}>AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-sm text-white/60 hover:text-white transition-colors line-animate pb-1">Servicios</a>
          <a href="#proceso" className="text-sm text-white/60 hover:text-white transition-colors line-animate pb-1">Proceso</a>
          <a href="#resultados" className="text-sm text-white/60 hover:text-white transition-colors line-animate pb-1">Resultados</a>
          <a href="#contacto" className="magnetic-btn px-5 py-2 rounded-full text-sm font-medium text-white" style={{ background: 'linear-gradient(to right, #06b6d4, #9333ea)' }}>
            Contactar
          </a>
        </div>
      </div>
    </nav>
  );
}

// ===== TEXT SPLIT COMPONENT =====
function SplitText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    
    animate(chars, {
      opacity: { to: 1 },
      translateY: { to: 0 },
      duration: 1200,
      delay: stagger(30, { start: delay }),
      ease: 'outExpo',
    });
  }, [delay]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="char">
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span className="char">&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}

// ===== HERO SECTION =====
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (badgeRef.current) {
      animate(badgeRef.current, {
        opacity: { to: 1 },
        translateY: { to: 0 },
        duration: 1000,
        delay: 3000,
        ease: 'outExpo',
      });
    }

    if (subtitleRef.current) {
      animate(subtitleRef.current, {
        opacity: { to: 1 },
        translateY: { to: 0 },
        duration: 1000,
        delay: 3400,
        ease: 'outExpo',
      });
    }

    if (ctaRef.current) {
      animate(ctaRef.current, {
        opacity: { to: 1 },
        translateY: { to: 0 },
        duration: 1000,
        delay: 3700,
        ease: 'outExpo',
      });
    }

    if (scrollRef.current) {
      animate(scrollRef.current, {
        opacity: { to: 1 },
        duration: 1000,
        delay: 4200,
        ease: 'outExpo',
      });
    }

    // Parallax on scroll
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrolled = window.scrollY;
      const content = sectionRef.current.querySelector('.hero-content') as HTMLElement;
      
      if (content && scrolled < window.innerHeight) {
        const progress = scrolled / window.innerHeight;
        content.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 - progress * 0.15})`;
        content.style.opacity = `${1 - progress * 1.8}`;
        content.style.filter = `blur(${progress * 10}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden noise-texture">
      {/* Background Video */}
      <div className="absolute inset-0" style={{ background: '#050508' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        >
          <source src="https://videos.pexels.com/video-files/27980029/27980029-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(6,182,212,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(147,51,234,0.1) 0%, transparent 50%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%)' }} />
        <div className="absolute inset-0 grid-bg opacity-20" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] animate-glow-pulse" style={{ background: 'rgba(6, 182, 212, 0.06)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] animate-glow-pulse" style={{ background: 'rgba(147, 51, 234, 0.06)', animationDelay: '2s' }} />
        
        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-[1px] animate-[scan-line_8s_linear_infinite]" style={{ background: 'linear-gradient(to right, transparent, rgba(0,245,255,0.1), transparent)' }} />
        </div>
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 text-center px-6 max-w-6xl">
        <div ref={badgeRef} className="mb-8 opacity-0 translate-y-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase" style={{ border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.05)', color: '#00f5ff' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00f5ff' }} />
            El futuro de la inteligencia artificial
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-8">
          <SplitText text="TRANSFORMA" delay={3000} />
          <div className="block bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundImage: 'linear-gradient(to right, #00f5ff, #3b82f6, #9333ea)' }}>
            <SplitText text="TU NEGOCIO" delay={3400} />
          </div>
          <div className="block text-white/80 text-2xl md:text-4xl lg:text-6xl mt-4 font-light tracking-tight">
            <SplitText text="con Inteligencia Artificial" delay={3800} />
          </div>
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 font-light leading-relaxed opacity-0 translate-y-8">
          Soluciones de inteligencia artificial que impulsan el crecimiento exponencial. 
          Automatización, análisis predictivo y generación de contenido a otro nivel.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 translate-y-8">
          <a href="#contacto" className="magnetic-btn px-8 py-4 rounded-full font-medium text-white text-sm tracking-wide hover:shadow-[0_0_40px_rgba(0,245,255,0.3)] transition-shadow" style={{ background: 'linear-gradient(to right, #06b6d4, #9333ea)' }}>
            EMPEZAR AHORA
          </a>
          <a href="#servicios" className="magnetic-btn px-8 py-4 rounded-full font-medium text-white/80 text-sm tracking-wide hover:border-white/40 hover:text-white transition-all border border-white/20">
            EXPLORAR SERVICIOS
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }}>
          <div className="absolute w-full h-4 animate-scroll-indicator" style={{ background: '#00f5ff' }} />
        </div>
      </div>
    </section>
  );
}

// ===== MARQUEE SECTION =====
function MarqueeSection() {
  const words = ['INTELIGENCIA ARTIFICIAL', 'MACHINE LEARNING', 'DEEP LEARNING', 'AUTOMATIZACIÓN', 'NLP', 'VISIÓN COMPUTADORA', 'IA GENERATIVA', 'DATA SCIENCE'];
  const doubledWords = [...words, ...words];

  return (
    <section className="relative py-16 overflow-hidden border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubledWords.map((word, i) => (
          <span key={i} className="font-display text-4xl md:text-6xl font-bold mx-8" style={{ color: 'rgba(255,255,255,0.03)' }}>
            {word} <span style={{ color: 'rgba(0,245,255,0.1)' }}>•</span>
          </span>
        ))}
      </div>
    </section>
  );
}

// ===== VIDEO SECTION =====
function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const content = sectionRef.current.querySelector('.video-content');
    if (!content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(content, {
              opacity: { to: 1 },
              scale: { from: 0.95, to: 1 },
              duration: 1500,
              ease: 'outExpo',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="video-content max-w-7xl mx-auto px-6 opacity-0">
        <div className="relative rounded-2xl overflow-hidden aspect-video" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/28203344/28203344-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />
          <div className="absolute bottom-8 left-8 right-8">
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">
              El poder de la IA en acción
            </h3>
            <p className="text-white/60 text-sm md:text-base">
              Visualización de redes neuronales procesando datos en tiempo real
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== VISION SECTION =====
function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const scope = createScope({ root: sectionRef.current });
    const elements = sectionRef.current.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.delay || '0');
            
            animate(el, {
              opacity: { to: 1 },
              translateY: { to: 0 },
              duration: 1200,
              delay: delay,
              ease: 'outExpo',
            });
            
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      scope.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span data-animate data-delay="0" className="text-xs font-medium tracking-[0.3em] uppercase mb-6 block opacity-0 translate-y-8" style={{ color: '#00f5ff' }}>Nuestra Visión</span>
            <h2 data-animate data-delay="200" className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8 opacity-0 translate-y-8">
              La IA no es el futuro.
              <br />
              <span className="text-white/40">Es el presente.</span>
            </h2>
            <p data-animate data-delay="400" className="text-white/50 text-lg leading-relaxed mb-8 opacity-0 translate-y-8">
              En NEXUS AI, no seguimos tendencias — las creamos. Nuestro equipo de ingenieros, 
              científicos de datos y estrategas construyen soluciones que redefinen lo posible.
            </p>
            <div data-animate data-delay="600" className="flex gap-8 opacity-0 translate-y-8">
              <div>
                <div className="font-display text-3xl font-bold" style={{ color: '#00f5ff' }}>500+</div>
                <div className="text-white/40 text-sm mt-1">Proyectos</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold" style={{ color: '#c084fc' }}>98%</div>
                <div className="text-white/40 text-sm mt-1">Satisfacción</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold" style={{ color: '#f472b6' }}>24/7</div>
                <div className="text-white/40 text-sm mt-1">Soporte</div>
              </div>
            </div>
          </div>
          <div data-animate data-delay="400" className="relative opacity-0 translate-y-8">
            <div className="relative aspect-square rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              >
                <source src="https://videos.pexels.com/video-files/34663579/34663579-hd_1920_1080_25fps.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.15), transparent, rgba(147,51,234,0.15))' }} />
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[60px] animate-glow-pulse" style={{ background: 'rgba(6,182,212,0.2)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== SERVICES SECTION =====
function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    { icon: '🧠', title: 'Automatización Inteligente', description: 'Sistemas que aprenden y se adaptan. Automatiza procesos complejos con IA que entiende tu negocio.' },
    { icon: '📊', title: 'Análisis Predictivo', description: 'Anticipa tendencias, optimiza decisiones y descubre oportunidades ocultas con modelos avanzados.' },
    { icon: '💬', title: 'NLP & Chatbots', description: 'Interfaces conversacionales que entienden contexto, sentimiento e intención.' },
    { icon: '👁️', title: 'Visión por Computadora', description: 'Detección de objetos, reconocimiento facial y análisis de imágenes en tiempo real.' },
    { icon: '⚡', title: 'IA Generativa', description: 'Contenido, código, diseño y más. Potencia tu creatividad con modelos personalizados.' },
    { icon: '🔗', title: 'Integración & APIs', description: 'Conectamos la IA con tus sistemas existentes. APIs robustas, escalables y seguras.' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(cards).indexOf(entry.target as Element);
            
            animate(entry.target as Element, {
              opacity: { to: 1 },
              translateY: { to: 0 },
              scale: { from: 0.9, to: 1 },
              duration: 1000,
              delay: index * 100,
              ease: 'outExpo',
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    // Mouse tracking for cards
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
        const y = ((mouseEvent.clientY - rect.top) / rect.height) * 100;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="relative py-32 md:py-48 px-6">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: 'rgba(147,51,234,0.04)' }} />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: 'rgba(6,182,212,0.04)' }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <span className="text-xs font-medium tracking-[0.3em] uppercase mb-6 block" style={{ color: '#00f5ff' }}>Servicios</span>
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight mb-6">
            Soluciones que
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #00f5ff, #a855f7)' }}>transforman</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Cada servicio está diseñado para generar impacto medible. Sin humo, solo resultados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="service-card relative p-8 rounded-2xl cursor-pointer opacity-0 translate-y-12" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="font-display text-xl font-semibold mb-3 text-white">{service.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#00f5ff' }}>
                <span>Explorar</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== PROCESS SECTION =====
function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    { num: '01', title: 'Descubrimiento', desc: 'Analizamos tu negocio, identificamos oportunidades y definimos objetivos claros.' },
    { num: '02', title: 'Diseño', desc: 'Arquitectamos la solución perfecta, seleccionamos modelos y diseñamos la experiencia.' },
    { num: '03', title: 'Desarrollo', desc: 'Construimos, entrenamos y optimizamos con metodologías ágiles y estándares enterprise.' },
    { num: '04', title: 'Despliegue', desc: 'Integramos en tu stack, monitoreamos rendimiento y escalamos según necesidad.' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(items).indexOf(entry.target as Element);
            
            animate(entry.target as Element, {
              opacity: { to: 1 },
              translateX: { to: 0 },
              duration: 1000,
              delay: index * 150,
              ease: 'outExpo',
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="proceso" className="relative py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-medium tracking-[0.3em] uppercase mb-6 block" style={{ color: '#c084fc' }}>Proceso</span>
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight">
            De la idea al
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #c084fc, #f472b6)' }}>impacto real</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="process-step relative opacity-0 translate-x-12">
              <div className="step-number font-display text-5xl font-bold mb-4" style={{ color: 'rgba(255,255,255,0.05)' }}>
                {step.num}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== RESULTS SECTION =====
function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { value: 10, suffix: 'x', label: 'Más productividad', color: '#00f5ff' },
    { value: 85, suffix: '%', label: 'Reducción de costes', color: '#c084fc' },
    { value: 3, suffix: 'M+', label: 'Datos procesados/día', color: '#f472b6' },
    { value: 50, suffix: 'ms', label: 'Tiempo de respuesta', color: '#4ade80', prefix: '<' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const counters = sectionRef.current.querySelectorAll('.counter-value');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.dataset.target || '0');
            
            const obj = { value: 0 };
            animate(obj, {
              value: target,
              duration: 2000,
              ease: 'outExpo',
              onUpdate: () => {
                el.textContent = Math.round(obj.value).toString();
              },
            });
            
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="resultados" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px]" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.04), rgba(147,51,234,0.04))' }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-4xl md:text-6xl font-bold mb-2 flex items-center justify-center" style={{ color: stat.color }}>
                {stat.prefix && <span>{stat.prefix}</span>}
                <span className="counter-value" data-target={stat.value}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== CTA SECTION =====
function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const content = sectionRef.current.querySelector('.cta-content');
    if (!content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(content, {
              opacity: { to: 1 },
              scale: { from: 0.9, to: 1 },
              duration: 1500,
              ease: 'outExpo',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contacto" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] animate-glow-pulse" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(147,51,234,0.08))' }} />

      <div className="cta-content max-w-4xl mx-auto relative text-center opacity-0">
        <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
          ¿Listo para
          <br />
          <span className="bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundImage: 'linear-gradient(to right, #00f5ff, #a855f7, #ec4899)' }}>
            evolucionar?
          </span>
        </h2>

        <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
          Agenda una consulta gratuita y descubre cómo la IA puede transformar tu negocio en semanas, no en años.
        </p>

        <a href="mailto:hola@nexusai.com" className="magnetic-btn inline-block px-10 py-5 rounded-full font-medium text-white tracking-wide hover:shadow-[0_0_60px_rgba(0,245,255,0.3)] transition-all duration-300 text-sm" style={{ background: 'linear-gradient(to right, #06b6d4, #9333ea)' }}>
          AGENDA TU CONSULTA GRATUITA
        </a>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="relative py-16 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00f5ff, #a855f7)' }}>
            <span className="text-black font-bold text-sm">N</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            NEXUS<span style={{ color: '#00f5ff' }}>AI</span>
          </span>
        </div>
        <p className="text-white/30 text-sm leading-relaxed max-w-sm mb-8">
          Transformando negocios con inteligencia artificial de vanguardia.
        </p>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-white/20 text-xs">© 2026 NEXUS AI. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/20 hover:text-white/60 transition-colors text-sm">Privacidad</a>
            <a href="#" className="text-white/20 hover:text-white/60 transition-colors text-sm">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===== MAIN APP =====
export default function App() {
  const [curtainDone, setCurtainDone] = useState(false);
  const handleCurtainComplete = useCallback(() => setCurtainDone(true), []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#000' }}>
      {!curtainDone && <CurtainReveal onComplete={handleCurtainComplete} />}
      <div className="main-content opacity-0">
        <ScrollProgress />
        <Navigation />
        <HeroSection />
        <MarqueeSection />
        <VisionSection />
        <VideoSection />
        <ServicesSection />
        <ProcessSection />
        <ResultsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
