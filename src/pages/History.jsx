import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}>
      {children}
    </motion.div>
  );
};

const timeline = [
  {
    era: 'Ancient Period',
    year: '563 BC – 400 AD',
    dotColor: '#f59e0b',
    accent: 'from-amber-600 to-yellow-500',
    badgeBg: 'bg-amber-500',
    border: 'border-amber-400',
    textAccent: 'text-amber-600',
    icon: '☸️',
    title: 'Birth of Buddha & Early Dynasties',
    subtitle: 'Where civilisation began',
    img: '/history-ancient.png',
    points: [
      { label: 'Buddha Born', detail: 'Siddhartha Gautama was born in Lumbini, Nepal in 563 BC — making Nepal the birthplace of one of the world\'s greatest religions.' },
      { label: 'Kirat Dynasty', detail: 'The Kirat people ruled the Kathmandu Valley for over 1,000 years, making it one of the oldest continuously inhabited regions on Earth.' },
      { label: 'Licchavi Era', detail: 'The Licchavi dynasty (400–750 AD) ushered in a golden period of Hindu-Buddhist art, trade, and diplomacy with India and Tibet.' },
      { label: 'Trade Routes', detail: 'Nepal sat at the crossroads of ancient Silk Road trade routes connecting India, Tibet, and China.' },
    ],
  },
  {
    era: 'Medieval Period',
    year: '879 – 1769 AD',
    dotColor: '#003893',
    accent: 'from-blue-800 to-blue-600',
    badgeBg: 'bg-nepal-blue',
    border: 'border-blue-400',
    textAccent: 'text-nepal-blue',
    icon: '🏛️',
    title: 'Malla Dynasty — The Golden Age',
    subtitle: 'Artistry that stood for centuries',
    img: '/history-malla.png',
    points: [
      { label: 'Malla Kings', detail: 'The Malla dynasty ruled Kathmandu Valley for nearly 600 years, splitting into three rival kingdoms: Kantipur, Bhaktapur, and Lalitpur.' },
      { label: 'Durbar Squares', detail: 'They built the extraordinary Durbar Squares — royal palace complexes still standing today as UNESCO World Heritage Sites.' },
      { label: 'Newari Culture', detail: 'Newari art, wood carving, metalwork, and architecture reached its greatest heights — craftsmen whose skills remain unmatched.' },
      { label: 'Rival Kingdoms', detail: 'The three competing kingdoms each tried to outdo the other in temple building — inadvertently creating the greatest concentration of art in Asia.' },
    ],
  },
  {
    era: 'Unification Era',
    year: '1743 – 1816 AD',
    dotColor: '#DC143C',
    accent: 'from-red-700 to-red-500',
    badgeBg: 'bg-nepal-red',
    border: 'border-red-400',
    textAccent: 'text-nepal-red',
    icon: '⚔️',
    title: 'Prithvi Narayan Shah Unifies Nepal',
    subtitle: 'One nation, one people',
    img: '/history-unification.png',
    points: [
      { label: 'The Conquest', detail: 'King Prithvi Narayan Shah of Gorkha spent 27 years conquering kingdoms until he unified the Kathmandu Valley in 1768–69.' },
      { label: 'Modern Nepal Born', detail: 'He merged dozens of small principalities into a single nation — the birth of modern Nepal as we know it today.' },
      { label: 'Never Colonised', detail: 'Nepal successfully resisted British colonisation — making it the only country in South Asia never to fall under European rule.' },
      { label: 'Sugauli Treaty', detail: 'The 1816 treaty with British India defined Nepal\'s modern borders after the Anglo-Nepalese War, establishing the nation\'s current shape.' },
    ],
  },
  {
    era: 'Rana Oligarchy',
    year: '1846 – 1951 AD',
    dotColor: '#6b7280',
    accent: 'from-gray-700 to-gray-500',
    badgeBg: 'bg-gray-600',
    border: 'border-gray-400',
    textAccent: 'text-gray-600',
    icon: '🏰',
    title: 'The Rana Regime & Isolation',
    subtitle: '104 years behind closed doors',
    img: '/history-rana.png',
    points: [
      { label: 'Coup of 1846', detail: 'Jung Bahadur Rana massacred rivals at the Kot Massacre and seized power, establishing hereditary Prime Ministership that bypassed royal authority.' },
      { label: 'Royal Isolation', detail: 'The Shah kings became powerless figureheads for 104 years while Rana Prime Ministers made all decisions of state.' },
      { label: 'Closed Kingdom', detail: 'Nepal was sealed off from the outside world — no foreign travel, no education reform, and no economic development for over a century.' },
      { label: 'Democracy Arrives', detail: 'In 1951, King Tribhuvan escaped to India and returned with support to end Rana rule. The first elections were held in 1959.' },
    ],
  },
  {
    era: 'Modern Nepal',
    year: '1990 – Present',
    dotColor: '#16a34a',
    accent: 'from-green-700 to-green-500',
    badgeBg: 'bg-green-600',
    border: 'border-green-400',
    textAccent: 'text-green-700',
    icon: '🗳️',
    title: 'Republic, Earthquake & Resilience',
    subtitle: 'Rising from the ashes',
    img: '/history-modern.png',
    points: [
      { label: '1990 Revolution', detail: 'The Jana Andolan people\'s movement forced King Birendra to accept multiparty democracy and a constitutional monarchy.' },
      { label: 'Civil War', detail: 'From 1996–2006, the Maoist insurgency plunged Nepal into a decade-long civil war that claimed 17,000 lives.' },
      { label: 'Republic 2008', detail: 'Nepal abolished its 240-year-old monarchy and declared itself a Federal Democratic Republic — Asia\'s newest republic.' },
      { label: '2015 Earthquake', detail: 'A 7.8 magnitude earthquake devastated Kathmandu, killing 9,000 people and destroying centuries of heritage. Nepal rebuilt with extraordinary resilience.' },
      { label: 'New Constitution', detail: 'In 2015, Nepal adopted a new federal constitution dividing the country into 7 provinces with strong democratic guarantees.' },
    ],
  },
];

