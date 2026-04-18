import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Tag, ArrowRight, Bell, Search } from 'lucide-react';
import { newsEvents } from '../data/nepalData';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
};

const upcomingEvents = [
  { name: 'Bisket Jatra — Bhaktapur New Year', date: 'April 13, 2025', location: 'Bhaktapur', type: 'Festival', color: 'bg-red-100 text-red-700' },
  { name: 'Buddha Jayanti (Buddha\'s Birthday)', date: 'May 12, 2025', location: 'Lumbini, Swayambhu', type: 'Religious', color: 'bg-blue-100 text-blue-700' },
  { name: 'Everest Marathon', date: 'May 29, 2025', location: 'Everest Base Camp', type: 'Sports', color: 'bg-green-100 text-green-700' },
  { name: 'Rato Machhindranath Chariot Festival', date: 'June 2025', location: 'Patan', type: 'Festival', color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Teej — Women\'s Festival', date: 'September 2025', location: 'Pashupatinath', type: 'Religious', color: 'bg-purple-100 text-purple-700' },
  { name: 'Dashain — 15 Days', date: 'October 2025', location: 'Nationwide', type: 'Festival', color: 'bg-orange-100 text-orange-700' },
  { name: 'Tihar — Festival of Lights', date: 'October 2025', location: 'Nationwide', type: 'Festival', color: 'bg-pink-100 text-pink-700' },
  { name: 'Nepal Travel Mart', date: 'September 2025', location: 'Kathmandu', type: 'Tourism', color: 'bg-teal-100 text-teal-700' },
];

const News = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Tourism', 'Festival', 'Environment', 'Adventure', 'Travel', 'Heritage'];

  const filtered = newsEvents.filter(n => {
    const matchCat = activeCategory === 'All' || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img src="/kathmandu.png" alt="Nepal news" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center pt-16 px-4">
          <span className="badge bg-white/20 text-white border border-white/30 mb-3">📰 Latest Updates</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white text-shadow-lg">News & Events</h1>
          <p className="text-white/80 mt-2 max-w-xl">Stay updated with festivals, tourism news, and events across Nepal</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search news and events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-nepal-red focus:border-transparent text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all
                  ${activeCategory === cat ? 'bg-nepal-red text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-nepal-red'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News Grid */}
          <div className="lg:col-span-2">
            {/* Breaking News */}
            {filtered.filter(n => n.isBreaking).length > 0 && (
              <FadeIn>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <h2 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Breaking News</h2>
                  </div>
                  {filtered.filter(n => n.isBreaking).map(news => (
                    <div key={news.id} className="card overflow-hidden group cursor-pointer">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative sm:w-56 h-44 sm:h-auto overflow-hidden flex-shrink-0">
                          <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <span className="absolute top-3 left-3 bg-nepal-red text-white text-xs font-bold px-2.5 py-1 rounded-full">BREAKING</span>
                        </div>
                        <div className="p-5 flex flex-col justify-between">
                          <div>
                            <span className="badge badge-red mb-2 text-xs">{news.category}</span>
                            <h3 className="font-display font-bold text-gray-900 text-xl mb-2 group-hover:text-nepal-red transition-colors">{news.title}</h3>
                            <p className="text-gray-600 text-sm">{news.excerpt}</p>
                          </div>
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Calendar size={11} /> {new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="text-xs font-medium text-nepal-red flex items-center gap-1 hover:gap-2 transition-all">
                              Read more <ArrowRight size={12} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* News Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.filter(n => !n.isBreaking).map((news, i) => (
                <FadeIn key={news.id} delay={i * 0.07}>
                  <div className="card card-hover cursor-pointer group">
                    <div className="relative h-44 overflow-hidden">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                        {news.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                        <Calendar size={11} /> {new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-nepal-red transition-colors leading-snug">
                        {news.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{news.excerpt}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-medium">No results found for "{search}"</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Upcoming Events */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <Calendar size={18} className="text-nepal-red" /> Upcoming Events 2025
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
                  {upcomingEvents.map((event, i) => (
                    <div key={event.name} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                      <div className="flex-shrink-0 mt-0.5">
                        <span className={`badge text-xs ${event.color}`}>{event.type}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 leading-tight">{event.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{event.date} • {event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Nepal Tourism Newsletter */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-nepal rounded-3xl p-5 text-white">
                <Bell size={24} className="mb-3 opacity-80" />
                <h3 className="font-bold text-xl mb-2">Stay Updated</h3>
                <p className="text-white/80 text-sm mb-4">Get the latest Nepal travel news, festival dates, and travel advisories.</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/30"
                  />
                  <button className="bg-white text-nepal-red font-semibold px-4 py-2 rounded-xl text-sm hover:bg-gray-100 transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Quick Stats */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Nepal Tourism 2024</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Tourist Arrivals', value: '1.1M', change: '+22%', up: true },
                    { label: 'Everest Summits', value: '878', change: '+15%', up: true },
                    { label: 'Trekking Permits', value: '156K', change: '+18%', up: true },
                    { label: 'Tourism Revenue', value: '$636M', change: '+19%', up: true },
                  ].map(stat => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{stat.value}</span>
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${stat.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
