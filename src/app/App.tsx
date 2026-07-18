import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  MapPin,
  Shield,
  Route,
  Bell,
  ShoppingBag,
  Mail,
  MessageCircle,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
  ChevronRight,
  Smartphone,
  Package,
  Wifi,
  CheckCircle2,
  Map,
  AlertTriangle,
  BookmarkCheck,
  QrCode,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/image-1.png";
import poloImg from "@/imports/image-3.png";
import keyringImg from "@/imports/image-4.png";
import collarImg    from "@/imports/image-6.png";
import charm7Img    from "@/imports/image-7.png";
import charm8Img    from "@/imports/image-8.png";
import charm9Img    from "@/imports/image-9.png";
import charm10Img   from "@/imports/image-10.png";
import charm11Img   from "@/imports/image-11.png";
import charm12Img   from "@/imports/image-12.png";
// Pre-composed collar+charm photos — one per accessory
import collar16Img from "@/imports/image-16.png";
import collar17Img from "@/imports/image-17.png";
import collar18Img from "@/imports/image-18.png";
import collar19Img from "@/imports/image-19.png";
import collar20Img from "@/imports/image-20.png";
import collar21Img from "@/imports/image-21.png";

const NAV_LINKS = [
  { label: "Inicio",        href: "#inicio"       },
  { label: "Cómo funciona", href: "#como-funciona"},
  { label: "Funciones",     href: "#funciones"    },
  { label: "Contacto",      href: "#contacto"     },
  { label: "Merch",         href: "#merch"        },
  { label: "Diseña el tuyo",href: "#disenael"     },
];

const FEATURES = [
  {
    icon: MapPin,
    title: "Localización GPS en tiempo real",
    desc: "Permite conocer la ubicación actual de la mascota en cualquier momento desde la plataforma.",
    color: "#11A9C8",
    bg: "#11A9C8",
  },
  {
    icon: Map,
    title: "Mapa interactivo",
    desc: "Visualiza la ubicación de la mascota en un mapa con una interfaz clara e intuitiva.",
    color: "#123A7A",
    bg: "#123A7A",
  },
  {
    icon: AlertTriangle,
    title: "Alertas de zona segura (Geocerca)",
    desc: "Recibe una notificación automática cuando la mascota salga del área segura previamente configurada.",
    color: "#67B83D",
    bg: "#67B83D",
  },
  {
    icon: BookmarkCheck,
    title: "Última ubicación registrada",
    desc: "Guarda la última posición conocida de la mascota en caso de pérdida de señal o batería del collar.",
    color: "#11A9C8",
    bg: "#11A9C8",
  },
  {
    icon: QrCode,
    title: "Código QR Inteligente",
    desc: "El collar incorpora un código QR que cualquier persona puede escanear para acceder a la información autorizada de la mascota y contactar al propietario de forma rápida y segura.",
    color: "#123A7A",
    bg: "#123A7A",
  },
];

const STEPS = [
  {
    icon: ShoppingBag,
    num: "01",
    title: "Compra el collar",
    desc: "Adquiere el collar SmartPets Guardian en nuestra tienda oficial.",
  },
  {
    icon: Package,
    num: "02",
    title: "Colócalo en tu mascota",
    desc: "Ajusta el collar cómodamente al cuello de tu mascota.",
  },
  {
    icon: Wifi,
    num: "03",
    title: "Conecta el dispositivo",
    desc: "Vincula el collar desde la aplicación SmartPets Guardian en minutos.",
  },
  {
    icon: Smartphone,
    num: "04",
    title: "Monitorea y protege",
    desc: "Visualiza la ubicación en tiempo real y recibe alertas inteligentes.",
  },
];