const didYouKnow = [
  { fact: 'Nepal is the only country in the world with a non-rectangular flag — a double pennant shape.', icon: '🚩' },
  { fact: 'Nepal was NEVER colonised by any European power — the only South Asian nation to remain fully independent.', icon: '🛡️' },
  { fact: 'The name "Nepal" may come from the sage "Ne" who guarded the valley, combined with "Pal" meaning cave.', icon: '📖' },
  { fact: 'Everest was first summited on May 29, 1953 — by Tenzing Norgay (Nepal) and Edmund Hillary (New Zealand).', icon: '🏔️' },
  { fact: 'Nepal has 8 of the world\'s 10 highest mountains, all above 8,000 metres.', icon: '⛰️' },
  { fact: 'The 2015 earthquake triggered an avalanche on Everest itself — yet Nepal recovered to become a thriving democracy.', icon: '🏗️' },
];

const History = () => {
  const [openEra, setOpenEra] = useState(null);

  return (
    <div className="min-h-screen bg-gray-950">

      {/* ===== CINEMATIC HERO ===== */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        <img src="/bhaktapur.png" alt="Nepal History" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-950" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 pt-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium mb-6">
              📜 2,500 Years of History
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold text-white leading-tight mb-4"
          >
            The Story of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-gold to-amber-400">Nepal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="text-lg text-white/70 max-w-2xl mb-10"
          >
            From the birthplace of Buddha to the world's youngest republic — an epic journey through ancient kingdoms, conquest, revolution, and resilience.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4">
            <a href="#timeline" className="btn-primary text-base px-8 py-3.5">
              Explore the Timeline <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown size={28} className="text-white/40" />
          </motion.div>
        </div>
      </div>

      {/* ===== KEY FACTS STRIP ===== */}
      <div className="bg-gray-900 border-y border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '🏔️', value: '2,500+', label: 'Years of History' },
              { icon: '👑', value: '3', label: 'Major Dynasties' },
              { icon: '🗓️', value: '1768', label: 'Nepal Unified' },
              { icon: '🗳️', value: '2008', label: 'Republic Born' },
            ].map((fact, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center py-4 px-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl mb-1">{fact.icon}</div>
                  <div className="text-2xl font-bold text-white">{fact.value}</div>
                  <div className="text-xs text-white/50 mt-1">{fact.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TIMELINE ===== */}
      <div id="timeline" className="max-w-5xl mx-auto px-4 py-20">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-3">Nepal Through the Ages</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-nepal-red to-nepal-gold mx-auto rounded-full" />
          </div>
        </FadeIn>

        <div className="space-y-6">
          {timeline.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className={`relative rounded-3xl overflow-hidden border border-white/10 cursor-pointer group transition-all duration-300 ${openEra === i ? 'bg-gray-900' : 'bg-gray-900/60 hover:bg-gray-900'}`}
                onClick={() => setOpenEra(openEra === i ? null : i)}
              >
                {/* Era Header */}
                <div className="flex items-center gap-0 min-h-[120px]">
                  {/* Image strip */}
                  <div className="hidden sm:block w-48 h-[120px] flex-shrink-0 overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.accent} opacity-30`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-center justify-between px-6 py-5 gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full text-white ${item.badgeBg}`}>{item.era}</span>
                          <span className="text-xs text-white/40 font-medium">{item.year}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-display font-bold text-white">{item.title}</h3>
                        <p className={`text-sm ${item.textAccent} opacity-80`}>{item.subtitle}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openEra === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown size={22} className="text-white/40" />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {openEra === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className={`border-t border-white/10`}>
                        {/* Full image */}
                        <div className="sm:hidden w-full h-52 overflow-hidden">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                          <div className={`absolute inset-0 bg-gradient-to-b ${item.accent} opacity-20`} />
                        </div>
                        <div className="hidden sm:block w-full h-64 overflow-hidden relative">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
                        </div>
                        <div className="px-6 pb-8 grid sm:grid-cols-2 gap-4 -mt-2">
                          {item.points.map((point, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.07 }}
                              className="bg-white/5 border border-white/10 rounded-2xl p-4"
                            >
                              <p className={`text-xs font-bold mb-1 ${item.textAccent}`}>{point.label}</p>
                              <p className="text-sm text-white/70 leading-relaxed">{point.detail}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ===== DID YOU KNOW ===== */}
      <div className="bg-gray-900 border-t border-white/5 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-white mb-3">📚 Did You Know?</h2>
              <p className="text-white/50 text-sm">Fascinating facts about Nepal's extraordinary history</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {didYouKnow.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300 group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{item.icon}</div>
                  <p className="text-white/75 text-sm leading-relaxed">{item.fact}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/everest-marathon.png" alt="Nepal" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-nepal-red/90 to-gray-950/90" />
        </div>
        <FadeIn className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Be Part of Nepal's Story</h2>
          <p className="text-white/70 text-lg mb-8">
            A nation that survived empires, civil war, and earthquakes — and still stands as one of the most welcoming places on Earth.
          </p>
          <Link to="/destinations" className="btn-primary text-lg px-10 py-4">
            Explore Nepal <ArrowRight size={20} />
          </Link>
        </FadeIn>
      </div>

    </div>
  );
};

export default History;
