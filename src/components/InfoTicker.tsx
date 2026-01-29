import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Fish, Calendar, Thermometer, Car, MapPin } from 'lucide-react';

interface TickerMessage {
  id: string;
  label: string;
  message: string;
}

const fallbackMessages: TickerMessage[] = [
  { id: '1', label: 'ROAD', message: 'Alaska Highway: Plowed and sanded between mileposts 1300-1400' },
  { id: '2', label: 'EVENTS', message: 'Tok Dog Mushers Race this Saturday — Community welcome!' },
  { id: '3', label: 'WEATHER', message: 'Extreme cold warning: -40°F expected overnight in Fairbanks' },
  { id: '4', label: 'TRAVEL', message: 'Richardson Highway: Minor delays near Big Delta for maintenance' },
  { id: '5', label: 'COMMUNITY', message: 'Delta Junction Library hosting winter reading program' },
];

const getLabelIcon = (label: string) => {
  switch (label.toUpperCase()) {
    case 'ROAD':
    case 'TRAVEL':
      return <Car className="h-3 w-3" />;
    case 'FISHING':
      return <Fish className="h-3 w-3" />;
    case 'EVENTS':
    case 'COMMUNITY':
      return <Calendar className="h-3 w-3" />;
    case 'WEATHER':
      return <Thermometer className="h-3 w-3" />;
    default:
      return <MapPin className="h-3 w-3" />;
  }
};

const InfoTicker = () => {
  const { data: messages } = useQuery({
    queryKey: ['ticker_messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ticker_messages')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as TickerMessage[];
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const displayMessages = messages && messages.length > 0 ? messages : fallbackMessages;

  return (
    <div className="bg-card border-y border-border overflow-hidden py-2">
      <div className="flex ticker-scroll">
        {[...displayMessages, ...displayMessages].map((msg, index) => (
          <div key={`${msg.id}-${index}`} className="flex items-center gap-4 px-8 whitespace-nowrap">
            <span className="inline-flex items-center gap-1 bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-semibold uppercase">
              {getLabelIcon(msg.label)}
              {msg.label}
            </span>
            <span className="text-sm text-foreground">{msg.message}</span>
            <span className="text-muted-foreground/30">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoTicker;
