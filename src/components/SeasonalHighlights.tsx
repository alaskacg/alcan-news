import { Sun, Moon, Sparkles, Thermometer } from 'lucide-react';

const SeasonalHighlights = () => {
  // Mock data for Fairbanks area
  const daylight = {
    sunrise: '10:24 AM',
    sunset: '4:42 PM',
    totalLight: '6h 18m',
    change: '+4 min/day'
  };

  const aurora = {
    forecast: 'Moderate',
    kpIndex: 4,
    visibility: 'Good chance tonight'
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Daylight Tracker */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-warning/20 rounded-lg">
                <Sun className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-lg font-serif font-bold text-foreground">Daylight Tracker</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Sunrise</span>
                <span className="font-medium text-foreground">{daylight.sunrise}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Sunset</span>
                <span className="font-medium text-foreground">{daylight.sunset}</span>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Daylight</span>
                  <span className="font-bold text-primary">{daylight.totalLight}</span>
                </div>
                <p className="text-xs text-aurora-green mt-1">{daylight.change} gaining</p>
              </div>
            </div>
          </div>

          {/* Aurora Forecast */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-aurora-green/20 rounded-lg">
                <Sparkles className="h-6 w-6 text-aurora-green" />
              </div>
              <h3 className="text-lg font-serif font-bold text-foreground">Aurora Forecast</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Activity Level</span>
                <span className="font-medium text-aurora-green">{aurora.forecast}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Kp Index</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-3 h-6 rounded-sm ${
                          level <= aurora.kpIndex ? 'bg-aurora-green' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">{aurora.kpIndex}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-glacier-blue">{aurora.visibility}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalHighlights;
