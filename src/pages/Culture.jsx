import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, Users, X } from 'lucide-react';
import { cultures } from '../data/nepalData';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
};

const ethnicGroups = [
  { name: 'Sherpa', trait: 'Mountain guides & Buddhist tradition', region: 'Himalayan', color: 'bg-blue-50 border-blue-200' },
  { name: 'Newari', trait: 'Art, architecture & festivals', region: 'Kathmandu Valley', color: 'bg-red-50 border-red-200' },
  { name: 'Tharu', trait: 'Indigenous Terai culture & dance', region: 'Terai', color: 'bg-green-50 border-green-200' },
  { name: 'Gurung', trait: 'Warriors & Annapurna custodians', region: 'Western Hills', color: 'bg-yellow-50 border-yellow-200' },
  { name: 'Tamang', trait: 'Buddhism & Thangka painting', region: 'Central Hills', color: 'bg-purple-50 border-purple-200' },
  { name: 'Magar', trait: 'Ancient military tradition', region: 'Mid-Western Hills', color: 'bg-orange-50 border-orange-200' },
  { name: 'Rai & Limbu', trait: 'Kiprat tradition & nature worship', region: 'Eastern Hills', color: 'bg-teal-50 border-teal-200' },
  { name: 'Brahmin & Chhetri', trait: 'Sanskrit scholarship & dharma', region: 'Hills & Terai', color: 'bg-indigo-50 border-indigo-200' },
];

const religions = [
  { name: 'Hinduism', percent: 81.3, color: '#DC143C', icon: '🕉️', note: 'Official state religion until 2008' },
  { name: 'Buddhism', percent: 9.0, color: '#003893', icon: '☸️', note: 'Deep Himalayan & Newari roots' },
  { name: 'Islam', percent: 4.4, color: '#2D6A4F', icon: '☪️', note: 'Mainly Terai communities' },
  { name: 'Kirant', percent: 3.0, color: '#F4A01C', icon: '🌿', note: 'Ancient animist indigenous faith' },
  { name: 'Christianity & others', percent: 2.3, color: '#8B4513', icon: '✝️', note: 'Growing minority' },
];

