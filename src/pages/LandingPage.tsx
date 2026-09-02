import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { Heart, ArrowRight, Shield, Users, Stethoscope, Activity, Building2, Pill, FileText, Clock, Play, Star, Quote, MapPin, Phone } from 'lucide-react';
import { HealthcareCarousel } from '../components/ui/HealthcareCarousel';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const journeySteps = [
    { icon: Users, label: 'Patient', desc: 'Registration & intake' },
    { icon: Stethoscope, label: 'PHC', desc: 'Primary assessment' },
    { icon: Heart, label: 'Doctor', desc: 'Consultation' },
    { icon: Shield, label: 'Referral', desc: 'Coordination' },
    { icon: Activity, label: 'Diagnostics', desc: 'Tests & reports' },
    { icon: Pill, label: 'Pharmacy', desc: 'Medicine' },
    { icon: FileText, label: 'Records', desc: 'Health timeline' },
    { icon: Clock, label: 'Follow-up', desc: 'Continued care' },
  ];

  const features = [
    { icon: Shield, title: t('features.connectedCare'), desc: t('features.connectedCareDesc'), image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format' },
    { icon: Users, title: t('features.humanCentered'), desc: t('features.humanCenteredDesc'), image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format' },
    { icon: Activity, title: t('features.continuity'), desc: t('features.continuityDesc'), image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=600&fit=crop&auto=format' },
    { icon: Building2, title: t('features.facilityCoord'), desc: t('features.facilityCoordDesc'), image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&auto=format' },
  ];

  const impactStats = [
    { value: '50K+', label: t('impact.patients'), image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop&auto=format' },
    { value: '200+', label: t('impact.facilities'), image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop&auto=format' },
    { value: '1000+', label: t('impact.doctors'), image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop&auto=format' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Community Health Worker, Raipur',
      text: 'SAHAAY has transformed how I coordinate care for my patients. No more phone calls to track referrals.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&auto=format',
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'General Physician, PHC Chandrapur',
      text: 'I can see the full patient history before consultation. This saves time and improves diagnosis quality.',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&auto=format',
    },
    {
      name: 'Anita Devi',
      role: 'Patient, Nagpur',
      text: 'My mother\'s treatment records are always available. We don\'t have to carry papers to every visit anymore.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format',
    },
  ];

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=500&fit=crop&auto=format', alt: 'Medical consultation', span: 'col-span-2 row-span-2' },
    { src: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=500&h=300&fit=crop&auto=format', alt: 'Healthcare technology', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&h=300&fit=crop&auto=format', alt: 'Hospital building', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=600&fit=crop&auto=format', alt: 'Medical equipment', span: 'col-span-1 row-span-2' },
    { src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&h=300&fit=crop&auto=format', alt: 'Nurse with patient', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=300&fit=crop&auto=format', alt: 'Pharmacy', span: 'col-span-1 row-span-1' },
  ];

  return (
    <div className="min-h-screen bg-sahaay-surface overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-sahaay-deep/6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sahaay-deep to-sahaay-600 flex items-center justify-center">
              <Heart size={18} className="text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-sahaay-deep">SAHAAY</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-sahaay-deep transition-colors">{t('nav.features')}</a>
            <a href="#journey" className="text-sm font-medium text-gray-600 hover:text-sahaay-deep transition-colors">{t('nav.howItWorks')}</a>
            <a href="#impact" className="text-sm font-medium text-gray-600 hover:text-sahaay-deep transition-colors">{t('nav.impact')}</a>
            <a href="#about" className="text-sm font-medium text-gray-600 hover:text-sahaay-deep transition-colors">{t('nav.about')}</a>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <button onClick={() => onNavigate('/login')} className="px-4 py-2 text-sm font-semibold text-sahaay-deep hover:bg-sahaay-deep/5 rounded-xl transition-colors">
              {t('nav.login')}
            </button>
            <button onClick={() => onNavigate('/login')} className="sahaay-btn-primary text-sm">
              {t('nav.getStarted')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section ref={heroRef} className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden min-h-[100dvh] flex items-center">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <img
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&h=1200&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover img-faded-wash"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sahaay-surface via-sahaay-surface/92 to-sahaay-surface/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-sahaay-surface via-transparent to-sahaay-surface/50" />
        </motion.div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-[15%] w-64 h-64 bg-sahaay-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[10%] w-48 h-48 bg-sahaay-400/10 rounded-full blur-2xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <motion.div
                variants={fadeUp}
                custom={1}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sahaay-deep/8 text-sahaay-deep text-xs font-semibold mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sahaay-500 animate-pulse-soft" />
                {t('hero.badge')}
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-4">
                {t('hero.title1')}
                <br />
                <span className="bg-gradient-to-r from-sahaay-deep to-sahaay-500 bg-clip-text text-transparent">{t('hero.title2')}</span>
              </h1>

              <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mb-8">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <button onClick={() => onNavigate('/login')} className="sahaay-btn-primary text-base px-7 py-3.5 flex items-center gap-2">
                  {t('hero.cta')} <ArrowRight size={18} />
                </button>
                <button onClick={() => onNavigate('/login')} className="sahaay-btn-secondary text-base px-7 py-3.5 flex items-center gap-2">
                  <Play size={16} /> {t('hero.explore')}
                </button>
              </div>

              <button onClick={() => onNavigate('/doctor/dashboard')} className="sahaay-btn-ghost text-sm">
                {t('hero.professionals')}
              </button>
            </motion.div>

            {/* Right - Healthcare Image Carousel */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="relative hidden lg:block h-[420px]"
            >
              <HealthcareCarousel variant="hero" />
            </motion.div>

            {/* Mobile carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:hidden h-[300px]"
            >
              <HealthcareCarousel variant="hero" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Healthcare Image Strip - Animated scrolling images */}
      <section className="py-8 overflow-hidden bg-white/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-4">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest">Trusted by healthcare providers across India</p>
        </div>
        <div className="flex gap-6 animate-[slideIn_30s_linear_infinite] px-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="shrink-0 w-64 h-40 rounded-2xl overflow-hidden img-shimmer">
              <img
                src={`https://images.unsplash.com/photo-${['1576091160399-112ba8d25d1d', '1559757175-5700dde675bc', '1551076805-e1869033e561', '1519494026892-80bbd2d6fd0d', '1579684385127-1ef15d508118', '1587351021759-3e566b6af7bc'][i - 1]}?w=600&h=400&fit=crop&auto=format`}
                alt="Healthcare facility"
                className="w-full h-full object-cover img-faded-wash"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-sahaay-50/50 to-white/0" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t('journey.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('journey.subtitle')}</p>
          </motion.div>

          {/* Journey steps with images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
            {journeySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sahaay-deep/10 to-sahaay-500/5 flex items-center justify-center mb-3 text-sahaay-deep">
                    <Icon size={24} />
                  </div>
                  <p className="text-sm font-bold text-gray-800">{step.label}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Connection line for desktop */}
          <div className="hidden lg:flex items-center justify-center mt-[-220px] mb-[200px] pointer-events-none">
            <div className="w-full max-w-5xl h-[2px] bg-gradient-to-r from-transparent via-sahaay-deep/20 to-transparent" />
          </div>

          {/* Healthcare image mosaic below journey */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
          >
            {[
              { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&auto=format', alt: 'Medical consultation' },
              { src: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop&auto=format', alt: 'Healthcare technology' },
              { src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop&auto=format', alt: 'Hospital' },
              { src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop&auto=format', alt: 'Healthcare worker' },
            ].map((img, i) => (
              <motion.div
                key={i}
                variants={imageReveal}
                custom={i}
                className="rounded-2xl overflow-hidden aspect-[4/3] img-shimmer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover img-zoom-hover img-faded-wash"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section id="features" className="py-16 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t('features.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('features.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-elevated overflow-hidden hover:-translate-y-1 transition-transform duration-300 group"
                >
                  {/* Feature image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-sahaay-deep shadow-lg">
                      <Icon size={22} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Gallery / Mosaic Section */}
      <section className="py-16 lg:py-24 relative bg-white/40">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Healthcare in Action</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From rural health centers to specialist consultations, SAHAAY connects every part of the care journey.</p>
          </motion.div>

          {/* Masonry-style image grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 grid-mosaic"
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                variants={imageReveal}
                custom={i}
                className={`${img.span} rounded-2xl overflow-hidden relative group img-shimmer`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sahaay-deep/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <p className="text-white text-sm font-semibold drop-shadow-lg">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section with Stats + Images */}
      <section id="impact" className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 sahaay-gradient-deep" />

        {/* Background images with low opacity */}
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=1080&fit=crop&auto=format" alt="" className="w-full h-full object-cover img-ken-burns" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('impact.title')}</h2>
            <p className="text-sahaay-50/80 max-w-2xl mx-auto">{t('impact.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {impactStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative rounded-2xl overflow-hidden group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={stat.image}
                    alt={stat.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sahaay-950/90 via-sahaay-950/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sahaay-50/80 text-sm font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Avatars */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-sahaay-50/30 to-white/0" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t('testimonials.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card-elevated p-6 relative"
              >
                <Quote size={32} className="text-sahaay-deep/10 absolute top-4 right-4" />
                <p className="text-sm text-gray-700 leading-relaxed mb-6 relative z-10">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sahaay-deep/10 shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Community Section with Imagery */}
      <section id="about" className="py-16 lg:py-24 relative bg-white/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=600&fit=crop&auto=format', alt: 'Rural healthcare', h: 'h-64' },
                { src: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=400&fit=crop&auto=format', alt: 'Medical supplies', h: 'h-40' },
                { src: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=500&h=400&fit=crop&auto=format', alt: 'Healthcare tech', h: 'h-40' },
                { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=600&fit=crop&auto=format', alt: 'Doctor consultation', h: 'h-64' },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  variants={imageReveal}
                  custom={i}
                  className={`${img.h} rounded-2xl overflow-hidden img-shimmer ${i % 2 === 0 ? 'mt-0' : 'mt-6'}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover img-zoom-hover img-faded-wash"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t('about.title')}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{t('about.text1')}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{t('about.text2')}</p>
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: t('about.serving') },
                  { icon: Phone, text: t('about.works') },
                  { icon: Shield, text: t('about.secure') },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sahaay-deep/8 flex items-center justify-center text-sahaay-deep shrink-0">
                        <Icon size={18} />
                      </div>
                      <p className="text-sm text-gray-700 font-medium">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&h=1080&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 sahaay-gradient-deep opacity-90" />
        </div>

        {/* Floating decorative images */}
        <div className="absolute top-10 left-[5%] w-24 h-24 rounded-xl overflow-hidden opacity-15 img-float-slow hidden lg:block">
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&h=200&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-10 right-[8%] w-20 h-20 rounded-xl overflow-hidden opacity-15 img-float-medium hidden lg:block rotate-6">
          <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=200&h=200&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
            <p className="text-sahaay-50 text-lg mb-8 max-w-xl mx-auto">{t('cta.subtitle')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => onNavigate('/login')} className="px-8 py-3.5 bg-white text-sahaay-deep font-bold rounded-xl hover:bg-sahaay-50 transition-colors text-base">
                {t('cta.free')}
              </button>
              <button onClick={() => onNavigate('/doctor/dashboard')} className="px-8 py-3.5 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-base">
                {t('cta.professional')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-sahaay-950 text-white/60">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart size={20} className="text-sahaay-400" fill="currentColor" />
                <span className="text-lg font-bold text-white">SAHAAY</span>
              </div>
              <p className="text-sm leading-relaxed">{t('footer.tagline')}</p>
              <p className="text-sm mt-2">{t('footer.desc')}</p>
              {/* Footer image */}
              <div className="mt-4 w-full h-24 rounded-xl overflow-hidden opacity-40">
                <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=150&fit=crop&auto=format" alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-3">{t('footer.platform')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.forPatients')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.forDoctors')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.forWorkers')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.forFacilities')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-3">{t('footer.resources')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.docs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.api')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.community')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.support')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-3">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.security')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.compliance')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-sm">
            <p>&copy; 2026 SAHAAY. All rights reserved. Built for hackathon demonstration.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
