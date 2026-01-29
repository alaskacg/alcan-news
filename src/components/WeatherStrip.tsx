import { Cloud, Thermometer, Wind, Droplets } from 'lucide-react';

const locations = [
  { name: 'Tok', temp: -15, condition: 'Partly Cloudy', wind: 8 },
  { name: 'Delta Junction', temp: -18, condition: 'Cloudy', wind: 5 },
  { name: 'Fairbanks', temp: -22, condition: 'Clear', wind: 3 },
  { name: 'Glennallen', temp: -12, condition: 'Snow', wind: 12 },
];

const WeatherStrip = () => {
  return (
    <div className="bg-card/50 border-b border-border py-3 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between overflow-x-auto gap-6">
          {locations.map((location) => (
            <div key={location.name} className="flex items-center gap-3 min-w-fit">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{location.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Thermometer className="h-4 w-4 text-glacier-blue" />
                  <span className="text-lg font-bold text-foreground">{location.temp}°F</span>
                </div>
              </div>
              <div className="flex flex-col items-start text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Cloud className="h-3 w-3" />
                  <span>{location.condition}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="h-3 w-3" />
                  <span>{location.wind} mph</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherStrip;
