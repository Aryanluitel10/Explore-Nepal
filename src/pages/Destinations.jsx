import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Star, Mountain, Clock, Sun, ChevronRight, X, Filter } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { destinations } from '../data/nepalData';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createCustomIcon = (color = '#DC143C') => L.divIcon({
  className: '',
  html: `<div style="
    width: 32px; height: 32px;
    background: ${color};
    border: 3px solid white;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const categoryColors = {
  all: '#DC143C',
  mountains: '#6B7280',
  cities: '#003893',
  nature: '#2D6A4F',
  heritage: '#F4A01C',
};

const FlyToDestination = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 10, { duration: 1.5 });
  }, [center, map]);
  return null;
};

const Destinations = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filters = [
    { id: 'all', label: 'All', icon: '🗺️' },
    { id: 'mountains', label: 'Mountains', icon: '🏔️' },
    { id: 'cities', label: 'Cities', icon: '🏙️' },
    { id: 'nature', label: 'Nature & Wildlife', icon: '🌿' },
    { id: 'heritage', label: 'Heritage', icon: '🏛️' },
  ];

  const filtered = activeFilter === 'all'
    ? destinations
    : destinations.filter(d => d.category === activeFilter);

  const handleSelect = (dest) => {
    setSelected(dest);
    setMapCenter(dest.coordinates);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1600&q=80"
          alt="Nepal destinations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center pt-16 px-4">
          <span className="badge bg-white/20 text-white border border-white/30 mb-3">🗺️ Interactive Map</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white text-shadow-lg">
            Explore Destinations
          </h1>
          <p className="text-white/80 mt-2 max-w-lg">
            Discover Nepal's incredible diversity — from snow-capped peaks to tropical jungles
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeFilter === f.id
                  ? 'bg-nepal-red text-white shadow-md shadow-red-200'
                  : 'bg-white text-gray-600 hover:bg-red-50 hover:text-nepal-red border border-gray-200'
                }`}
            >
              <span>{f.icon}</span> {f.label}
            </button>
          ))}
          <span className="ml-auto self-center text-sm text-gray-400">
            {filtered.length} destination{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Map + List Layout */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Destination Cards */}
          <div className="lg:col-span-2 space-y-4 max-h-[700px] overflow-y-auto pr-1 scrollbar-hide">
            <AnimatePresence>
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleSelect(dest)}
                  className={`card cursor-pointer transition-all duration-200 ${
                    selected?.id === dest.id
                      ? 'ring-2 ring-nepal-red shadow-lg shadow-red-100'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex gap-3 p-3">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{dest.name}</h3>
                          <p className="text-xs text-gray-500 font-nepali">{dest.nepaliName}</p>
                        </div>
                        <span className="flex items-center gap-0.5 text-xs font-semibold text-gray-800 bg-yellow-50 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Star size={10} className="text-yellow-500" fill="currentColor" /> {dest.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{dest.description}</p>
                      <div className="flex gap-3 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Mountain size={10} /> {dest.altitude}</span>
                        <span className="flex items-center gap-1"><Sun size={10} /> {dest.bestTime.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                  {selected?.id === dest.id && (
                    <div className="px-3 pb-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                        className="w-full text-center text-xs font-medium text-nepal-red bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors"
                      >
                        View Full Details →
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 sticky top-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-[500px] lg:h-[700px]">
              <MapContainer
                center={[28.3949, 84.1240]}
                zoom={7}
                className="h-full w-full"
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filtered.map((dest) => (
                  <Marker
                    key={dest.id}
                    position={dest.coordinates}
                    icon={createCustomIcon(
                      selected?.id === dest.id
                        ? '#F4A01C'
                        : categoryColors[dest.category] || '#DC143C'
                    )}
                    eventHandlers={{ click: () => handleSelect(dest) }}
                  >
                    <Popup className="nepal-popup">
                      <div className="min-w-[200px]">
                        <img src={dest.image} alt={dest.name} className="w-full h-28 object-cover rounded-lg mb-2" />
                        <h3 className="font-bold text-gray-900">{dest.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{dest.description.slice(0, 80)}...</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>📍 {dest.altitude}</span>
                          <span>⭐ {dest.rating}</span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                {mapCenter && <FlyToDestination center={mapCenter} />}
              </MapContainer>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Click any destination card or map marker to explore
            </p>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 sm:h-72">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-2xl font-display font-bold">{selected.name}</h2>
                  <p className="text-white/80 font-nepali">{selected.nepaliName}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { icon: Mountain, label: 'Altitude', value: selected.altitude },
                    { icon: Star, label: 'Rating', value: `${selected.rating}/5.0` },
                    { icon: Sun, label: 'Best Time', value: selected.bestTime.split(',')[0] },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                      <Icon size={18} className="text-nepal-red mx-auto mb-1" />
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-semibold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{selected.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">✨ Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.highlights.map((h) => (
                      <span key={h} className="bg-red-50 text-nepal-red text-xs px-3 py-1 rounded-full">{h}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-amber-800 mb-1">💡 Travel Tip</p>
                  <p className="text-sm text-amber-700">{selected.travelTip}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Destinations;