function useScrollSpy() {
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const handler = () => {
      const scrollY = window.scrollY + 120;
      // Sort by actual DOM position so order matches page, not nav array
      const sorted = ids
        .map((id) => ({ id, top: document.getElementById(id)?.offsetTop ?? 0 }))
        .sort((a, b) => a.top - b.top);
      let current = sorted[0].id;
      for (const { id, top } of sorted) {
        if (top <= scrollY) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      } border-b border-[rgba(18,58,122,0.07)]`}
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-28 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("#inicio")}
          className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          <ImageWithFallback
            src={logoImg}
            alt="SmartPets Guardian"
            className="h-24 w-auto object-contain drop-shadow-md"
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === id
                    ? "bg-[#123A7A] text-white shadow-sm"
                    : "text-[#0d1f3c] hover:bg-[#11A9C8]/10 hover:text-[#11A9C8]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl text-[#123A7A] hover:bg-[#F4F8FF] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[rgba(18,58,122,0.1)] px-5 py-5 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left px-4 py-3 rounded-xl text-sm font-semibold text-[#0d1f3c] hover:bg-[#F4F8FF] hover:text-[#11A9C8] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function PhoneMockup() {
  return (
    <div
      className="relative w-[140px] h-[260px] rounded-[28px] shadow-2xl overflow-hidden flex-shrink-0"
      style={{ border: "3px solid #e2e8f0", background: "#fff" }}
    >
      {/* Status bar */}
      <div className="h-7 bg-[#123A7A] flex items-center justify-between px-4">
        <span className="text-white text-[8px] font-bold">9:41</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-white/80" />
          <div className="w-1 h-1 rounded-full bg-white/80" />
          <div className="w-1 h-1 rounded-full bg-white/80" />
        </div>
      </div>
      {/* App header */}
      <div className="bg-[#11A9C8] h-8 flex items-center px-3 gap-1">
        <MapPin size={10} className="text-white" />
        <span className="text-white text-[8px] font-bold">SmartPets</span>
      </div>
      {/* Map area */}
      <div className="relative flex-1 h-[140px] overflow-hidden" style={{ background: "#e8f4e8" }}>
        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute left-0 right-0 border-t border-[#c8dfc8]/60" style={{ top: `${i * 33}%` }} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute top-0 bottom-0 border-l border-[#c8dfc8]/60" style={{ left: `${i * 33}%` }} />
        ))}
        {/* Road */}
        <div className="absolute" style={{ top: "40%", left: "10%", width: "80%", height: "5px", background: "#fff", borderRadius: "3px" }} />
        <div className="absolute" style={{ top: "20%", left: "55%", width: "5px", height: "70%", background: "#fff", borderRadius: "3px" }} />
        {/* Route path */}
        <svg className="absolute inset-0 w-full h-full">
          <polyline points="20,100 60,70 90,80 110,50 125,60" fill="none" stroke="#11A9C8" strokeWidth="2.5" strokeDasharray="4,2" strokeLinecap="round" />
        </svg>
        {/* Pet location pin */}
        <div className="absolute" style={{ top: "28%", left: "68%" }}>
          <div className="w-6 h-6 rounded-full bg-[#11A9C8] flex items-center justify-center shadow-md">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div className="w-0 h-0 mx-auto" style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "6px solid #11A9C8" }} />
        </div>
        {/* Pulse ring */}
        <div className="absolute" style={{ top: "22%", left: "62%", width: "30px", height: "30px", borderRadius: "50%", border: "2px solid #11A9C8", opacity: 0.3 }} />
      </div>
      {/* Bottom card */}
      <div className="bg-white px-3 py-2 border-t border-gray-100">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-5 h-5 rounded-full bg-[#67B83D]/20 flex items-center justify-center">
            <CheckCircle2 size={10} className="text-[#67B83D]" />
          </div>
          <span className="text-[8px] font-bold text-[#0d1f3c]">Max — En zona segura</span>
        </div>
        <div className="text-[7px] text-[#5a6e8a]">Última actualización: hace 2 min</div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100vh] flex items-center overflow-hidden pt-28"
      style={{ fontFamily: "Manrope, sans-serif", background: "linear-gradient(135deg, #F4F8FF 0%, #EAF4FB 60%, #EDF7F0 100%)" }}
    >
      {/* Decorative curves */}
      <svg className="absolute right-0 top-0 w-[55%] h-full opacity-40 pointer-events-none" viewBox="0 0 600 700" fill="none" preserveAspectRatio="xMaxYMid slice">
        <ellipse cx="500" cy="350" rx="420" ry="380" fill="url(#heroGrad)" />
        <defs>
          <radialGradient id="heroGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#11A9C8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#67B83D" stopOpacity="0.06" />
          </radialGradient>
        </defs>
      </svg>

      {/* Paw prints */}
      {[
        { top: "15%", left: "5%", size: 22, rotate: -20, opacity: 0.07 },
        { top: "72%", left: "2%", size: 16, rotate: 30, opacity: 0.06 },
        { top: "85%", left: "45%", size: 20, rotate: -10, opacity: 0.07 },
        { top: "10%", right: "12%", size: 18, rotate: 15, opacity: 0.07 },
        { top: "55%", right: "5%", size: 14, rotate: -25, opacity: 0.06 },
      ].map((p, i) => (
        <svg
          key={i}
          className="absolute pointer-events-none"
          style={{ top: p.top, left: (p as any).left, right: (p as any).right, opacity: p.opacity, transform: `rotate(${p.rotate}deg)` }}
          width={p.size}
          height={p.size}
          viewBox="0 0 24 24"
          fill="#123A7A"
        >
          <ellipse cx="6" cy="4" rx="2" ry="2.5" />
          <ellipse cx="12" cy="2.5" rx="2" ry="2.5" />
          <ellipse cx="18" cy="4" rx="2" ry="2.5" />
          <ellipse cx="3.5" cy="9" rx="1.5" ry="2" />
          <path d="M12 22c-4 0-8-3-8-7 0-2.5 2-4.5 4-5.5 1.5-.7 3-.5 4 .5 1-1 2.5-1.2 4-.5 2 1 4 3 4 5.5 0 4-4 7-8 7z" />
        </svg>
      ))}

      <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center py-20">
        {/* Left content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#123A7A]/8 border border-[#123A7A]/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#67B83D] animate-pulse" />
            <span className="text-xs font-semibold text-[#123A7A]">Tecnología GPS para mascotas</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d1f3c] leading-[1.08] tracking-tight mb-6"
          >
            Conecta.{" "}
            <span className="text-[#11A9C8]">Localiza.</span>{" "}
            <span style={{ color: "#67B83D" }}>Protege.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#5a6e8a] leading-relaxed mb-8 max-w-[480px]"
          >
            Mantén a tu mascota siempre protegida con un collar GPS inteligente que permite conocer su ubicación en tiempo real, crear zonas seguras y recibir alertas instantáneas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <button
              onClick={() => document.getElementById("funciones")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-[#11A9C8] text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:bg-[#0e94b0] hover:shadow-[#11A9C8]/30 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Conoce más
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white text-[#123A7A] font-bold px-7 py-3.5 rounded-full border border-[#123A7A]/20 hover:border-[#123A7A]/40 hover:bg-[#F4F8FF] transition-all duration-200 hover:-translate-y-0.5"
            >
              Cómo funciona
            </button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: MapPin, label: "GPS en tiempo real", color: "#11A9C8" },
              { icon: Shield, label: "Zona segura", color: "#67B83D" },
              { icon: Route, label: "Historial de rutas", color: "#123A7A" },
              { icon: Bell, label: "Alertas inteligentes", color: "#11A9C8" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white shadow-sm"
              >
                <item.icon size={13} style={{ color: item.color }} />
                <span className="text-[11px] font-semibold text-[#0d1f3c]">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right side — dog + phone mockup */}
        <div className="relative flex items-center justify-center lg:justify-end">
          {/* Background blob */}
          <div
            className="absolute inset-0 rounded-[40%_60%_60%_40%/40%_40%_60%_60%]"
            style={{ background: "linear-gradient(135deg, #11A9C8 0%, #67B83D 100%)", opacity: 0.12, transform: "scale(1.1)" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-end gap-4"
          >
            {/* Dog image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=460&h=500&fit=crop&auto=format"
                alt="Golden retriever con collar GPS SmartPets Guardian"
                className="w-[280px] sm:w-[340px] lg:w-[380px] h-[340px] sm:h-[400px] lg:h-[440px] object-cover rounded-3xl shadow-2xl"
                style={{ objectPosition: "top center" }}
              />
              {/* Collar badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl flex items-center gap-2 whitespace-nowrap">
                <div className="w-7 h-7 rounded-xl bg-[#11A9C8] flex items-center justify-center">
                  <MapPin size={14} className="text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-[#5a6e8a] font-medium">Max está en</div>
                  <div className="text-xs font-bold text-[#0d1f3c]">Zona Segura ✓</div>
                </div>
              </div>
            </div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-12"
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const top3 = FEATURES.slice(0, 3);
  const bottom2 = FEATURES.slice(3);

  return (
    <section id="funciones" className="py-24 bg-white" style={{ fontFamily: "Manrope, sans-serif" }}>
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-6">
          <span className="text-xs font-bold tracking-widest text-[#11A9C8] uppercase">Funciones principales</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1f3c] mt-3 mb-4">
            Todo lo que necesitas para{" "}
            <span className="text-[#123A7A]">proteger</span> a tu mascota
          </h2>
        </FadeIn>

        {/* Intro text */}
        <FadeIn delay={0.05}>
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-[#5a6e8a] text-base leading-relaxed">
              Descubre las principales funciones del collar SmartPet, diseñado para{" "}
              <span className="font-semibold text-[#11A9C8]">conectar</span>,{" "}
              <span className="font-semibold text-[#123A7A]">localizar</span> y{" "}
              <span className="font-semibold text-[#67B83D]">proteger</span> a tu mascota en todo momento.
            </p>
          </div>
        </FadeIn>

        {/* Row 1 — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {top3.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <FeatureCard feature={f} />
            </FadeIn>
          ))}
        </div>

        {/* Row 2 — 2 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3 lg:mx-auto">
          {bottom2.map((f, i) => (
            <FadeIn key={f.title} delay={(i + 3) * 0.08}>
              <FeatureCard feature={f} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature: f }: { feature: typeof FEATURES[0] }) {
  return (
    <div className="group bg-white rounded-2xl p-6 border border-[rgba(18,58,122,0.09)] shadow-sm hover:shadow-xl hover:shadow-[rgba(18,58,122,0.08)] hover:-translate-y-1 hover:border-transparent transition-all duration-300 h-full flex flex-col">
      {/* Icon */}
      <div
        className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
        style={{ background: `${f.bg}12`, width: "52px", height: "52px" }}
      >
        <f.icon size={24} style={{ color: f.color }} strokeWidth={1.6} />
      </div>
      {/* Colored top accent bar */}
      <div className="w-8 h-0.5 rounded-full mb-3" style={{ background: f.color }} />
      <h3 className="font-extrabold text-[#0d1f3c] mb-2 text-[15px] leading-snug">{f.title}</h3>
      <p className="text-sm text-[#5a6e8a] leading-relaxed flex-1">{f.desc}</p>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24" style={{ fontFamily: "Manrope, sans-serif", background: "linear-gradient(135deg, #F4F8FF 0%, #EAF4FB 100%)" }}>
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#67B83D] uppercase">Proceso simple</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1f3c] mt-3 mb-4">Cómo funciona SmartPets Guardian</h2>
          <p className="text-[#5a6e8a] max-w-xl mx-auto">En cuatro pasos sencillos tu mascota estará completamente protegida y monitoreada.</p>
        </FadeIn>

        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#11A9C8] via-[#67B83D] to-[#123A7A]" style={{ zIndex: 0 }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  <div className="relative mb-6">
                    {/* Outer ring */}
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, #11A9C8, #123A7A)", padding: "2px" }}
                    >
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <step.icon size={28} className="text-[#11A9C8]" />
                      </div>
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#123A7A] text-white text-[10px] font-extrabold flex items-center justify-center shadow">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="font-extrabold text-[#0d1f3c] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#5a6e8a] leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn className="text-center mt-14">
          <button
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-[#123A7A] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-[#0d2d5e] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Quiero mi SmartPets Guardian
            <ChevronRight size={18} />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

function KeyringDisplay() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#eaf4fb] to-[#edf7f0]">
      <ImageWithFallback
        src={keyringImg}
        alt="Llavero oficial SmartPets Guardian con logo bordado en relieve"
        className="h-56 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
      />
    </div>
  );
}

function MerchSection() {
  return (
    <section id="merch" className="py-24 bg-white" style={{ fontFamily: "Manrope, sans-serif" }}>
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <FadeIn className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest text-[#11A9C8] uppercase">Colección oficial</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1f3c] mt-3 mb-4">Merch Oficial SmartPets Guardian</h2>
          <p className="text-[#5a6e8a] max-w-xl mx-auto">Luce la marca que protege a tu mejor amigo. Prendas de alta calidad con el diseño oficial de SmartPets Guardian.</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Polo card */}
          <FadeIn delay={0} className="h-full">
            <div className="group h-full bg-[#F4F8FF] rounded-3xl overflow-hidden border border-[rgba(18,58,122,0.08)] hover:border-[#11A9C8]/30 hover:shadow-2xl hover:shadow-[#11A9C8]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="relative h-64 bg-gradient-to-br from-[#f0f6ff] to-[#e8f4fb] flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src={poloImg}
                  alt="Polo oficial SmartPets Guardian — blanco con logo bordado"
                  className="h-64 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold bg-[#11A9C8]/10 text-[#11A9C8] px-3 py-1 rounded-full">Edición 2026</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0d1f3c] mb-2">Polo Oficial SmartPets Guardian</h3>
                <p className="text-sm text-[#5a6e8a] leading-relaxed mb-6 flex-1">
                  Polo de algodón premium con el logo oficial de SmartPets Guardian. Diseño exclusivo disponible en todas las tallas. Calidad garantizada.
                </p>
                <button className="w-full bg-[#11A9C8] text-white font-bold py-3.5 rounded-xl hover:bg-[#0e94b0] hover:shadow-lg hover:shadow-[#11A9C8]/20 transition-all duration-200 flex items-center justify-center gap-2">
                  <ShoppingBag size={17} />
                  Ver diseño
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Keyring card */}
          <FadeIn delay={0.1} className="h-full">
            <div className="group h-full bg-[#F4F8FF] rounded-3xl overflow-hidden border border-[rgba(18,58,122,0.08)] hover:border-[#67B83D]/30 hover:shadow-2xl hover:shadow-[#67B83D]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <KeyringDisplay />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold bg-[#67B83D]/10 text-[#67B83D] px-3 py-1 rounded-full">Edición 2026</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0d1f3c] mb-2">Llavero Oficial SmartPets Guardian</h3>
                <p className="text-sm text-[#5a6e8a] leading-relaxed mb-6 flex-1">
                  Llavero de goma premium con el logo SmartPets Guardian en relieve. Diseño exclusivo con los colores oficiales de la marca. El accesorio perfecto para los amantes de sus mascotas.
                </p>
                <button className="w-full bg-[#67B83D] text-white font-bold py-3.5 rounded-xl hover:bg-[#5aa332] hover:shadow-lg hover:shadow-[#67B83D]/20 transition-all duration-200 flex items-center justify-center gap-2">
                  <ShoppingBag size={17} />
                  Ver diseño
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Collar Customizer ────────────────────────────────────────────────────────

// HSL utilities for per-pixel strap color replacement
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360 / 360;
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    t = ((t % 1) + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)];
}

// Hook: canvas pixel-swap on any collar source — only touches purple strap pixels
function useColorizedCollar(src: string, hue: number | null, isBlack: boolean) {
  const [url, setUrl] = useState<string>(src);
  useEffect(() => {
    if (hue === null && !isBlack) { setUrl(src); return; }
    const img = new Image();
    img.onload = () => {
      const cvs = document.createElement("canvas");
      cvs.width = img.naturalWidth; cvs.height = img.naturalHeight;
      const ctx = cvs.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const id = ctx.getImageData(0, 0, cvs.width, cvs.height);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] < 10) continue;
        const [h, s, l] = rgbToHsl(d[i] / 255, d[i + 1] / 255, d[i + 2] / 255);
        if (h >= 240 && h <= 305 && s > 0.22 && l > 0.08 && l < 0.88) {
          const [nr, ng, nb] = isBlack
            ? hslToRgb(0, 0.03, Math.max(l * 0.20, 0.04))
            : hslToRgb(hue!, Math.min(s * 1.08, 1), l);
          d[i] = nr * 255 | 0; d[i + 1] = ng * 255 | 0; d[i + 2] = nb * 255 | 0;
        }
      }
      ctx.putImageData(id, 0, 0);
      setUrl(cvs.toDataURL("image/jpeg", 0.92));
    };
    img.src = src;
  }, [src, hue, isBlack]);
  return url;
}

const COLLAR_COLORS = [
  { name: "Morado",  hex: "#7B4DFF", hue: null as null, isBlack: false },
  { name: "Negro",   hex: "#1e1e1e", hue: null as null, isBlack: true  },
  { name: "Azul",    hex: "#1A6FD4", hue: 210,          isBlack: false },
  { name: "Verde",   hex: "#2DAF6C", hue: 135,          isBlack: false },
  { name: "Rojo",    hex: "#E53935", hue: 5,            isBlack: false },
  { name: "Rosa",    hex: "#E91E8C", hue: 330,          isBlack: false },
  { name: "Naranja", hex: "#FF6D00", hue: 28,           isBlack: false },
];

const BASE_PRICE = 50;
const PREMIUM_EXTRA = 8;

// ── Real charm image registry — all charms are premium (+S/8) ─────────────────
const CHARMS = [
  { id: "estrella", label: "Estrella", img: charm7Img  },
  { id: "hueso",    label: "Hueso",    img: charm8Img  },
  { id: "corona",   label: "Corona",   img: charm9Img  },
  { id: "corazon",  label: "Corazón",  img: charm10Img },
  { id: "tiara",    label: "Tiara",    img: charm11Img },
  { id: "lazo",     label: "Lazo",     img: charm12Img },
] as const;
type Charm = typeof CHARMS[number];

// Maps each charm id to its pre-composed collar photo
const CHARM_COLLAR: Record<string, string> = {
  estrella: collar16Img as string,
  hueso:    collar17Img as string,
  corona:   collar18Img as string,
  corazon:  collar19Img as string,
  tiara:    collar20Img as string,
  lazo:     collar21Img as string,
};

function CustomizerSection() {
  const [selectedColor, setSelectedColor] = useState(COLLAR_COLORS[0]);
  const [selectedCharm, setSelectedCharm] = useState<Charm | null>(null);
  const [added, setAdded] = useState(false);

  // Use pre-composed collar image when charm selected, base image otherwise
  const collarBase = selectedCharm ? CHARM_COLLAR[selectedCharm.id] : (collarImg as string);
  const collarUrl = useColorizedCollar(collarBase, selectedColor.hue, selectedColor.isBlack);
  const total = BASE_PRICE + (selectedCharm ? PREMIUM_EXTRA : 0);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2800);
  };

  return (
    <section id="disenael" className="py-24 bg-white" style={{ fontFamily: "Manrope, sans-serif" }}>
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <FadeIn className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest text-[#11A9C8] uppercase">Personalización</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1f3c] mt-3 mb-4">
            Diseña el <span className="text-[#123A7A]">tuyo</span>
          </h2>
          <p className="text-[#5a6e8a] max-w-xl mx-auto">
            Elige el color y los accesorios que mejor representen a tu mascota.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* ── Left column ─────────────────────────────────────────── */}
          <FadeIn className="flex flex-col gap-6">

            {/* Color picker */}
            <div className="bg-[#F4F8FF] rounded-2xl p-6 border border-[rgba(18,58,122,0.08)]">
              <h3 className="font-extrabold text-[#0d1f3c] mb-1 text-[15px]">Color del collar</h3>
              <p className="text-xs text-[#5a6e8a] mb-5">
                El cambio de color afecta únicamente la correa. El GPS, hebillas y accesorios mantienen su apariencia original.
              </p>
              <div className="flex flex-wrap gap-4">
                {COLLAR_COLORS.map((c) => {
                  const active = selectedColor.name === c.name;
                  return (
                    <button key={c.name} title={c.name} onClick={() => setSelectedColor(c)}
                      className="flex flex-col items-center gap-1.5 group">
                      <span className="w-10 h-10 rounded-full block transition-all duration-200"
                        style={{
                          background: c.hex,
                          boxShadow: active ? `0 0 0 3px white, 0 0 0 5px ${c.hex}` : "0 2px 8px rgba(0,0,0,0.18)",
                          transform: active ? "scale(1.18)" : "scale(1)",
                        }} />
                      <span className={`text-[9px] font-bold transition-colors ${active ? "text-[#0d1f3c]" : "text-[#9aa5b4] group-hover:text-[#5a6e8a]"}`}>
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Charm picker — all premium */}
            <div className="bg-[#F4F8FF] rounded-2xl p-6 border border-[rgba(18,58,122,0.08)]">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-extrabold text-[#0d1f3c] text-[15px]">Añade un dije</h3>
                <span className="text-[10px] font-extrabold bg-[#123A7A] text-white px-2.5 py-1 rounded-full">
                  + S/8 c/u
                </span>
              </div>
              <p className="text-xs text-[#5a6e8a] mb-5">
                Accesorios metálicos reales. Se colocan en la argolla de identificación del collar.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {CHARMS.map((c) => {
                  const active = selectedCharm?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCharm(active ? null : c)}
                      className={`relative flex flex-col items-center gap-2 pt-3 pb-3 px-2 rounded-xl border-2 transition-all duration-200 ${
                        active
                          ? "border-[#123A7A] bg-[#eef2fa] shadow-lg shadow-[#123A7A]/10 scale-[1.04]"
                          : "border-[rgba(18,58,122,0.1)] bg-white hover:border-[#11A9C8]/50 hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      {/* Selected checkmark */}
                      {active && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#123A7A] flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}
                      {/* Charm photo — full image, properly contained */}
                      <div className="w-full h-16 flex items-center justify-center rounded-lg overflow-hidden bg-[#f8f9fc]">
                        <img
                          src={c.img as string}
                          alt={c.label}
                          className="w-full h-full object-contain p-1"
                          draggable={false}
                        />
                      </div>
                      <span className={`text-[10px] font-bold leading-none mt-0.5 ${active ? "text-[#123A7A]" : "text-[#5a6e8a]"}`}>
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {selectedCharm && (
                <button
                  onClick={() => setSelectedCharm(null)}
                  className="mt-3 w-full text-[11px] font-semibold text-[#5a6e8a] hover:text-[#0d1f3c] transition-colors py-2"
                >
                  × Quitar dije
                </button>
              )}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 border border-[rgba(18,58,122,0.12)] shadow-sm">
              <h3 className="font-extrabold text-[#0d1f3c] mb-4 text-[15px] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-white shadow" style={{ background: selectedColor.hex }} />
                Tu diseño
              </h3>
              <div className="flex flex-col gap-2.5 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-[#5a6e8a]">Color</span>
                  <span className="font-bold text-[#0d1f3c]">{selectedColor.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#5a6e8a]">Dije</span>
                  <span className="font-bold text-[#0d1f3c]">
                    {selectedCharm ? selectedCharm.label : "Sin dije"}
                  </span>
                </div>
                <div className="h-px bg-[rgba(18,58,122,0.08)] my-1" />
                <div className="flex justify-between">
                  <span className="text-[#5a6e8a]">Precio del collar</span>
                  <span className="font-semibold text-[#0d1f3c]">S/ {BASE_PRICE}.00</span>
                </div>
                {selectedCharm && (
                  <div className="flex justify-between">
                    <span className="text-[#5a6e8a]">Dije — {selectedCharm.label}</span>
                    <span className="font-semibold text-[#123A7A]">+ S/ {PREMIUM_EXTRA}.00</span>
                  </div>
                )}
                <div className="h-px bg-[rgba(18,58,122,0.08)] my-1" />
                <div className="flex justify-between text-base">
                  <span className="font-extrabold text-[#0d1f3c]">Total</span>
                  <span className="font-extrabold text-[#11A9C8]">S/ {total}.00</span>
                </div>
              </div>

              {added && (
                <div className="flex items-center gap-2 bg-[#67B83D]/10 text-[#67B83D] border border-[#67B83D]/20 rounded-xl px-4 py-2.5 mb-3 text-sm font-semibold">
                  <CheckCircle2 size={15} />
                  ¡Agregado al carrito!
                </div>
              )}

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#123A7A] text-white font-bold py-4 rounded-xl hover:bg-[#0d2d5e] hover:shadow-lg hover:shadow-[#123A7A]/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={17} />
                Agregar al carrito
              </button>
            </div>
          </FadeIn>

          {/* ── Right column: Collar Preview ──────────────────────── */}
          <FadeIn delay={0.1} className="sticky top-28">
            <div className="flex flex-col items-center">
              <div className="w-full bg-gradient-to-br from-[#f8f9fc] via-white to-[#f0f8f4] rounded-3xl p-6 border border-[rgba(18,58,122,0.08)] shadow-sm relative overflow-hidden">
                {/* Ambient glow tracks selected color */}
                <div
                  className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-15 pointer-events-none transition-all duration-700"
                  style={{ background: `radial-gradient(circle, ${selectedColor.hex} 0%, transparent 70%)` }}
                />

                {/* Collar product — pixel-accurate color change via canvas */}
                <div className="relative w-full rounded-2xl overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: "4/3" }}>
                  <motion.img
                    key={collarUrl}
                    src={collarUrl}
                    alt="Collar Smart Peet personalizado"
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                  />

                </div>

                {/* Shadow under product */}
                <div
                  className="mx-auto w-40 h-3 rounded-full mt-1 blur-xl opacity-20 transition-all duration-700"
                  style={{ background: selectedColor.hex }}
                />

                {/* Status pill */}
                <div className="mt-5 flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm border border-[rgba(18,58,122,0.1)] rounded-full px-5 py-2 shadow-sm w-fit mx-auto flex-wrap">
                  <span className="w-3 h-3 rounded-full border border-white shadow-sm flex-shrink-0" style={{ background: selectedColor.hex }} />
                  <span className="text-xs font-bold text-[#0d1f3c]">{selectedColor.name}</span>
                  {selectedCharm && (
                    <>
                      <span className="text-[#5a6e8a] text-xs">·</span>
                      <span className="text-xs font-bold text-[#0d1f3c]">{selectedCharm.label}</span>
                    </>
                  )}
                </div>
              </div>

              <p className="mt-4 text-xs text-[#5a6e8a] font-medium text-center">
                Así lucirá el Smart Peet de tu mascota.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contacto" className="py-24" style={{ fontFamily: "Manrope, sans-serif", background: "linear-gradient(135deg, #F4F8FF 0%, #EAF4FB 100%)" }}>
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <FadeIn className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest text-[#123A7A] uppercase">Escríbenos</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1f3c] mt-3 mb-4">Contáctanos</h2>
          <p className="text-[#5a6e8a] max-w-md mx-auto">¿Tienes preguntas sobre SmartPets Guardian? Estamos aquí para ayudarte.</p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <FadeIn>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-[rgba(18,58,122,0.08)]">
              {sent && (
                <div className="flex items-center gap-2 bg-[#67B83D]/10 text-[#67B83D] border border-[#67B83D]/20 rounded-xl px-4 py-3 mb-5 text-sm font-semibold">
                  <CheckCircle2 size={16} />
                  ¡Mensaje enviado correctamente!
                </div>
              )}
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-bold text-[#0d1f3c] mb-2">Nombre completo</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Tu nombre"
                    className="w-full bg-[#F4F8FF] border border-[rgba(18,58,122,0.12)] rounded-xl px-4 py-3 text-sm text-[#0d1f3c] placeholder-[#aab4c4] focus:outline-none focus:border-[#11A9C8] focus:ring-2 focus:ring-[#11A9C8]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0d1f3c] mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="tu@correo.com"
                    className="w-full bg-[#F4F8FF] border border-[rgba(18,58,122,0.12)] rounded-xl px-4 py-3 text-sm text-[#0d1f3c] placeholder-[#aab4c4] focus:outline-none focus:border-[#11A9C8] focus:ring-2 focus:ring-[#11A9C8]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0d1f3c] mb-2">Mensaje</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="¿En qué podemos ayudarte?"
                    rows={5}
                    className="w-full bg-[#F4F8FF] border border-[rgba(18,58,122,0.12)] rounded-xl px-4 py-3 text-sm text-[#0d1f3c] placeholder-[#aab4c4] focus:outline-none focus:border-[#11A9C8] focus:ring-2 focus:ring-[#11A9C8]/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#11A9C8] text-white font-bold py-4 rounded-xl hover:bg-[#0e94b0] hover:shadow-lg hover:shadow-[#11A9C8]/25 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Mail size={17} />
                  Enviar mensaje
                </button>
              </div>
            </form>
          </FadeIn>

          {/* Info */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: Mail,
                  label: "Correo",
                  value: "contacto@smartpetsguardian.com",
                  color: "#11A9C8",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+51 999 888 777",
                  color: "#67B83D",
                },
                {
                  icon: Phone,
                  label: "Ubicación",
                  value: "Lima, Perú",
                  color: "#123A7A",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-[rgba(18,58,122,0.08)] shadow-sm hover:shadow-md hover:border-[rgba(18,58,122,0.15)] transition-all duration-200"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#5a6e8a] uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="font-bold text-[#0d1f3c] text-sm">{item.value}</div>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="bg-white rounded-2xl p-5 border border-[rgba(18,58,122,0.08)] shadow-sm">
                <div className="text-xs font-bold text-[#5a6e8a] uppercase tracking-wide mb-4">Síguenos en redes sociales</div>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, label: "@smartpetsguardian", color: "#E1306C" },
                    { icon: Facebook, label: "SmartPets Guardian", color: "#1877F2" },
                    { icon: Twitter, label: "@smartpets_gps", color: "#1DA1F2" },
                  ].map((s) => (
                    <button
                      key={s.label}
                      className="w-11 h-11 rounded-xl flex items-center justify-center border border-[rgba(18,58,122,0.1)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                      style={{ background: `${s.color}12` }}
                      title={s.label}
                    >
                      <s.icon size={18} style={{ color: s.color }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const handleNav = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0d1f3c] text-white py-14" style={{ fontFamily: "Manrope, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-xl p-1.5">
                <ImageWithFallback src={logoImg} alt="SmartPets Guardian" className="h-12 w-auto object-contain" />
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Tecnología GPS inteligente diseñada para proteger a tu mascota y darte tranquilidad absoluta donde quiera que estés.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-white/90 text-sm uppercase tracking-widest">Links rápidos</h4>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-sm text-white/60 hover:text-[#11A9C8] transition-colors duration-200 w-fit"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact mini */}
          <div>
            <h4 className="font-bold mb-4 text-white/90 text-sm uppercase tracking-widest">Contacto</h4>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <div>contacto@smartpetsguardian.com</div>
              <div>+51 999 888 777</div>
              <div>Lima, Perú</div>
            </div>
            <div className="flex gap-2 mt-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#11A9C8] transition-colors duration-200"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-white/40">© 2026 SmartPets Guardian. Todos los derechos reservados.</span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-white/30">Hecho con</span>
            <span className="text-[#67B83D] text-sm">♥</span>
            <span className="text-xs text-white/30">para los amantes de las mascotas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.documentElement.style.fontFamily = "Manrope, sans-serif";
  }, []);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "Manrope, sans-serif" }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MerchSection />
      <CustomizerSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
