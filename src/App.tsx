import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <span className="text-black font-bold text-sm">N</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">NEXUS<span className="text-cyan-400">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-sm text-white/60 hover:text-white transition-colors line-animate pb-1">Servicios</a>
          <a href="#proceso" className="text-sm text-white/60 hover:text-white transition-colors line-animate pb-1">Proceso</a>
          <a href="#resultados" className="text-sm text-white/60 hover:text-white transition-colors line-animate pb-1">Resultados</a>
          <a href="#contacto" className="btn-primary px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-sm font-medium text-white">
            Contactar
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dark-900">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://image.qwenlm.ai/generated-images/8b68bb38-cdf1-4950-b73f-c313805369cf/_result.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/5 to-purple-600/5 rounded-full blur-[80px]" />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-scan-line" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              '--tx': `${(Math.random() - 0.5) * 200}px`,
              '--ty': `${(Math.random() - 0.5) * 200}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-medium tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            El futuro de la inteligencia artificial
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-8"
        >
          <span className="block text-white">TRANSFORMA</span>
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
            TU NEGOCIO
          </span>
          <span className="block text-white/80 text-3xl md:text-5xl lg:text-6xl mt-2 font-light tracking-tight">con IA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Soluciones de inteligencia artificial que impulsan el crecimiento exponencial. 
          Automatización, análisis predictivo y generación de contenido a otro nivel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#contacto" className="btn-primary px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-medium text-white text-sm tracking-wide hover:shadow-[0_0_40px_rgba(0,245,255,0.3)] transition-shadow">
            EMPEZAR AHORA
          </a>
          <a href="#servicios" className="px-8 py-4 border border-white/20 rounded-full font-medium text-white/80 text-sm tracking-wide hover:border-white/40 hover:text-white transition-all">
            EXPLORAR SERVICIOS
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div className="absolute top-0 w-full h-4 bg-cyan-400 animate-[scan-line_2s_ease-in-out_infinite]" />
        </div>
      </motion.div>
    </section>
  );
}

// Animated Section Wrapper
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Vision Section
function VisionSection() {
  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-cyan-400 text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Nuestra Visión</span>
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
                  <div className="font-display text-3xl font-bold text-cyan-400">500+</div>
                  <div className="text-white/40 text-sm mt-1">Proyectos completados</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-purple-400">98%</div>
                  <div className="text-white/40 text-sm mt-1">Satisfacción</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-pink-400">24/7</div>
                  <div className="text-white/40 text-sm mt-1">Soporte activo</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-600/10" />
                <div className="absolute inset-0 grid-bg opacity-60" />
                {/* Neural network visualization */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  {/* Nodes */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={80 + (i % 5) * 60 + Math.sin(i) * 20}
                      cy={80 + Math.floor(i / 5) * 80 + Math.cos(i) * 20}
                      r={3 + Math.random() * 3}
                      fill={i % 2 === 0 ? '#00f5ff' : '#a855f7'}
                      opacity={0.6}
                      className="animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                  {/* Connections */}
                  {Array.from({ length: 20 }).map((_, i) => {
                    const x1 = 80 + (i % 5) * 60 + Math.sin(i) * 20;
                    const y1 = 80 + Math.floor(i / 5) * 80 + Math.cos(i) * 20;
                    const x2 = 80 + ((i + 3) % 5) * 60 + Math.sin(i + 3) * 20;
                    const y2 = 80 + Math.floor((i + 3) / 5) * 80 + Math.cos(i + 3) * 20;
                    return (
                      <line
                        key={`line-${i}`}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="url(#lineGrad)"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    );
                  })}
                  <defs>
                    <linearGradient id="lineGrad">
                      <stop offset="0%" stopColor="#00f5ff" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-[60px] animate-glow-pulse" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-cyan-500/20 rounded-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-purple-500/20 rounded-lg" />
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
    {
      icon: '🧠',
      title: 'Automatización Inteligente',
      description: 'Sistemas que aprenden y se adaptan. Automatiza procesos complejos con IA que entiende tu negocio.',
      gradient: 'from-cyan-500/20 to-blue-600/20',
      borderColor: 'hover:border-cyan-500/30',
    },
    {
      icon: '📊',
      title: 'Análisis Predictivo',
      description: 'Anticipa tendencias, optimiza decisiones y descubre oportunidades ocultas con modelos predictivos avanzados.',
      gradient: 'from-purple-500/20 to-pink-600/20',
      borderColor: 'hover:border-purple-500/30',
    },
    {
      icon: '💬',
      title: 'NLP & Chatbots',
      description: 'Interfaces conversacionales que entienden contexto, sentimiento e intención. Atención al cliente redefinida.',
      gradient: 'from-pink-500/20 to-rose-600/20',
      borderColor: 'hover:border-pink-500/30',
    },
    {
      icon: '👁️',
      title: 'Visión por Computadora',
      description: 'Detección de objetos, reconocimiento facial y análisis de imágenes en tiempo real para tu industria.',
      gradient: 'from-green-500/20 to-emerald-600/20',
      borderColor: 'hover:border-green-500/30',
    },
    {
      icon: '⚡',
      title: 'IA Generativa',
      description: 'Contenido, código, diseño y más. Potencia tu creatividad con modelos generativos personalizados.',
      gradient: 'from-yellow-500/20 to-orange-600/20',
      borderColor: 'hover:border-yellow-500/30',
    },
    {
      icon: '🔗',
      title: 'Integración & APIs',
      description: 'Conectamos la IA con tus sistemas existentes. APIs robustas, escalables y seguras.',
      gradient: 'from-indigo-500/20 to-violet-600/20',
      borderColor: 'hover:border-indigo-500/30',
    },
  ];

  return (
    <section id="servicios" className="relative py-32 md:py-48 px-6">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <AnimatedSection className="text-center mb-20">
          <span className="text-cyan-400 text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Servicios</span>
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight mb-6">
            Soluciones que
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">transforman</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Cada servicio está diseñado para generar impacto medible. Sin humo, solo resultados.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={index}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`service-card relative p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm ${service.borderColor} group cursor-pointer`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-white group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explorar</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Full-width cinematic section
function CinematicSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const textX = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const textX2 = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-800 to-black" />
      
      <div className="relative z-10">
        <motion.div style={{ x: textX }} className="whitespace-nowrap mb-4">
          <span className="font-display text-[8vw] font-bold text-white/[0.03] tracking-tighter">
            INTELIGENCIA ARTIFICIAL • MACHINE LEARNING • DEEP LEARNING • AUTOMATIZACIÓN • 
          </span>
        </motion.div>
        <motion.div style={{ x: textX2 }} className="whitespace-nowrap mb-4">
          <span className="font-display text-[8vw] font-bold text-white/[0.03] tracking-tighter">
            NLP • VISIÓN COMPUTADORA • IA GENERATIVA • MODELOS PREDICTIVOS • APIs • 
          </span>
        </motion.div>
        <motion.div style={{ x: textX }} className="whitespace-nowrap">
          <span className="font-display text-[8vw] font-bold text-white/[0.03] tracking-tighter">
            TRANSFORMACIÓN DIGITAL • DATA SCIENCE • NEURAL NETWORKS • INNOVACIÓN • 
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const steps = [
    { num: '01', title: 'Descubrimiento', desc: 'Analizamos tu negocio, identificamos oportunidades y definimos objetivos claros.' },
    { num: '02', title: 'Diseño', desc: 'Arquitectamos la solución perfecta, seleccionamos modelos y diseñamos la experiencia.' },
    { num: '03', title: 'Desarrollo', desc: 'Construimos, entrenamos y optimizamos con metodologías ágiles y estándares enterprise.' },
    { num: '04', title: 'Despliegue', desc: 'Integramos en tu stack, monitoreamos rendimiento y escalamos según necesidad.' },
  ];

  return (
    <section id="proceso" className="relative py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-purple-400 text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Proceso</span>
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight">
            De la idea al
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">impacto real</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={index}>
              <div className="relative group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="font-display text-5xl font-bold text-white/5 mb-4 group-hover:text-cyan-500/20 transition-colors duration-500">
                    {step.num}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Results/Testimonials Section
function ResultsSection() {
  const stats = [
    { value: '10x', label: 'Más productividad', color: 'text-cyan-400' },
    { value: '85%', label: 'Reducción de costes', color: 'text-purple-400' },
    { value: '3M+', label: 'Datos procesados/día', color: 'text-pink-400' },
    { value: '<50ms', label: 'Tiempo de respuesta', color: 'text-green-400' },
  ];

  const testimonials = [
    {
      quote: "NEXUS AI transformó completamente nuestra operación. La automatización inteligente nos ahorró miles de horas al año.",
      author: "María García",
      role: "CTO, TechCorp",
    },
    {
      quote: "El análisis predictivo nos permitió anticipar tendencias del mercado con una precisión increíble. ROI del 400%.",
      author: "Carlos Rodríguez",
      role: "CEO, DataFlow",
    },
    {
      quote: "Su chatbot con NLP maneja el 80% de nuestras consultas sin intervención humana. La satisfacción subió un 60%.",
      author: "Ana Martínez",
      role: "Dir. Operaciones, RetailPro",
    },
  ];

  return (
    <section id="resultados" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/5 to-purple-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Stats */}
        <AnimatedSection className="mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`font-display text-4xl md:text-6xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-pink-400 text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Testimonios</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Lo que dicen
            <br />
            <span className="text-white/40">nuestros clientes</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index}>
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col">
                <div className="text-cyan-400/40 text-4xl mb-4">"</div>
                <p className="text-white/60 text-sm leading-relaxed flex-grow mb-6">{testimonial.quote}</p>
                <div>
                  <div className="text-white font-medium text-sm">{testimonial.author}</div>
                  <div className="text-white/30 text-xs mt-1">{testimonial.role}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section id="contacto" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-full blur-[120px] animate-glow-pulse" />
      </div>

      <div className="max-w-4xl mx-auto relative text-center">
        <AnimatedSection>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-medium tracking-wider uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Disponibles para nuevos proyectos
            </div>
          </div>

          <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
            ¿Listo para
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-shift">
              evolucionar?
            </span>
          </h2>

          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
            Agenda una consulta gratuita y descubre cómo la IA puede transformar tu negocio en semanas, no en años.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hola@nexusai.com" className="btn-primary px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-medium text-white tracking-wide hover:shadow-[0_0_60px_rgba(0,245,255,0.3)] transition-all duration-300 text-sm">
              AGENDA TU CONSULTA GRATUITA
            </a>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/30 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sin compromiso
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Respuesta en 24h
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Propuesta personalizada
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                <span className="text-black font-bold text-sm">N</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight">NEXUS<span className="text-cyan-400">AI</span></span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm">
              Transformando negocios con inteligencia artificial de vanguardia. 
              Del concepto a la producción, sin compromisos.
            </p>
          </div>
          <div>
            <h4 className="text-white/60 font-medium text-sm mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Automatización</a></li>
              <li><a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Análisis Predictivo</a></li>
              <li><a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">NLP & Chatbots</a></li>
              <li><a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Visión por PC</a></li>
              <li><a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">IA Generativa</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/60 font-medium text-sm mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Casos de éxito</a></li>
              <li><a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Blog</a></li>
              <li><a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Carreras</a></li>
              <li><a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">© 2026 NEXUS AI. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/20 hover:text-white/60 transition-colors text-sm">Privacidad</a>
            <a href="#" className="text-white/20 hover:text-white/60 transition-colors text-sm">Términos</a>
            <a href="#" className="text-white/20 hover:text-white/60 transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden noise-overlay">
      <Navigation />
      <HeroSection />
      <VisionSection />
      <CinematicSection />
      <ServicesSection />
      <ProcessSection />
      <ResultsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
