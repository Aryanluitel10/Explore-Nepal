import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Culture from './pages/Culture';
import Food from './pages/Food';
import TravelGuide from './pages/TravelGuide';
import News from './pages/News';
import Gallery from './pages/Gallery';
import History from './pages/History';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/food" element={<Food />} />
            <Route path="/travel-guide" element={<TravelGuide />} />
            <Route path="/news" element={<News />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center text-center px-4 pt-16">
    <div>
      <div className="text-8xl mb-4">🏔️</div>
      <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-6">This path leads nowhere. Let's get you back on the trail.</p>
      <a href="/" className="btn-primary">Return Home</a>
    </div>
  </div>
);

export default App;
