import { Mountain, Snowflake, Thermometer, MapPin } from 'lucide-react';

const trailConditions = [
  { name: 'Granite Tors Trail', status: 'Open', snow: '24"', groomed: true },
  { name: 'Chena Hot Springs Trail', status: 'Open', snow: '18"', groomed: true },
  { name: 'Delta Range Trails', status: 'Caution', snow: '36"', groomed: false },
];

const hotSprings = [
  { name: 'Chena Hot Springs', status: 'Open', temp: '106°F' },
  { name: 'Manley Hot Springs', status: 'Open', temp: '100°F' },
];

const OutdoorRecreation = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Mountain className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-serif font-bold text-foreground">Outdoor Recreation</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Trail Conditions */}
          <div className="glass-card p-5">
            <h3 className="font-serif font-bold text-foreground mb-4 flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-glacier-blue" />
              Trail Conditions
            </h3>
            <div className="space-y-3">
              {trailConditions.map((trail) => (
                <div key={trail.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{trail.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Snow depth: {trail.snow} • {trail.groomed ? 'Groomed' : 'Ungroomed'}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    trail.status === 'Open' 
                      ? 'bg-aurora-green/20 text-aurora-green' 
                      : 'bg-warning/20 text-warning'
                  }`}>
                    {trail.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Springs */}
          <div className="glass-card p-5">
            <h3 className="font-serif font-bold text-foreground mb-4 flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-coral-warm" />
              Hot Springs
            </h3>
            <div className="space-y-3">
              {hotSprings.map((spring) => (
                <div key={spring.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{spring.name}</p>
                      <p className="text-xs text-muted-foreground">Water temp: {spring.temp}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-aurora-green/20 text-aurora-green">
                    {spring.status}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Perfect for warming up after a cold day on the trails!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutdoorRecreation;
