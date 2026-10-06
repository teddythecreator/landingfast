import { useEffect, useRef, useState } from 'react';

// Simple scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
          <a href="#servicios" className="text-sm text-white/60 hover:text-white transition-colors">Servicios</a>
          <a href="#proceso" className="text-sm text-white/60 hover:text-white transition-colors">Proceso</a>
          <a href="#resultados" className="text-sm text-white/60 hover:text-white transition-colors">Resultados</a>
          <a href="#contacto" className="px-5 py-2 rounded-full text-sm font-medium text-white" style={{ background: 'linear-gradient(to right, #06b6d4, #9333ea)' }}>
            Contactar
          </a>
        </div>
      </div>
    </nav>
  );
}

// Animated Section Wrapper
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} ${className}`}
    >
      {children}
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0" style={{ background: '#0a0a0f' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(147,51,234,0.15) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-glow-pulse" style={{ background: 'rgba(6, 182, 212, 0.1)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] animate-glow-pulse" style={{ background: 'rgba(147, 51, 234, 0.1)', animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl">
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase" style={{ border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.05)', color: '#00f5ff' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00f5ff' }} />
            El futuro de la inteligencia artificial
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <span className="block text-white">TRANSFORMA</span>
          <span className="block bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundImage: 'linear-gradient(to right, #00f5ff, #3b82f6, #9333ea)' }}>
            TU NEGOCIO
          </span>
          <span className="block text-white/80 text-3xl md:text-5xl lg:text-6xl mt-2 font-light tracking-tight">con IA</span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in" style={{ animationDelay: '1.1s' }}>
          Soluciones de inteligencia artificial que impulsan el crecimiento exponencial. 
          Automatización, análisis predictivo y generación de contenido a otro nivel.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <a href="#contacto" className="px-8 py-4 rounded-full font-medium text-white text-sm tracking-wide hover:shadow-[0_0_40px_rgba(0,245,255,0.3)] transition-shadow" style={{ background: 'linear-gradient(to right, #06b6d4, #9333ea)' }}>
            EMPEZAR AHORA
          </a>
          <a href="#servicios" className="px-8 py-4 rounded-full font-medium text-white/80 text-sm tracking-wide hover:border-white/40 hover:text-white transition-all border border-white/20">
            EXPLORAR SERVICIOS
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '2s' }}>
        <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}>
          <div className="absolute w-full h-4 animate-scroll-down" style={{ background: '#00f5ff' }} />
        </div>
      </div>
    </section>
  );
}

// Vision Section
function VisionSection() {
  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-medium tracking-[0.3em] uppercase mb-6 block" style={{ color: '#00f5ff' }}>Nuestra Visión</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
                La IA no es el futuro.
                <br />
                <span className="text-white/40">Es el presente.</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                En NEXUS AI, no seguimos tendencias — las creamos. Nuestro equipo de ingenieros, 
                científicos de datos y estrategas construyen soluciones que redefinen lo posible.
              </p>
              <div className="flex gap-8">
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
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), transparent, rgba(147,51,234,0.1))' }} />
                <div className="absolute inset-0 grid-bg opacity-60" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={100 + (i % 4) * 70}
                      cy={100 + Math.floor(i / 4) * 100}
                      r={4}
                      fill={i % 2 === 0 ? '#00f5ff' : '#a855f7'}
                      opacity={0.6}
                    />
                  ))}
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[60px] animate-glow-pulse" style={{ background: 'rgba(6,182,212,0.2)' }} />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    { icon: '🧠', title: 'Automatización Inteligente', description: 'Sistemas que aprenden y se adaptan. Automatiza procesos complejos con IA.' },
    { icon: '📊', title: 'Análisis Predictivo', description: 'Anticipa tendencias y optimiza decisiones con modelos predictivos avanzados.' },
    { icon: '💬', title: 'NLP & Chatbots', description: 'Interfaces conversacionales que entienden contexto y sentimiento.' },
    { icon: '👁️', title: 'Visión por Computadora', description: 'Detección de objetos y análisis de imágenes en tiempo real.' },
    { icon: '⚡', title: 'IA Generativa', description: 'Contenido, código y diseño con modelos generativos personalizados.' },
    { icon: '🔗', title: 'Integración & APIs', description: 'Conectamos la IA con tus sistemas existentes de forma segura.' },
  ];

  return (
    <section id="servicios" className="relative py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto relative">
        <AnimatedSection className="text-center mb-20">
          <span className="text-xs font-medium tracking-[0.3em] uppercase mb-6 block" style={{ color: '#00f5ff' }}>Servicios</span>
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight mb-6">
            Soluciones que
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #00f5ff, #a855f7)' }}>transforman</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Cada servicio está diseñado para generar impacto medible. Sin humo, solo resultados.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={index}>
              <div className="service-card relative p-8 rounded-2xl group cursor-pointer" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="font-display text-xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const steps = [
    { num: '01', title: 'Descubrimiento', desc: 'Analizamos tu negocio y definimos objetivos claros.' },
    { num: '02', title: 'Diseño', desc: 'Arquitectamos la solución perfecta para ti.' },
    { num: '03', title: 'Desarrollo', desc: 'Construimos con metodologías ágiles y estándares enterprise.' },
    { num: '04', title: 'Despliegue', desc: 'Integramos, monitoreamos y escalamos según necesidad.' },
  ];

  return (
    <section id="proceso" className="relative py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-xs font-medium tracking-[0.3em] uppercase mb-6 block" style={{ color: '#c084fc' }}>Proceso</span>
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight">
            De la idea al
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #c084fc, #f472b6)' }}>impacto real</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={index}>
              <div className="relative group">
                <div className="font-display text-5xl font-bold mb-4" style={{ color: 'rgba(255,255,255,0.05)' }}>
                  {step.num}
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Results Section
function ResultsSection() {
  const stats = [
    { value: '10x', label: 'Más productividad', color: '#00f5ff' },
    { value: '85%', label: 'Reducción de costes', color: '#c084fc' },
    { value: '3M+', label: 'Datos procesados/día', color: '#f472b6' },
    { value: '<50ms', label: 'Tiempo de respuesta', color: '#4ade80' },
  ];

  return (
    <section id="resultados" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-4xl md:text-6xl font-bold mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section id="contacto" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(147,51,234,0.1))' }} />

      <div className="max-w-4xl mx-auto relative text-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
            ¿Listo para
            <br />
            <span className="bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundImage: 'linear-gradient(to right, #00f5ff, #a855f7, #ec4899)' }}>
              evolucionar?
            </span>
          </h2>

          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
            Agenda una consulta gratuita y descubre cómo la IA puede transformar tu negocio.
          </p>

          <a href="mailto:hola@nexusai.com" className="inline-block px-10 py-5 rounded-full font-medium text-white tracking-wide hover:shadow-[0_0_60px_rgba(0,245,255,0.3)] transition-all duration-300 text-sm" style={{ background: 'linear-gradient(to right, #06b6d4, #9333ea)' }}>
            AGENDA TU CONSULTA GRATUITA
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer
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

// Main App
export default function App() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#000' }}>
      <Navigation />
      <HeroSection />
      <VisionSection />
      <ServicesSection />
      <ProcessSection />
      <ResultsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
