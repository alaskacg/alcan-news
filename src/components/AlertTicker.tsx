import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface Alert {
  id: string;
  message: string;
  severity: string;
}

const fallbackAlerts: Alert[] = [
  { id: '1', message: 'ROAD CONDITIONS: Alaska Highway between Tok and Delta Junction — Icy patches reported, drive with caution', severity: 'warning' },
  { id: '2', message: 'WEATHER ADVISORY: Snow expected tonight along the highway corridor, 4-6 inches possible', severity: 'warning' },
  { id: '3', message: 'COMMUNITY: Delta Junction Winter Carnival this weekend — Bundle up and join the fun!', severity: 'info' },
];

const AlertTicker = () => {
  const { data: alerts } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Alert[];
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const displayAlerts = alerts && alerts.length > 0 ? alerts : fallbackAlerts;

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/20 border-destructive text-destructive';
      case 'warning':
        return 'bg-warning/20 border-warning text-warning';
      default:
        return 'bg-primary/20 border-primary text-primary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-secondary border-b border-border overflow-hidden py-2">
      <div className="flex alert-ticker-scroll">
        {[...displayAlerts, ...displayAlerts].map((alert, index) => (
          <div
            key={`${alert.id}-${index}`}
            className={`flex items-center gap-2 px-6 py-1 mx-2 rounded-full border ${getSeverityStyles(alert.severity)} whitespace-nowrap`}
          >
            {getSeverityIcon(alert.severity)}
            <span className="text-sm font-medium">{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertTicker;
