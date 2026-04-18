import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, Play } from 'lucide-react';
import { galleryImages } from '../data/nepalData';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }} className={className}>
      {children}
    </motion.div>
  );
};

const virtualTours = [
  {
    title: 'Boudhanath Stupa 360°',
    thumbnail: '/kathmandu.png',
    duration: '4:32',
    views: '125K',
    description: 'Walk around the sacred stupa with pilgrims at dusk',
  },
  {
    title: 'Everest Base Camp Trek',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    duration: '8:15',
    views: '340K',
    description: 'Experience the trail from Lukla to Base Camp',
  },
  {
    title: 'Kathmandu Durbar Square',
    thumbnail: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=600&q=80',
    duration: '5:48',
    views: '89K',
    description: 'Explore the medieval royal squares of the valley',
  },
  {
    title: 'Pokhara Lakeside Sunrise',
    thumbnail: 'https://images.unsplash.com/photo-1605537964076-9c5db1c55c8e?w=600&q=80',
    duration: '3:20',
    views: '210K',
    description: "Sarangkot's golden sunrise over the Annapurnas",
  },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [activeTab, setActiveTab] = useState('photos');

  const categoryOrder = ['All', 'Heritage', 'Mountains', 'Nature', 'Wildlife', 'Festivals', 'Culture', 'Food'];
  const categories = categoryOrder.filter(c => c === 'All' || galleryImages.some(i => i.category === c));
  const filtered = activeFilter === 'All' ? galleryImages : galleryImages.filter(i => i.category === activeFilter);

  const openLightbox = (img) => setLightbox(img);
  const closeLightbox = () => setLightbox(null);

  const navigate = (dir) => {
    const idx = filtered.findIndex(i => i.id === lightbox.id);
    const next = (idx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[next]);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1605537964076-9c5db1c55c8e?w=1600&q=80" alt="Nepal gallery" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-gray-900" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center pt-16 px-4">
          <span className="badge bg-white/20 text-white border border-white/30 mb-3">📸 200+ Photos</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white text-shadow-lg">Photo Gallery</h1>
          <p className="text-white/70 mt-2 max-w-xl">A visual journey through Nepal's breathtaking landscapes and vibrant culture</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'photos', label: '📷 Photos' },
            { id: 'virtual', label: '🎬 Virtual Tours' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all
                ${activeTab === tab.id ? 'bg-nepal-red text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'photos' && (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                    ${activeFilter === cat ? 'bg-nepal-red text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <motion.div layout className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              <AnimatePresence>
                {filtered.map((img, i) => (
                  <FadeIn key={img.id} delay={i * 0.04} className="break-inside-avoid mb-3">
                    <motion.div
                      layout
                      className="relative group cursor-pointer rounded-xl overflow-hidden"
                      onClick={() => openLightbox(img)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ aspectRatio: i % 3 === 0 ? '4/5' : '4/3' }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs font-medium">{img.caption}</p>
                        <p className="text-white/60 text-xs">{img.category}</p>
                      </div>
                    </motion.div>
                  </FadeIn>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {activeTab === 'virtual' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-display font-bold text-white mb-2">Virtual Tours of Nepal</h2>
              <p className="text-white/60 text-sm">Immersive video experiences from Nepal's most iconic destinations</p>
            </div>

            {/* Featured Tour */}
            <FadeIn>
              <div className="relative rounded-3xl overflow-hidden mb-6 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80"
                  alt="Everest Virtual Tour"
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 group-hover:scale-110 transition-transform duration-300">
                    <Play size={32} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="badge bg-nepal-red text-white mb-2 text-xs">FEATURED</span>
                  <h3 className="text-2xl font-display font-bold">Everest Base Camp — Full Trek Experience</h3>
                  <p className="text-white/70 text-sm mt-1">16 days condensed into 12 minutes of breathtaking footage</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-white/60">
                    <span>🎬 12:30</span>
                    <span>👁️ 892K views</span>
                    <span>⭐ 4.9</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {virtualTours.map((tour, i) => (
                <FadeIn key={tour.title} delay={i * 0.1}>
                  <div className="bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer hover:bg-gray-700 transition-colors">
                    <div className="relative h-36 overflow-hidden">
                      <img src={tour.thumbnail} alt={tour.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                          <Play size={20} className="text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">▶ {tour.duration}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white text-sm">{tour.title}</h3>
                      <p className="text-gray-400 text-xs mt-1">{tour.description}</p>
                      <p className="text-gray-500 text-xs mt-2">👁️ {tour.views} views</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={lightbox.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.url.replace('w=800', 'w=1200')}
                alt={lightbox.caption}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="text-center mt-4">
                <p className="text-white font-medium">{lightbox.caption}</p>
                <p className="text-white/50 text-sm">{lightbox.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
