import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import {
  MapPin, Clock, Star, ArrowRight, Play, Mountain, Users, Calendar,
  Compass, Camera, Utensils, BookOpen, Newspaper, ChevronRight, Scroll
} from 'lucide-react';
import { destinations, cultures, nepalFacts, foods, newsEvents } from '../data/nepalData';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      image: '/kathmandu.png',
      title: 'Ancient Temples & Stupas',
      subtitle: 'Kathmandu Valley',
    },
    {
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=3840&q=100',
      title: "World's Highest Peak",
      subtitle: 'Mount Everest — 8,848m',
    },
    {
      image: '/pokhara.png',
      title: 'Serene Himalayan Lakes',
      subtitle: 'Phewa Lake, Pokhara',
    },
    {
      image: '/bhaktapur.png',
      title: 'Medieval Heritage Cities',
      subtitle: 'Bhaktapur Durbar Square',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const quickLinks = [
    { icon: Compass, label: 'Destinations', path: '/destinations', color: 'bg-red-50 text-nepal-red', desc: '40+ places' },
    { icon: Users, label: 'Culture', path: '/culture', color: 'bg-blue-50 text-nepal-blue', desc: '125 ethnic groups' },
    { icon: Utensils, label: 'Food', path: '/food', color: 'bg-yellow-50 text-yellow-700', desc: '50+ dishes' },
    { icon: BookOpen, label: 'Travel Guide', path: '/travel-guide', color: 'bg-green-50 text-green-700', desc: 'Expert tips' },
    { icon: Camera, label: 'Gallery', path: '/gallery', color: 'bg-purple-50 text-purple-700', desc: '200+ photos' },
    { icon: Newspaper, label: 'News', path: '/news', color: 'bg-orange-50 text-orange-700', desc: 'Latest updates' },
    { icon: Scroll, label: 'History', path: '/history', color: 'bg-amber-50 text-amber-700', desc: '2,500+ years' },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === activeSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white text-shadow-lg mb-4 leading-tight"
          >
            Discover <span className="text-nepal-gold">Nepal</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl text-shadow mb-2"
          >
            {heroSlides[activeSlide].title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm md:text-base text-white/70 mb-8"
          >
            {heroSlides[activeSlide].subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link to="/destinations" className="btn-primary text-base px-8 py-3.5">
              <Compass size={18} />
              {t('home.hero.cta')}
            </Link>
            <Link to="/gallery" className="btn-outline text-base px-8 py-3.5">
              <Play size={18} />
              View Gallery
            </Link>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8"
          >
            {[
              { value: '8,848m', label: 'Highest Peak', icon: '🏔️' },
              { value: '10', label: 'UNESCO Sites', icon: '🏛️' },
              { value: '500+', label: 'Ancient Temples', icon: '🛕' },
              { value: '240+', label: 'Trekking Trails', icon: '🥾' },
            ].map((stat) => (
              <div key={stat.label} className="text-center glass rounded-xl p-3 sm:p-4">
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeSlide ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 right-6 z-10">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-3 bg-white/70 rounded-full"
            />
          </div>
        </div>
      </section>

      {/* ===== QUICK ACCESS ===== */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900">Explore Everything Nepal</h2>
              <p className="text-gray-500 mt-2">Pick a section to get started</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {quickLinks.map(({ icon: Icon, label, path, color, desc }, i) => (
              <FadeIn key={path} delay={i * 0.08}>
                <Link
                  to={path}
                  className="card card-hover flex flex-col items-center text-center p-5 gap-3 group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED DESTINATIONS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="badge badge-red mb-3">Must-Visit Places</span>
              <h2 className="section-title">{t('home.featured.title')}</h2>
              <div className="divider-nepal mx-auto mt-4 mb-4" />
              <p className="section-subtitle">{t('home.featured.subtitle')}</p>
            </div>
          </FadeIn>

          {/* Featured Card — Large */}
          <div className="grid lg:grid-cols-5 gap-6 mb-6">
            <FadeIn className="lg:col-span-3">
              <Link to="/destinations" className="card card-hover block group relative overflow-hidden h-96">
                <img
                  src={destinations[0].image}
                  alt={destinations[0].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="badge badge-red mb-2 text-xs bg-nepal-red text-white">Featured</span>
                  <h3 className="text-2xl font-display font-bold mb-1">{destinations[0].name}</h3>
                  <p className="text-sm text-white/80 font-nepali">{destinations[0].nepaliName}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-white/80">
                    <span className="flex items-center gap-1"><MapPin size={13} />{destinations[0].altitude}</span>
                    <span className="flex items-center gap-1"><Star size={13} className="text-yellow-400" fill="currentColor" />{destinations[0].rating}</span>
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn className="lg:col-span-2" delay={0.1}>
              <Link to="/destinations" className="card card-hover block group relative overflow-hidden h-96">
                <img
                  src={destinations[2].image}
                  alt={destinations[2].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs mb-2">
                    ⭐ {destinations[2].rating}
                  </span>
                  <h3 className="text-xl font-display font-bold mb-1">{destinations[2].name}</h3>
                  <p className="text-sm text-white/80 font-nepali">{destinations[2].nepaliName}</p>
                </div>
              </Link>
            </FadeIn>
          </div>

          {/* Destination Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.slice(1, 4).filter((_, i) => i !== 1).concat(destinations.slice(4, 6)).map((dest, i) => (
              <FadeIn key={dest.id} delay={i * 0.1}>
                <Link to="/destinations" className="card card-hover block group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold text-gray-800 flex items-center gap-1">
                        <Star size={11} className="text-yellow-500" fill="currentColor" /> {dest.rating}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
                      {dest.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-gray-900 text-lg">{dest.name}</h3>
                    <p className="text-xs text-gray-500 font-nepali mb-2">{dest.nepaliName}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{dest.description}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Mountain size={12} className="text-nepal-red" /> {dest.altitude}
                      </span>
                      <span className="text-xs font-medium text-nepal-red flex items-center gap-1">
                        Explore <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-10">
            <Link to="/destinations" className="btn-primary">
              View All Destinations <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== NEPAL FACTS STRIP ===== */}
      <section className="py-16 bg-gradient-nepal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <h2 className="text-center text-2xl font-display font-bold text-white mb-10">Nepal by the Numbers</h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {nepalFacts.map((fact, i) => (
              <FadeIn key={fact.label} delay={i * 0.05}>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl mb-2">{fact.icon}</div>
                  <div className="text-xl font-bold text-white">{fact.value}</div>
                  <div className="text-xs text-white/70 mt-1 leading-tight">{fact.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CULTURE HIGHLIGHTS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="badge badge-blue mb-3">Festivals & Traditions</span>
              <h2 className="section-title">{t('home.culture.title')}</h2>
              <div className="divider-nepal mx-auto mt-4 mb-4" />
              <p className="section-subtitle">{t('home.culture.subtitle')}</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultures.slice(0, 6).map((culture, i) => (
              <FadeIn key={culture.id} delay={i * 0.1}>
                <Link to="/culture" className="card card-hover block group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={culture.image}
                      alt={culture.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-nepal-blue/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full capitalize">
                        {culture.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{culture.name}</h3>
                    <p className="text-xs text-gray-500 font-nepali">{culture.nepaliName}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{culture.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {culture.month}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {culture.duration}</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-10">
            <Link to="/culture" className="btn-secondary">
              Explore Culture <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== FOOD SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="badge badge-gold mb-3">Taste of Nepal</span>
              <h2 className="section-title mb-4">Food That Warms the Soul</h2>
              <div className="divider-nepal mb-4" />
              <p className="text-gray-600 leading-relaxed mb-6">
                Nepali food pulls from Newari, Tibetan, and Indian traditions. Dal Bhat is eaten twice a day by most families. Momos are everywhere — steamed, fried, or in soup. The food is simple, filling, and genuinely good.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {foods.slice(0, 4).map((food) => (
                  <div key={food.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors group">
                    <img src={food.image} alt={food.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm group-hover:text-nepal-red transition-colors truncate">{food.name}</p>
                      <p className="text-xs text-gray-500 font-nepali">{food.nepaliName}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/food" className="btn-primary">
                Explore Cuisine <Utensils size={16} />
              </Link>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-3">
                {foods.slice(0, 4).map((food, i) => (
                  <div key={food.id} className={`rounded-2xl overflow-hidden relative group ${i === 0 ? 'row-span-2' : ''}`}>
                    <img
                      src={food.image}
                      alt={food.name}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? 'h-full min-h-[280px]' : 'h-32'}`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium">{food.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== NEWS SECTION ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="badge badge-red mb-2">Latest Updates</span>
                <h2 className="text-2xl font-display font-bold text-gray-900">News & Events</h2>
              </div>
              <Link to="/news" className="hidden sm:flex items-center gap-1 text-sm font-medium text-nepal-red hover:text-red-700">
                View all <ChevronRight size={16} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsEvents.slice(0, 3).map((news, i) => (
              <FadeIn key={news.id} delay={i * 0.1}>
                <Link to="/news" className="card card-hover block group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {news.isBreaking && (
                      <span className="absolute top-3 left-3 bg-nepal-red text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                        BREAKING
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                      <Calendar size={11} /> {new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-nepal-red transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{news.excerpt}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HISTORY FEATURE SECTION ===== */}
      <section className="py-0 relative overflow-hidden">
        <div className="relative h-[480px] sm:h-[520px]">
          <img src="/bhaktapur.png" alt="Nepal History" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <FadeIn className="max-w-xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-medium mb-4">
                  📜 2,500 Years of History
                </span>
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4 leading-tight">
                  The Untold Story <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-gold to-amber-400">of Nepal</span>
                </h2>
                <p className="text-white/65 text-base leading-relaxed mb-8">
                  Nepal has been continuously inhabited for over 2,500 years. It was never colonized, unified under Prithvi Narayan Shah in 1768, and became a republic in 2008. The history is complicated, layered, and worth knowing.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {['Licchavi Dynasty', 'Malla Golden Age', 'Unification 1768', 'Republic 2008'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs">{tag}</span>
                  ))}
                </div>
                <Link to="/history" className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2">
                  Discover Nepal's History <ArrowRight size={18} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=3840&q=100"
            alt="Nepal mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nepal-red/90 to-nepal-blue/90" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
              Plan Your Trip to Nepal
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Find destinations, travel tips, cultural guides, and everything else you need before you go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/destinations" className="btn-outline text-lg px-10 py-4">
                <Mountain size={20} />
                Start Exploring
              </Link>
              <Link to="/travel-guide" className="bg-white text-nepal-red font-semibold text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center">
                <BookOpen size={20} />
                Travel Guide
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;
