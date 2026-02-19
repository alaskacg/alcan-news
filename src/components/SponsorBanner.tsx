import { ExternalLink } from 'lucide-react';

interface SponsorBannerProps {
  sponsor: 'fire' | 'consulting' | 'boats' | 'chronicle' | 'gold' | 'mining' | 'listings';
}

const sponsorData = {
  fire: {
    name: 'Alaska Fires',
    tagline: 'Wildfire Safety & Prevention Information',
    url: 'https://alaskafires.com',
    className: 'sponsor-banner-fire',
    textColor: 'text-white'
  },
  consulting: {
    name: 'Alaska Consulting Group',
    tagline: 'Professional Business Solutions for the Last Frontier',
    url: 'https://alaskaconsultinggroup.com',
    className: 'sponsor-banner-corporate',
    textColor: 'text-white'
  },
  boats: {
    name: 'Alaskan Boats',
    tagline: 'Your Source for Watercraft in the North',
    url: 'https://alaskanboats.com',
    className: 'sponsor-banner-maritime',
    textColor: 'text-white'
  },
  chronicle: {
    name: 'Anchorage Chronicle',
    tagline: '"In a world of national headlines and distant concerns, we chose to focus on what matters most: the stories of our neighbors, our communities, and our home"',
    url: 'https://anchoragechronicle.com',
    className: 'sponsor-banner-chronicle',
    textColor: 'text-white'
  },
  gold: {
    name: 'Alaska Gold News',
    tagline: 'Premium Mining & Precious Metals Coverage',
    url: 'https://alaskagoldnews.com',
    className: 'sponsor-banner-gold',
    textColor: 'text-gold-premium'
  },
  mining: {
    name: 'Alaska Mining Equipment',
    tagline: 'Industrial Equipment for Alaska\'s Toughest Jobs',
    url: 'https://alaskaminingequipment.com',
    className: 'sponsor-banner-industrial',
    textColor: 'text-white'
  },
  listings: {
    name: 'Alaska Listings',
    tagline: 'FREE 60-day listings! List your property, equipment, or services today.',
    url: 'https://alaskalistings.com',
    className: 'sponsor-banner-tech',
    textColor: 'text-white'
  }
};

const SponsorBanner = ({ sponsor }: SponsorBannerProps) => {
  const data = sponsorData[sponsor];

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`sponsor-banner ${data.className} group`}
    >
      <div className="flex items-center gap-4 flex-wrap justify-center text-center">
        <span className={`font-serif font-bold ${data.textColor}`}>
          {data.name}
        </span>
        <span className={`text-sm ${data.textColor} opacity-90 max-w-xl`}>
          {data.tagline}
        </span>
        <ExternalLink className={`h-4 w-4 ${data.textColor} opacity-70 group-hover:opacity-100 transition-opacity`} />
      </div>
    </a>
  );
};

export default SponsorBanner;
