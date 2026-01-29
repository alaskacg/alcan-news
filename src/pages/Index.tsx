import StatsBar from '@/components/StatsBar';
import AlertTicker from '@/components/AlertTicker';
import WeatherStrip from '@/components/WeatherStrip';
import HeroSection from '@/components/HeroSection';
import QuoteCarousel from '@/components/QuoteCarousel';
import SeasonalHighlights from '@/components/SeasonalHighlights';
import InfoTicker from '@/components/InfoTicker';
import WeatherSection from '@/components/WeatherSection';
import RoadConditions from '@/components/RoadConditions';
import OutdoorRecreation from '@/components/OutdoorRecreation';
import CommunityCalendar from '@/components/CommunityCalendar';
import LatestNews from '@/components/LatestNews';
import LocalSpotlight from '@/components/LocalSpotlight';
import SponsorBanner from '@/components/SponsorBanner';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <StatsBar />
      <AlertTicker />
      <WeatherStrip />
      
      {/* Hero */}
      <HeroSection />
      
      {/* Quote Carousel */}
      <QuoteCarousel />
      
      {/* Seasonal Info */}
      <SeasonalHighlights />
      
      {/* AD: Alaska Fires */}
      <SponsorBanner sponsor="fire" />
      
      {/* Info Ticker */}
      <InfoTicker />
      
      {/* Weather Section */}
      <WeatherSection />
      
      {/* Road Conditions */}
      <RoadConditions />
      
      {/* AD: Consulting Group */}
      <SponsorBanner sponsor="consulting" />
      
      {/* Outdoor Recreation */}
      <OutdoorRecreation />
      
      {/* AD: Alaskan Boats */}
      <SponsorBanner sponsor="boats" />
      
      {/* Community Calendar */}
      <CommunityCalendar />
      
      {/* AD: Anchorage Chronicle */}
      <SponsorBanner sponsor="chronicle" />
      
      {/* Latest News */}
      <LatestNews />
      
      {/* AD: Alaska Gold News */}
      <SponsorBanner sponsor="gold" />
      
      {/* Local Spotlight */}
      <LocalSpotlight />
      
      {/* AD: Mining Equipment */}
      <SponsorBanner sponsor="mining" />
      
      {/* AD: Alaska Listings */}
      <SponsorBanner sponsor="listings" />
      
      {/* Footer */}
      <Footer />
      
      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
};

export default Index;
