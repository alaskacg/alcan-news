import { motion } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/hero-alcan.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Additional ambient effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-green/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-glacier-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo and Title */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4 text-shadow-lg">
              <span className="gradient-text">Alcan</span> News
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 font-light text-shadow-sm">
              Your Window to the Alaska Highway Corridor
            </p>
          </div>

          {/* Region indicator */}
          <div className="flex items-center justify-center gap-2 text-glacier-blue mb-8">
            <MapPin className="h-5 w-5" />
            <span className="text-sm uppercase tracking-wider text-shadow-sm">
              Serving Tok • Delta Junction • Fairbanks • Glennallen
            </span>
          </div>

          {/* Featured story teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card max-w-2xl mx-auto p-6"
          >
            <span className="inline-block bg-destructive/20 text-destructive px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
              Breaking
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
              Alaska Highway Winter Maintenance Updates
            </h2>
            <p className="text-muted-foreground mb-4">
              DOT announces increased snow removal operations along the Alcan corridor as winter storms move in. 
              Travelers advised to check conditions before departure.
            </p>
            <button className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors">
              <span className="font-medium">Read Full Story</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
