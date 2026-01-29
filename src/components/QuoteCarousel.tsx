import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "The Alaska Highway is more than a road—it's a journey through history and wilderness.",
    author: "Local Historian",
    location: "Tok"
  },
  {
    text: "In the Interior, we don't just survive winter—we embrace it.",
    author: "Delta Junction Resident",
    location: "Delta Junction"
  },
  {
    text: "Every mile of the Alcan tells a story of determination and adventure.",
    author: "Highway Traveler",
    location: "Along the Highway"
  },
  {
    text: "Our communities may be small, but our spirit is as vast as Alaska itself.",
    author: "Community Leader",
    location: "Glennallen"
  },
];

const QuoteCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-3xl">
        <div className="relative h-40 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote className="h-8 w-8 text-primary/50 mx-auto mb-4" />
              <blockquote className="text-xl md:text-2xl font-serif italic text-foreground mb-4">
                "{quotes[currentIndex].text}"
              </blockquote>
              <cite className="text-muted-foreground not-italic">
                — {quotes[currentIndex].author}, <span className="text-primary">{quotes[currentIndex].location}</span>
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuoteCarousel;
