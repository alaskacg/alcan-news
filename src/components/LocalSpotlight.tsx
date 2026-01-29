import { Star, Heart, Award } from 'lucide-react';

const spotlights = [
  {
    type: 'Business',
    title: 'Fast Eddy\'s Restaurant',
    description: 'Celebrating 25 years of serving travelers and locals at the crossroads of the Alaska Highway.',
    location: 'Tok, AK',
    icon: Star
  },
  {
    type: 'Community Hero',
    title: 'Volunteer Fire Department',
    description: 'Delta Junction volunteers responded to 150+ calls last year, serving our community with dedication.',
    location: 'Delta Junction',
    icon: Heart
  },
  {
    type: 'Milestone',
    title: 'Historic Rika\'s Roadhouse',
    description: 'The beloved landmark celebrates another year of preserving Alaska Highway history for visitors.',
    location: 'Big Delta',
    icon: Award
  }
];

const LocalSpotlight = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Local Spotlight</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {spotlights.map((spotlight, index) => {
            const Icon = spotlight.icon;
            return (
              <div key={index} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {spotlight.type}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-foreground mb-2">
                  {spotlight.title}
                </h3>

                <p className="text-muted-foreground mb-4">
                  {spotlight.description}
                </p>

                <p className="text-sm text-glacier-blue">
                  📍 {spotlight.location}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LocalSpotlight;
