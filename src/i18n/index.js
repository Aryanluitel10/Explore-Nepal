import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        destinations: 'Destinations',
        culture: 'Culture',
        food: 'Food & Cuisine',
        travelGuide: 'Travel Guide',
        news: 'News & Events',
        gallery: 'Gallery',
        about: 'About Nepal',
      },
      home: {
        hero: {
          badge: 'Discover the Himalayas',
          title: 'Experience the Magic of',
          titleHighlight: 'Nepal',
          subtitle: 'Home to 8 of the world\'s 10 highest peaks, thousands of temples, and over 120 ethnic groups. Here\'s where to start.',
          cta: 'Explore Nepal',
          ctaSecondary: 'Watch Video',
          stats: {
            peaks: 'Himalayan Peaks',
            heritage: 'UNESCO Heritage Sites',
            temples: 'Ancient Temples',
            trails: 'Trekking Trails',
          }
        },
        featured: {
          title: 'Top Destinations',
          subtitle: 'From Everest Base Camp to Pokhara\'s lakeside, here are Nepal\'s most visited places.',
        },
        culture: {
          title: 'Rich Cultural Heritage',
          subtitle: 'Over 120 ethnic groups, 120 languages, and centuries of festivals, art, and tradition.',
        },
        quickAccess: {
          title: 'Plan Your Visit',
          subtitle: 'Browse destinations, food, culture, history and travel tips.',
        }
      },
      destinations: {
        title: 'Explore Destinations',
        subtitle: 'Discover Nepal\'s incredible diversity from snow-capped mountains to tropical jungles.',
        mapTitle: 'Interactive Map of Nepal',
        filter: {
          all: 'All',
          mountains: 'Mountains',
          cities: 'Cities',
          nature: 'Nature',
          heritage: 'Heritage',
        }
      },
      culture: {
        title: 'Culture & Traditions',
        subtitle: 'A tapestry of festivals, art, music, and spirituality spanning thousands of years.',
      },
      food: {
        title: 'Food & Cuisine',
        subtitle: 'Explore the flavors of Nepal — from the iconic Dal Bhat to street food delights.',
      },
      travelGuide: {
        title: 'Travel Guide',
        subtitle: 'Everything you need to know for a safe and memorable trip to Nepal.',
      },
      news: {
        title: 'News & Events',
        subtitle: 'Stay updated with the latest from Nepal — festivals, events, and travel news.',
      },
      gallery: {
        title: 'Photo Gallery',
        subtitle: 'A visual journey through Nepal\'s breathtaking landscapes and vibrant culture.',
      },
      common: {
        learnMore: 'Learn More',
        viewAll: 'View All',
        readMore: 'Read More',
        bookNow: 'Book Now',
        altitude: 'Altitude',
        location: 'Location',
        duration: 'Duration',
        difficulty: 'Difficulty',
        bestTime: 'Best Time',
        language: 'Language',
        currency: 'Currency',
        timezone: 'Timezone',
        search: 'Search',
        searchPlaceholder: 'Search destinations, culture, food...',
        loading: 'Loading...',
        backToTop: 'Back to Top',
      }
    }
  },
  ne: {
    translation: {
      nav: {
        home: 'गृहपृष्ठ',
        destinations: 'गन्तव्यहरू',
        culture: 'संस्कृति',
        food: 'खाना र भोजन',
        travelGuide: 'यात्रा गाइड',
        news: 'समाचार र कार्यक्रम',
        gallery: 'ग्यालरी',
        about: 'नेपालको बारेमा',
      },
      home: {
        hero: {
          badge: 'हिमालय पत्ता लगाउनुहोस्',
          title: 'नेपालको जादू अनुभव गर्नुहोस्',
          titleHighlight: 'नेपाल',
          subtitle: 'सर्वोच्च चुचुराहरू, प्राचीन मन्दिरहरू, समृद्ध संस्कृति र न्यानो मुस्कान। संसारको छानामा तपाईंको यात्रा यहाँबाट सुरु हुन्छ।',
          cta: 'नेपाल अन्वेषण गर्नुहोस्',
          ctaSecondary: 'भिडियो हेर्नुहोस्',
          stats: {
            peaks: 'हिमालय चुचुराहरू',
            heritage: 'युनेस्को सम्पदा स्थलहरू',
            temples: 'प्राचीन मन्दिरहरू',
            trails: 'ट्रेकिङ मार्गहरू',
          }
        },
        featured: {
          title: 'शीर्ष गन्तव्यहरू',
          subtitle: 'एभरेस्टको उचाइदेखि पोखराको शान्त तालसम्म, नेपालका सबैभन्दा सुन्दर ठाउँहरू अन्वेषण गर्नुहोस्।',
        },
      },
      common: {
        learnMore: 'थप जान्नुहोस्',
        viewAll: 'सबै हेर्नुहोस्',
        readMore: 'थप पढ्नुहोस्',
        bookNow: 'अहिले बुक गर्नुहोस्',
        search: 'खोज्नुहोस्',
        searchPlaceholder: 'गन्तव्य, संस्कृति, खाना खोज्नुहोस्...',
        loading: 'लोड हुँदैछ...',
        backToTop: 'माथि जानुहोस्',
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
