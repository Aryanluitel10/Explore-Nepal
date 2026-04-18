import { useState } from 'react';
import dalBhatImg from '../assets/dal-bhat-tarkari.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Flame, Leaf, MapPin, X, ChefHat, ExternalLink } from 'lucide-react';
import { foods } from '../data/nepalData';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
};

const restaurants = [
  { name: 'Thamel House', specialty: 'Traditional Newari Khaja Set', location: 'Kathmandu', price: '$$', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
  { name: 'OR2K', specialty: 'Fusion & Vegetarian Thali', location: 'Thamel, Kathmandu', price: '$$', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
  { name: 'Momos & More', specialty: 'Artisan Momo Bar', location: 'Pokhara Lakeside', price: '$', img: '/momos.png' },
  { name: 'Newa Lahana', specialty: 'Authentic Newari Cuisine', location: 'Bhaktapur', price: '$$', img: '/newari-khaja.png' },
];

const spiceColor = (level) => ({
  'None': 'text-gray-500',
  'Mild': 'text-green-600',
  'Mild-Medium': 'text-yellow-600',
  'Medium': 'text-orange-500',
  'Sour': 'text-purple-600',
}[level] || 'text-gray-500');

const spiceBg = (level) => ({
  'None': 'bg-gray-50',
  'Mild': 'bg-green-50',
  'Mild-Medium': 'bg-yellow-50',
  'Medium': 'bg-orange-50',
  'Sour': 'bg-purple-50',
}[level] || 'bg-gray-50');

const Food = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'staple', 'street food', 'festival food', 'soup', 'newari', 'traditional', 'dessert'];
  const filtered = filter === 'all' ? foods : foods.filter(f => f.category === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&q=80"
          alt="Nepali food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/75" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center pt-16 px-4">
          <span className="badge bg-white/20 text-white border border-white/30 mb-3">🍛 10 Must-Try Dishes</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white text-shadow-lg">Food & Cuisine</h1>
          <p className="text-white/80 mt-2 max-w-xl">A taste of Nepal — from Dal Bhat to Himalayan street food</p>
        </div>
      </div>

      {/* Source Credit Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-sm text-amber-800">
          <span className="font-semibold">📖 Cuisine guide sourced from:</span>
          <a
            href="https://carolinerosetravel.com/a-taste-of-nepal-10-nepali-foods-you-must-try/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium text-amber-700 underline underline-offset-2 hover:text-amber-900 transition-colors"
          >
            A Taste of Nepal — Caroline Rose Travel
            <ExternalLink size={12} />
          </a>
          <span className="text-amber-600">— First-hand experiences from a traveller who dove into Nepal's food culture fully.</span>
        </div>
      </div>

      {/* Photo Mosaic — All 10 Dishes at a Glance */}
      <section className="py-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-white font-display font-bold text-2xl mb-6 text-center">
              🍽️ All 10 Must-Try Nepali Dishes
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {foods.map((food, i) => (
              <FadeIn key={food.id} delay={i * 0.05}>
                <div
                  className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square"
                  onClick={() => setSelected(food)}
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  {/* Number badge */}
                  <div className="absolute top-2 left-2 w-7 h-7 bg-nepal-red rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                    {food.id}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-semibold leading-tight">{food.name}</p>
                    <p className="text-white/60 text-xs font-nepali">{food.nepaliName}</p>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-nepal-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold bg-black/40 px-3 py-1 rounded-full">View Details</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">Click any dish to see the full description, ingredients & fun facts</p>
        </div>
      </section>

      {/* Dal Bhat Hero Feature */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <span className="badge badge-red mb-3">🍚 #1 Most Popular Dish</span>
              <h2 className="text-3xl font-display font-bold mb-4">Dal Bhat Tarkari — The Soul of Nepal</h2>
              <div className="divider-nepal mb-4" />
              <p className="text-gray-600 leading-relaxed mb-3">
                By far the most popular dish eaten by locals, Dal Bhat Tarkari is consumed by Nepali people every single day — sometimes twice! <strong>Dal</strong> is the lentil soup, <strong>Bhat</strong> is steamed rice, and <strong>Tarkari</strong> is curried vegetables.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Locals eat it with their right hand — pouring the soup over the rice and mixing in sauces. Getting food on your palm is considered bad manners! If you go trekking, expect Dal Bhat every day in homestays and teahouses.
              </p>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-5">
                <p className="text-sm font-semibold text-red-700 mb-1">💡 Traveller's Tip</p>
                <p className="text-sm text-red-600 italic">"Dal Bhat power, 24 hour!" — the unofficial motto of Nepal's trekking culture and the energy that fuels every mountain trail.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Rice (Bhat)', 'Lentil Soup (Dal)', 'Veggie Curry (Tarkari)', 'Pickle (Achar)', 'Papad', 'Spinach (Saag)'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-nepal-red flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative">
                <img
                  src={dalBhatImg}
                  alt="Dal Bhat Tarkari"
                  className="rounded-3xl shadow-2xl w-full object-cover h-80"
                />
                <div className="absolute -bottom-4 -right-4 bg-nepal-red text-white rounded-2xl p-4 shadow-xl">
                  <p className="text-2xl font-bold">2×</p>
                  <p className="text-xs">Daily</p>
                </div>
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-xl">
                  <p className="text-2xl">🏆</p>
                  <p className="text-xs font-bold text-gray-700">National Dish</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* All 10 Dishes Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8">
              <span className="badge badge-gold mb-3">✈️ First-Hand Traveller Picks</span>
              <h2 className="section-title mb-2">10 Nepali Dishes You Must Try</h2>
              <div className="divider-nepal mx-auto mb-3" />
              <p className="text-gray-500 max-w-xl mx-auto text-sm">
                Curated from a traveller who "dove into the food culture fully, and tried any dish put in front of them" —{' '}
                <a href="https://carolinerosetravel.com/a-taste-of-nepal-10-nepali-foods-you-must-try/" target="_blank" rel="noopener noreferrer" className="text-nepal-red underline hover:no-underline">
                  Caroline Rose Travel
                </a>
              </p>
            </div>
          </FadeIn>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all
                  ${filter === cat
                    ? 'bg-nepal-red text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-nepal-red hover:text-nepal-red'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((food, i) => (
                <motion.div
                  key={food.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(food)}
                  className="card card-hover cursor-pointer group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Rank badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 bg-nepal-red text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                      {food.id}
                    </div>
                    {food.isVegetarian && (
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Leaf size={10} /> Veg
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-full capitalize">{food.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{food.name}</h3>
                        <p className="text-xs text-gray-500 font-nepali">{food.nepaliName}</p>
                      </div>
                      <span className={`text-xs font-semibold flex items-center gap-1 flex-shrink-0 ml-2 ${spiceColor(food.spiceLevel)}`}>
                        <Flame size={12} /> {food.spiceLevel}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{food.description}</p>
                    <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                      <MapPin size={11} className="text-nepal-red flex-shrink-0" />
                      <span className="truncate">{food.region}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Where to Eat */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8">
              <span className="badge badge-blue mb-2"><ChefHat size={12} /> Top Restaurants</span>
              <h2 className="section-title">Where to Eat in Nepal</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {restaurants.map((r, i) => (
              <FadeIn key={r.name} delay={i * 0.1}>
                <div className="card card-hover group">
                  <div className="h-40 overflow-hidden">
                    <img src={r.img} alt={r.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-gray-900">{r.name}</h3>
                      <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">{r.price}</span>
                    </div>
                    <p className="text-xs text-nepal-red mt-0.5 font-medium">{r.specialty}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={10} /> {r.location}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Food Facts Strip */}
      <section className="py-10 bg-gradient-nepal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: '🍚', fact: 'Dal Bhat is eaten twice daily by over 80% of Nepalis' },
              { icon: '🥟', fact: 'Momos are considered Nepal\'s unofficial national snack' },
              { icon: '🫙', fact: 'Brass plates are reserved for guests as a sign of respect' },
              { icon: '🧉', fact: 'Tongba (millet beer) is drunk through a bamboo straw' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-white/90 text-xs leading-relaxed">{item.fact}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Food Detail Modal */}
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
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-56">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X size={18} />
                </button>
                {/* Rank */}
                <div className="absolute top-4 left-4 w-9 h-9 bg-nepal-red rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  #{selected.id}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-display font-bold">{selected.name}</h2>
                    <p className="text-gray-500 font-nepali text-sm">{selected.nepaliName}</p>
                  </div>
                  {selected.isVegetarian && (
                    <span className="badge badge-green ml-2 flex-shrink-0"><Leaf size={11} /> Veg</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-red capitalize">{selected.category}</span>
                  <span className={`badge ${spiceBg(selected.spiceLevel)} ${spiceColor(selected.spiceLevel)}`}>
                    <Flame size={10} /> {selected.spiceLevel}
                  </span>
                  <span className="badge bg-gray-100 text-gray-600">
                    <MapPin size={10} /> {selected.region}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">{selected.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">🥬 Key Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.ingredients.map(ing => (
                      <span key={ing} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{ing}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                  <p className="text-xs font-semibold text-yellow-800 mb-1">🌟 Did You Know?</p>
                  <p className="text-sm text-yellow-700">{selected.funFact}</p>
                </div>

                {selected.source && (
                  <a
                    href="https://carolinerosetravel.com/a-taste-of-nepal-10-nepali-foods-you-must-try/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-nepal-red transition-colors"
                  >
                    <ExternalLink size={11} />
                    Source: Caroline Rose Travel — A Taste of Nepal
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Food;
