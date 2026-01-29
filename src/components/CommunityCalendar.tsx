import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const events = [
  {
    title: 'Tok Dog Mushers Association Race',
    date: 'Feb 1, 2026',
    time: '10:00 AM',
    location: 'Tok, AK',
    type: 'Sports'
  },
  {
    title: 'Delta Junction Winter Carnival',
    date: 'Feb 8-9, 2026',
    time: 'All Day',
    location: 'Delta Junction',
    type: 'Community'
  },
  {
    title: 'Ice Fishing Derby',
    date: 'Feb 15, 2026',
    time: '7:00 AM',
    location: 'Quartz Lake',
    type: 'Recreation'
  },
  {
    title: 'Northern Lights Photography Workshop',
    date: 'Feb 22, 2026',
    time: '9:00 PM',
    location: 'Fairbanks',
    type: 'Education'
  },
  {
    title: 'Alcan Highway History Presentation',
    date: 'Mar 1, 2026',
    time: '6:00 PM',
    location: 'Tok Library',
    type: 'History'
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Sports': return 'bg-destructive/20 text-destructive';
    case 'Community': return 'bg-primary/20 text-primary';
    case 'Recreation': return 'bg-aurora-green/20 text-aurora-green';
    case 'Education': return 'bg-glacier-blue/20 text-glacier-blue';
    case 'History': return 'bg-warning/20 text-warning';
    default: return 'bg-muted text-muted-foreground';
  }
};

const CommunityCalendar = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-serif font-bold text-foreground">Community Calendar</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <div key={index} className="glass-card p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${getTypeColor(event.type)}`}>
                  {event.type}
                </span>
              </div>
              
              <h3 className="font-serif font-bold text-foreground mb-3">{event.title}</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityCalendar;
