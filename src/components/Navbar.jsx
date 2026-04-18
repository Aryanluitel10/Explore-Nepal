import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown, Search, Mountain } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/destinations', label: t('nav.destinations') },
    { path: '/culture', label: t('nav.culture') },
    { path: '/food', label: t('nav.food') },
    { path: '/travel-guide', label: t('nav.travelGuide') },
    { path: '/news', label: t('nav.news') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/history', label: 'History' },
  ];

  const isActive = (path) => location.pathname === path;

  const navBg = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md shadow-md'
    : 'bg-transparent';

  const textColor = scrolled || !isHome
    ? 'text-gray-700'
    : 'text-white';

  const logoColor = scrolled || !isHome
    ? 'text-nepal-red'
    : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="text-2xl">🇳🇵</span>
            </div>
            <div>
              <span className={`text-xl font-display font-bold transition-colors ${logoColor}`}>
                Nepal
              </span>
              <span className={`text-xl font-display font-light transition-colors ${scrolled || !isHome ? 'text-nepal-blue' : 'text-white/80'}`}>
                Explore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(link.path)
                    ? `${scrolled || !isHome ? 'text-nepal-red bg-red-50' : 'text-white bg-white/20'}`
                    : `${textColor} hover:${scrolled || !isHome ? 'text-nepal-red bg-red-50' : 'bg-white/10'}`
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${scrolled || !isHome
                    ? 'text-gray-600 hover:bg-gray-100'
                    : 'text-white hover:bg-white/20'
                  }`}
              >
                <Globe size={16} />
                <span>{i18n.language === 'ne' ? 'नेपाली' : 'English'}</span>
                <ChevronDown size={14} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {[
                    { code: 'en', label: '🇬🇧 English' },
                    { code: 'ne', label: '🇳🇵 नेपाली' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                        ${i18n.language === lang.code
                          ? 'bg-red-50 text-nepal-red font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/destinations"
              className="btn-primary py-2 px-4 text-sm"
            >
              <Mountain size={15} />
              Plan Trip
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors
              ${scrolled || !isHome ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${isActive(link.path)
                    ? 'text-nepal-red bg-red-50'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-nepal-red'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-2 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ne' : 'en')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <Globe size={15} />
                {i18n.language === 'ne' ? 'Switch to English' : 'नेपालीमा बदल्नुहोस्'}
              </button>
              <Link to="/destinations" className="btn-primary flex-1 justify-center py-2.5 text-sm">
                Plan Trip
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
