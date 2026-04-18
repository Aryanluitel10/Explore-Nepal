import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ExternalLink, CheckCircle } from 'lucide-react';
import { travelGuideData } from '../data/nepalData';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
};

const AccordionItem = ({ item, isOpen, onClick }) => (
  <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-nepal-red shadow-md shadow-red-50' : 'border-gray-200'}`}>
    <button
      className="w-full flex items-center justify-between px-6 py-4 text-left group"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.icon}</span>
        <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-nepal-red' : 'text-gray-800 group-hover:text-nepal-red'}`}>
          {item.title}
        </span>
      </div>
      <ChevronDown
        size={20}
        className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-nepal-red' : ''}`}
      />
    </button>
    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="px-6 pb-5"
      >
        <ul className="space-y-2.5">
          {item.content.map((line, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              {line}
            </li>
          ))}
        </ul>
      </motion.div>
    )}
  </div>
);

const TravelGuide = () => {
  const [openItem, setOpenItem] = useState('visa');

  const guideItems = Object.entries(travelGuideData).map(([key, val]) => ({ key, ...val }));

  const essentials = [
    { label: 'Capital', value: 'Kathmandu', icon: '🏙️' },
    { label: 'Currency', value: 'Nepali Rupee (NPR)', icon: '💰' },
    { label: 'Language', value: 'Nepali (official) + 122 others', icon: '🗣️' },
    { label: 'Timezone', value: 'UTC+5:45 (NST)', icon: '🕐' },
    { label: 'Calling Code', value: '+977', icon: '📞' },
    { label: 'Electricity', value: '230V, 50Hz (Type C/D)', icon: '🔌' },
    { label: 'Airport', value: 'Tribhuvan Intl (KTM)', icon: '✈️' },
    { label: 'Emergency', value: '100 (Police)', icon: '🚨' },
  ];

  const packingList = {
    'Clothing': ['Moisture-wicking base layers', 'Fleece jacket', 'Waterproof shell', 'Trekking pants', 'Warm hat & gloves', 'Comfortable hiking boots', 'Sandals for teahouses', 'Sun hat & bandana'],
    'Health & Safety': ['Travel insurance documents', 'Altitude sickness medication (Diamox)', 'Water purification tablets', 'First aid kit', 'Sunscreen SPF 50+', 'Lip balm with SPF', 'Insect repellent', 'Blister plasters'],
    'Tech & Documents': ['Passport (6+ months validity)', 'Nepal visa', 'Travel insurance policy', 'Downloaded offline maps', 'Power bank (10,000mAh+)', 'Universal travel adapter', 'Headlamp with extra batteries', 'Camera'],
    'Trekking Gear': ['Trekking poles', 'Gaiters', 'Sleeping bag liner', 'Stuff sack / Dry bag', 'TIMS card holder', 'Water bottle (2L)', 'Snacks for the trail', 'Trekking map'],
  };

  const [openPacking, setOpenPacking] = useState('Clothing');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1600&q=80" alt="Travel guide" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center pt-16 px-4">
          <span className="badge bg-white/20 text-white border border-white/30 mb-3">📖 Expert Advice</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white text-shadow-lg">Travel Guide</h1>
          <p className="text-white/80 mt-2 max-w-xl">Everything you need to know for a safe, memorable Nepal adventure</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Facts Grid */}
        <FadeIn>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-10">
            <h2 className="font-display font-bold text-gray-900 text-xl mb-5 flex items-center gap-2">
              🇳🇵 Nepal at a Glance
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {essentials.map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors group">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-nepal-red transition-colors">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Nepal Travel Photo Strip */}
        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { url: 'https://images.unsplash.com/photo-1554710869-95f3df6a3197?w=600&q=80', label: 'Himalayan Rope Bridges' },
              { url: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&q=80', label: 'Prayer Flags on the Trail' },
              { url: 'https://images.unsplash.com/photo-1562462181-b228e3cff9ad?w=600&q=80', label: 'Phewa Lake, Pokhara' },
              { url: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=600&q=80', label: 'Mountain Village Life' },
            ].map((photo, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden aspect-video group shadow-sm">
                <img src={photo.url} alt={photo.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold leading-tight">{photo.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Guide Accordion */}
          <div className="lg:col-span-2">
            <FadeIn>
              <h2 className="font-display font-bold text-gray-900 text-2xl mb-5">Travel Essentials</h2>
            </FadeIn>
            <div className="space-y-3">
              {guideItems.map((item, i) => (
                <FadeIn key={item.key} delay={i * 0.05}>
                  <AccordionItem
                    item={item}
                    isOpen={openItem === item.key}
                    onClick={() => setOpenItem(openItem === item.key ? null : item.key)}
                  />
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Packing List */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  🎒 Packing List
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.keys(packingList).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setOpenPacking(cat)}
                      className={`text-xs px-3 py-1 rounded-full transition-all
                        ${openPacking === cat ? 'bg-nepal-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-nepal-red'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <ul className="space-y-2">
                  {packingList[openPacking].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Trekking Seasons */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">🗓️ Trekking Seasons</h3>
                <div className="space-y-3">
                  {[
                    { season: 'Autumn', months: 'Oct–Nov', rating: 5, desc: 'Best visibility, stable weather', color: 'bg-orange-400' },
                    { season: 'Spring', months: 'Mar–May', rating: 4, desc: 'Rhododendrons in bloom', color: 'bg-pink-400' },
                    { season: 'Winter', months: 'Dec–Feb', rating: 3, desc: 'Cold but clear, fewer crowds', color: 'bg-blue-400' },
                    { season: 'Monsoon', months: 'Jun–Sep', rating: 2, desc: 'Heavy rain, leeches on trails', color: 'bg-gray-400' },
                  ].map(s => (
                    <div key={s.season} className="flex items-center gap-3">
                      <div className={`w-2 h-10 rounded-full ${s.color}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm text-gray-900">{s.season}</span>
                          <span className="text-xs text-gray-500">{s.months}</span>
                        </div>
                        <p className="text-xs text-gray-500">{s.desc}</p>
                        <div className="flex gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className={`h-1.5 w-4 rounded-full ${i < s.rating ? s.color : 'bg-gray-100'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Useful Links */}
            <FadeIn delay={0.4}>
              <div className="bg-gradient-nepal rounded-3xl p-5 text-white">
                <h3 className="font-bold mb-4 text-lg">🔗 Useful Links</h3>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Nepal Tourism Board', url: 'https://welcomenepal.com' },
                    { label: 'Nepal Immigration', url: 'https://nepalimmigration.gov.np' },
                    { label: 'TIMS Card Online', url: 'https://timsnepal.com' },
                    { label: 'National Parks Permits', url: 'https://dnpwc.gov.np' },
                  ].map(link => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm text-white/90 hover:text-white transition-colors group"
                      >
                        {link.label}
                        <ExternalLink size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelGuide;