const Culture = () => {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('festivals');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1570288685369-f7305163d0e3?w=1600&q=80" alt="Nepal culture" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center pt-16 px-4">
          <span className="badge bg-white/20 text-white border border-white/30 mb-3">🎭 125+ Ethnic Groups</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white text-shadow-lg">
            Culture & Traditions
          </h1>
          <p className="text-white/80 mt-2 max-w-xl">
            A tapestry of festivals, art, music, and spirituality spanning thousands of years
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-hide py-2">
          {[
            { id: 'festivals', label: '🎊 Festivals & Events' },
            { id: 'ethnic', label: '👥 Ethnic Groups' },
            { id: 'religion', label: '🙏 Religion' },
            { id: 'arts', label: '🎨 Arts & Crafts' },
            { id: 'history', label: '📜 History' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${activeTab === tab.id ? 'bg-nepal-red text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Festivals Tab */}
        {activeTab === 'festivals' && (
          <div>
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="section-title mb-3">Festivals of Nepal</h2>
                <div className="divider-nepal mx-auto mb-4" />
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Nepal celebrates over 50 festivals throughout the year. Each festival is a vibrant blend of music, food, rituals, and community bonding.
                </p>
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cultures.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.08}>
                  <div
                    onClick={() => setSelected(item)}
                    className="card card-hover cursor-pointer group"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className={`badge text-xs capitalize ${
                          item.category === 'festival' ? 'bg-red-500/80 text-white' :
                          item.category === 'tradition' ? 'bg-blue-500/80 text-white' :
                          'bg-green-500/80 text-white'
                        }`}>{item.category}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-gray-900 text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500 font-nepali">{item.nepaliName}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.description}</p>
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Calendar size={12} className="text-nepal-red" /> {item.month}</span>
                        <span className="flex items-center gap-1"><Clock size={12} className="text-nepal-red" /> {item.duration}</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* Ethnic Groups Tab */}
        {activeTab === 'ethnic' && (
          <div>
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="section-title mb-3">Nepal's Ethnic Tapestry</h2>
                <div className="divider-nepal mx-auto mb-4" />
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Nepal is home to 125 officially recognized ethnic groups speaking 123 languages, making it one of the most culturally diverse nations on Earth.
                </p>
              </div>
            </FadeIn>
            {/* Nepal People Photo Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {[
                { url: 'https://images.unsplash.com/photo-1550642249-6e5605421172?w=600&q=80', caption: 'Community gathering at a heritage gazebo' },
                { url: 'https://images.unsplash.com/photo-1554710869-95f3df6a3197?w=600&q=80', caption: 'Trekkers crossing a Himalayan rope bridge' },
                { url: 'https://images.unsplash.com/photo-1511215579272-6192432f83bc?w=600&q=80', caption: 'Aerial view of a mountain community' },
                { url: 'https://images.unsplash.com/photo-1580424917967-a8867a6e676e?w=600&q=80', caption: 'Lush Himalayan valleys and forests' },
              ].map((photo, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="relative rounded-2xl overflow-hidden aspect-video group">
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity leading-tight">{photo.caption}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {ethnicGroups.map((group, i) => (
                <FadeIn key={group.name} delay={i * 0.07}>
                  <div className={`rounded-2xl border p-5 ${group.color} hover:shadow-md transition-shadow`}>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{group.name}</h3>
                    <p className="text-xs text-gray-600 font-medium mb-2">{group.region}</p>
                    <p className="text-sm text-gray-700">{group.trait}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Sherpa Feature */}
            <FadeIn>
              <div className="bg-gradient-to-r from-nepal-blue to-blue-700 rounded-3xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 text-white">
                    <span className="badge bg-white/20 text-white border-white/30 mb-4">Featured Culture</span>
                    <h3 className="text-3xl font-display font-bold mb-3">The Sherpa People</h3>
                    <p className="text-white/80 leading-relaxed mb-4">
                      The Sherpa are the legendary mountaineers of the Himalayas. Their deep Buddhist spirituality, incredible altitude endurance, and warmth have made them the backbone of Himalayan expeditions since Edmund Hillary and Tenzing Norgay's first Everest summit in 1953.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {['Expert High-Altitude Guides', 'Tibetan Buddhist Heritage', 'Namche Bazaar Culture', 'Pioneered Everest Routes'].map(trait => (
                        <div key={trait} className="flex items-start gap-2 text-sm text-white/80">
                          <span className="text-white mt-0.5">✦</span> {trait}
                        </div>
                      ))}
                    </div>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&q=80"
                    alt="Sherpa culture"
                    className="h-full min-h-[280px] w-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        )}

        {/* Religion Tab */}
        {activeTab === 'religion' && (
          <div>
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="section-title mb-3">Religions of Nepal</h2>
                <div className="divider-nepal mx-auto mb-4" />
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Nepal is the birthplace of Buddha and a sacred land for Hindus. The intermingling of Hinduism and Buddhism has created a unique religious syncretism found nowhere else on Earth.
                </p>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <FadeIn>
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-5">Religious Distribution</h3>
                  <div className="space-y-4">
                    {religions.map((r) => (
                      <div key={r.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{r.icon} {r.name}</span>
                          <span className="text-sm font-bold" style={{ color: r.color }}>{r.percent}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${r.percent}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: r.color }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{r.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Pashupatinath Temple',
                      subtitle: 'Most Sacred Hindu Temple',
                      img: '/kathmandu.png',
                      desc: 'A UNESCO World Heritage Site on the banks of the Bagmati River — the holiest Hindu temple in Nepal, dedicated to Lord Shiva.',
                    },
                    {
                      title: 'Boudhanath Stupa',
                      subtitle: "World's Largest Buddhist Stupa",
                      img: 'https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?w=400&q=80',
                      desc: 'One of the largest spherical stupas in Nepal, a UNESCO World Heritage Site and the spiritual center of Tibetan Buddhism outside Tibet.',
                    },
                  ].map((site) => (
                    <div key={site.title} className="card flex gap-4 p-4">
                      <img src={site.img} alt={site.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{site.title}</h4>
                        <p className="text-xs text-nepal-red font-medium">{site.subtitle}</p>
                        <p className="text-sm text-gray-600 mt-1">{site.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        )}

        {/* Arts & Crafts Tab */}
        {activeTab === 'arts' && (
          <div>
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="section-title mb-3">Arts, Crafts & Music</h2>
                <div className="divider-nepal mx-auto mb-4" />
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Nepal's artistic traditions span 2,000+ years, from exquisite Thangka paintings to intricately carved wooden temples.
                </p>
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Thangka Painting',
                  img: 'https://images.unsplash.com/photo-1593698054589-8c14bb66d635?w=600&q=80',
                  desc: 'Intricate Buddhist scroll paintings depicting deities, mandalas, and cosmological diagrams. Each Thangka can take months to complete.',
                  origin: 'Tibetan-Newari Tradition',
                },
                {
                  title: 'Wood Carving',
                  img: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=600&q=80',
                  desc: "Bhaktapur's master carvers produce the intricate windows, struts, and doorframes seen throughout Nepal's heritage cities.",
                  origin: 'Bhaktapur, Kathmandu Valley',
                },
                {
                  title: 'Pashmina Weaving',
                  img: 'https://images.unsplash.com/photo-1513614835783-51537729c8ba?w=600&q=80',
                  desc: 'Made from Himalayan cashmere goat wool, Nepali Pashmina shawls are among the world\'s finest and most sought-after textiles.',
                  origin: 'Kathmandu & Himalayan Regions',
                },
                {
                  title: 'Lokta Paper',
                  img: 'https://images.unsplash.com/photo-1529733905113-027ed85d7e33?w=600&q=80',
                  desc: 'Handmade from the bark of the Lokta plant, this traditional paper is used for manuscripts, art, and journals. Eco-friendly and unique.',
                  origin: 'Nepal Hills',
                },
                {
                  title: 'Dhime Music',
                  img: 'https://images.unsplash.com/photo-1526712318848-5f38e2740d44?w=600&q=80',
                  desc: 'Traditional Newari percussion ensemble played during festivals. The Dhime drum is central to Kathmandu Valley\'s ritual music.',
                  origin: 'Kathmandu Valley Newari',
                },
                {
                  title: 'Paubha Painting',
                  img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
                  desc: 'Traditional Newari religious paintings depicting Hindu and Buddhist deities, made with mineral colors on cotton canvas.',
                  origin: 'Newari Tradition, Bhaktapur',
                },
              ].map((art, i) => (
                <FadeIn key={art.title} delay={i * 0.1}>
                  <div className="card card-hover group">
                    <div className="h-48 overflow-hidden">
                      <img src={art.img} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-medium text-nepal-red">{art.origin}</span>
                      <h3 className="font-bold text-gray-900 mt-1 mb-2">{art.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{art.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="section-title mb-3">History of Nepal</h2>
                <div className="divider-nepal mx-auto mb-4" />
                <p className="text-gray-500 max-w-2xl mx-auto">
                  From ancient kingdoms to the world's youngest republic — Nepal's history spans over 2,500 years of dynasties, conquest, and resilience.
                </p>
              </div>
            </FadeIn>

            {/* Key Facts Banner */}
            <FadeIn>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                {[
                  { icon: '🏔️', value: '2,500+', label: 'Years of History' },
                  { icon: '👑', value: '3', label: 'Major Dynasties' },
                  { icon: '🗓️', value: '1768', label: 'Year of Unification' },
                  { icon: '🗳️', value: '2008', label: 'Republic Declared' },
                ].map((fact, i) => (
                  <div key={i} className="bg-gradient-nepal rounded-2xl p-5 text-center text-white">
                    <div className="text-3xl mb-2">{fact.icon}</div>
                    <div className="text-2xl font-bold">{fact.value}</div>
                    <div className="text-xs text-white/80 mt-1">{fact.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Timeline */}
            <div className="relative mb-14">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-nepal-red via-nepal-blue to-nepal-red opacity-30" />
              {[
                {
                  era: 'Ancient Period',
                  year: '563 BC – 400 AD',
                  color: 'bg-amber-50 border-amber-200',
                  badge: 'bg-amber-500',
                  icon: '☸️',
                  title: 'Birth of Buddha & Licchavi Dynasty',
                  img: '/lumbini.png',
                  points: [
                    'Siddhartha Gautama (the Buddha) was born in Lumbini, Nepal in 563 BC',
                    'The Kirat dynasty ruled the Kathmandu Valley for over 1,000 years',
                    'The Licchavi dynasty (400–750 AD) brought Hindu and Buddhist art to flourish',
                    'Ancient trade routes connected Nepal to India, Tibet, and China',
                  ],
                },
                {
                  era: 'Medieval Period',
                  year: '879 – 1769 AD',
                  color: 'bg-blue-50 border-blue-200',
                  badge: 'bg-nepal-blue',
                  icon: '🏛️',
                  title: 'Malla Dynasty — The Golden Age',
                  img: '/bhaktapur.png',
                  points: [
                    'The Malla kings ruled Kathmandu Valley for nearly 600 years',
                    'They built the iconic Durbar Squares of Kathmandu, Bhaktapur, and Patan',
                    'Newari art, architecture, and culture reached its greatest heights',
                    'The valley was divided into three rival kingdoms: Kantipur, Bhaktapur & Lalitpur',
                    'Intricate wood carvings, temples, and stupas were constructed during this era',
                  ],
                },
                {
                  era: 'Unification Era',
                  year: '1743 – 1816 AD',
                  color: 'bg-red-50 border-red-200',
                  badge: 'bg-nepal-red',
                  icon: '⚔️',
                  title: 'Prithvi Narayan Shah Unifies Nepal',
                  img: '/kathmandu.png',
                  points: [
                    'Prithvi Narayan Shah of Gorkha conquered the Kathmandu Valley in 1768–69',
                    'He unified dozens of small kingdoms into a single nation — modern Nepal',
                    'Kathmandu became the capital of the unified Kingdom of Nepal',
                    'Nepal resisted British colonisation — the only South Asian nation never colonised',
                    'The Sugauli Treaty (1816) with British India defined Nepal\'s modern borders',
                  ],
                },
                {
                  era: 'Rana Oligarchy',
                  year: '1846 – 1951 AD',
                  color: 'bg-gray-50 border-gray-200',
                  badge: 'bg-gray-500',
                  icon: '🏰',
                  title: 'The Rana Regime',
                  img: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=600&q=80',
                  points: [
                    'Jung Bahadur Rana seized power in 1846 and established hereditary Prime Ministership',
                    'The Shah kings were reduced to figureheads while Ranas held all real power',
                    'Nepal was largely isolated from the outside world for 104 years',
                    'In 1951, King Tribhuvan ended Rana rule with Indian support, restoring royal power',
                    'The first democratic elections were held in 1959 under BP Koirala',
                  ],
                },
                {
                  era: 'Modern Nepal',
                  year: '1990 – Present',
                  color: 'bg-green-50 border-green-200',
                  badge: 'bg-green-600',
                  icon: '🗳️',
                  title: 'Democracy, Civil War & Republic',
                  img: '/everest-marathon.png',
                  points: [
                    '1990: People\'s Movement (Jana Andolan) forced multiparty democracy',
                    '1996–2006: Maoist insurgency caused a decade-long civil war with 17,000 deaths',
                    '2006: Comprehensive Peace Agreement ended the conflict',
                    '2008: Nepal abolished the 240-year-old monarchy and became a Federal Democratic Republic',
                    '2015: A devastating 7.8 magnitude earthquake killed 9,000 people — Nepal rebuilt',
                    '2015: Nepal adopted a new constitution, becoming a federal republic with 7 provinces',
                  ],
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={`relative flex flex-col sm:flex-row gap-0 mb-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 sm:left-1/2 top-6 w-4 h-4 rounded-full border-4 border-white shadow-md -translate-x-1/2 z-10"
                      style={{ backgroundColor: item.badge.replace('bg-', '') === 'bg-nepal-red' ? '#DC143C' : item.badge.replace('bg-', '') === 'bg-nepal-blue' ? '#003893' : item.badge.replace('bg-', '') === 'bg-amber-500' ? '#f59e0b' : item.badge.replace('bg-', '') === 'bg-green-600' ? '#16a34a' : '#6b7280' }}
                    />
                    <div className={`ml-10 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-10' : 'sm:pl-10'}`}>
                      <div className={`border rounded-2xl overflow-hidden shadow-sm ${item.color}`}>
                        <img src={item.img} alt={item.title} className="w-full h-44 object-cover" />
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{item.icon}</span>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${item.badge}`}>{item.era}</span>
                            <span className="text-xs text-gray-400 font-medium">{item.year}</span>
                          </div>
                          <h3 className="font-display font-bold text-gray-900 text-lg mb-3">{item.title}</h3>
                          <ul className="space-y-1.5">
                            {item.points.map((point, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-nepal-red flex-shrink-0 mt-1.5" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sm:w-1/2" />
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Did You Know Strip */}
            <FadeIn>
              <div className="bg-gray-900 rounded-3xl p-8">
                <h3 className="text-white font-display font-bold text-xl mb-6 text-center">📚 Did You Know?</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { fact: 'Nepal is the only country in the world with a non-rectangular flag.', icon: '🚩' },
                    { fact: 'Nepal was never colonised by any European power — the only South Asian nation to achieve this.', icon: '🛡️' },
                    { fact: 'The name "Nepal" may derive from "Ne" (holy) and "Pal" (cave), referring to a sage named Ne who guarded the valley.', icon: '📖' },
                    { fact: 'Everest was first summited on May 29, 1953 by Tenzing Norgay (Nepal) and Edmund Hillary (New Zealand).', icon: '🏔️' },
                    { fact: 'Nepal abolished the death penalty in 1990 and has one of the world\'s most progressive constitutions.', icon: '⚖️' },
                    { fact: 'The 2015 earthquake measured 7.8 magnitude and triggered an avalanche on Everest — yet Nepal rebuilt in remarkable time.', icon: '🏗️' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <p className="text-white/80 text-sm leading-relaxed">{item.fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        )}
      </div>

      {/* Culture Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-52">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white">
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-xl font-display font-bold">{selected.name}</h2>
                  <p className="text-sm text-white/80 font-nepali">{selected.nepaliName}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{selected.description}</p>
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div className="bg-red-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Month</p>
                    <p className="text-sm font-semibold text-nepal-red">{selected.month}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-semibold text-nepal-blue">{selected.duration}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Significance</p>
                    <p className="text-xs font-semibold text-green-700 leading-tight">{selected.significance}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">🎊 Activities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.activities.map(a => (
                      <span key={a} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Culture;
