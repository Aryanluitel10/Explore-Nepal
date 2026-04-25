import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🇳🇵</span>
              <div>
                <span className="text-xl font-display font-bold text-white">Nepal</span>
                <span className="text-xl font-display font-light text-nepal-red">Explore</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your comprehensive guide to Nepal — the land of the Himalayas, ancient temples, vibrant culture, and the warmest people on Earth.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FacebookIcon, href: '#', label: 'Facebook' },
                { icon: InstagramIcon, href: '#', label: 'Instagram' },
                { icon: TwitterIcon, href: '#', label: 'Twitter' },
                { icon: YoutubeIcon, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-nepal-red transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore Nepal</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/destinations', label: 'Top Destinations' },
                { to: '/culture', label: 'Culture & Festivals' },
                { to: '/food', label: 'Food & Cuisine' },
                { to: '/travel-guide', label: 'Travel Guide' },
                { to: '/gallery', label: 'Photo Gallery' },
                { to: '/news', label: 'News & Events' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-nepal-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Top Destinations</h4>
            <ul className="space-y-2.5">
              {[
                'Kathmandu Valley',
                'Pokhara',
                'Everest Base Camp',
                'Chitwan National Park',
                'Lumbini',
                'Mustang',
                'Annapurna Circuit',
                'Bhaktapur',
              ].map((dest) => (
                <li key={dest}>
                  <Link
                    to="/destinations"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-nepal-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Nepal Info</h4>
            <ul className="space-y-3 mb-6">
              {[
                { icon: MapPin, text: 'Kathmandu, Nepal' },
                { icon: Phone, text: '+977-1-4256909 (Tourism Board)' },
                { icon: Mail, text: 'info@nepalexplore.com' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-gray-400">
                  <Icon size={15} className="mt-0.5 text-nepal-red flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-2 font-medium">Emergency Numbers</p>
              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex justify-between"><span>Tourist Police:</span><span className="text-white">1144</span></div>
                <div className="flex justify-between"><span>Ambulance:</span><span className="text-white">102</span></div>
                <div className="flex justify-between"><span>Fire:</span><span className="text-white">101</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nepal Anthem Strip */}
      <div className="bg-gradient-to-r from-nepal-red via-nepal-blue to-nepal-red py-3">
        <p className="text-center text-white/90 text-sm font-nepali italic">
          "सयौँ थुँगा फूलका हामी एउटै माला नेपाली" — We are one garland of hundreds of flowers, Nepali
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            Nepal Explore. Made with ❤️ for the land of the Himalayas.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600">Privacy Policy</span>
            <span className="text-xs text-gray-600">Terms of Use</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-nepal-red flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
