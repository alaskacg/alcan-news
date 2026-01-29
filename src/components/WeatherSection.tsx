import { Cloud, Thermometer, Wind, Droplets, Eye } from 'lucide-react';

const locations = [
  { name: 'Tok', temp: -15, high: -8, low: -28, condition: 'Partly Cloudy', wind: 8, humidity: 65, visibility: 10 },
  { name: 'Delta Junction', temp: -18, high: -12, low: -32, condition: 'Cloudy', wind: 5, humidity: 70, visibility: 8 },
  { name: 'Fairbanks', temp: -22, high: -15, low: -38, condition: 'Clear', wind: 3, humidity: 55, visibility: 15 },
  { name: 'Glennallen', temp: -12, high: -5, low: -25, condition: 'Light Snow', wind: 12, humidity: 75, visibility: 5 },
];

const WeatherSection = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Regional Weather</h2>
        
        {/* Windy Map Embed */}
        <div className="mb-8 rounded-lg overflow-hidden border border-border">
          <iframe
            title="Alaska Weather Radar"
            width="100%"
            height="400"
            src="https://embed.windy.com/embed2.html?lat=63.5&lon=-152&detailLat=64.8&detailLon=-147.7&width=650&height=400&zoom=4&level=surface&overlay=radar&product=radar&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1"
            frameBorder="0"
            className="w-full"
          />
        </div>

        {/* Location Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((location) => (
            <div key={location.name} className="glass-card p-4">
              <h3 className="font-serif font-bold text-foreground mb-3">{location.name}</h3>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-4xl font-bold text-foreground">{location.temp}°</span>
                  <span className="text-sm text-muted-foreground ml-1">F</span>
                </div>
                <Cloud className="h-10 w-10 text-glacier-blue" />
              </div>

              <p className="text-sm text-primary mb-3">{location.condition}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">H/L</span>
                  <span className="text-foreground">{location.high}° / {location.low}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Wind className="h-3 w-3" /> Wind
                  </span>
                  <span className="text-foreground">{location.wind} mph</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Droplets className="h-3 w-3" /> Humidity
                  </span>
                  <span className="text-foreground">{location.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Eye className="h-3 w-3" /> Visibility
                  </span>
                  <span className="text-foreground">{location.visibility} mi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
