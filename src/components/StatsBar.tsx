import { useState, useEffect } from 'react';
import { Clock, Users, Wifi } from 'lucide-react';

const StatsBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readerCount, setReaderCount] = useState(Math.floor(Math.random() * 150) + 50);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const readerInterval = setInterval(() => {
      setReaderCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(readerInterval);
    };
  }, []);

  const formatAlaskaTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      timeZone: 'America/Anchorage',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-secondary/50 border-b border-border py-2 px-4">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span>{formatAlaskaTime(currentTime)} AKST</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Wifi className="h-4 w-4 text-aurora-green" />
              <span className="text-aurora-green text-xs">LIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>{readerCount.toLocaleString()} readers online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
