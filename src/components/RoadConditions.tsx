import { Car, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const roads = [
  {
    name: 'Alaska Highway (Tok to Delta)',
    status: 'good',
    conditions: 'Plowed and sanded',
    lastUpdate: '2 hours ago',
    alerts: []
  },
  {
    name: 'Richardson Highway',
    status: 'caution',
    conditions: 'Icy patches, reduced visibility',
    lastUpdate: '1 hour ago',
    alerts: ['Slow traffic near Big Delta']
  },
  {
    name: 'Glenn Highway',
    status: 'good',
    conditions: 'Clear, dry conditions',
    lastUpdate: '3 hours ago',
    alerts: []
  },
  {
    name: 'Tok Cutoff',
    status: 'warning',
    conditions: 'Active snow removal',
    lastUpdate: '30 min ago',
    alerts: ['Delays expected', 'Follow pilot car']
  }
];

const RoadConditions = () => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'good':
        return { bg: 'bg-aurora-green/20', text: 'text-aurora-green', icon: CheckCircle };
      case 'caution':
        return { bg: 'bg-warning/20', text: 'text-warning', icon: AlertTriangle };
      case 'warning':
        return { bg: 'bg-destructive/20', text: 'text-destructive', icon: AlertTriangle };
      default:
        return { bg: 'bg-muted', text: 'text-muted-foreground', icon: Car };
    }
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Car className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-serif font-bold text-foreground">Road Conditions</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {roads.map((road) => {
            const styles = getStatusStyles(road.status);
            const StatusIcon = styles.icon;
            
            return (
              <div key={road.name} className="glass-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif font-bold text-foreground">{road.name}</h3>
                  <div className={`p-1.5 rounded-full ${styles.bg}`}>
                    <StatusIcon className={`h-4 w-4 ${styles.text}`} />
                  </div>
                </div>

                <p className="text-sm text-foreground mb-2">{road.conditions}</p>

                {road.alerts.length > 0 && (
                  <div className="space-y-1 mb-3">
                    {road.alerts.map((alert, index) => (
                      <p key={index} className="text-xs text-warning flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {alert}
                      </p>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Updated {road.lastUpdate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoadConditions;
