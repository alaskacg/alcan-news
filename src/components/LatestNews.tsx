import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { ChevronRight, Clock, Tag } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  featured: boolean;
  published_at: string;
}

const fallbackArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Alaska Highway Celebrates 80+ Years of Connecting Communities',
    excerpt: 'The historic Alcan Highway continues to serve as a vital lifeline for Interior Alaska communities, with ongoing improvements planned for 2026.',
    content: '',
    category: 'History',
    image_url: null,
    featured: false,
    published_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Delta Junction Buffalo Herd Thriving Despite Harsh Winter',
    excerpt: 'Wildlife officials report the Delta bison herd remains healthy with over 400 animals, despite temperatures dropping to -40°F.',
    content: '',
    category: 'Wildlife',
    image_url: null,
    featured: false,
    published_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Tok School District Announces New STEM Program',
    excerpt: 'Students in the Gateway to Alaska will have access to enhanced science and technology curriculum starting next semester.',
    content: '',
    category: 'Education',
    image_url: null,
    featured: false,
    published_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Ice Road to Remote Communities Opens Early',
    excerpt: 'Favorable cold temperatures allow ice roads to open two weeks ahead of schedule, bringing relief to isolated villages.',
    content: '',
    category: 'Transportation',
    image_url: null,
    featured: false,
    published_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Northern Lights Tourism Boosts Local Economy',
    excerpt: 'Fairbanks-area businesses report increased winter tourism as aurora hunters flock to Interior Alaska.',
    content: '',
    category: 'Tourism',
    image_url: null,
    featured: false,
    published_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Community Rallies for Annual Sled Dog Race',
    excerpt: 'Volunteers prepare trails and checkpoints for this weekend\'s popular mushing event in Tok.',
    content: '',
    category: 'Sports',
    image_url: null,
    featured: false,
    published_at: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Pipeline Maintenance Creates Jobs in Glennallen',
    excerpt: 'Trans-Alaska Pipeline System maintenance projects bring employment opportunities to the Copper River Basin.',
    content: '',
    category: 'Economy',
    image_url: null,
    featured: false,
    published_at: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Local Trappers Report Good Fur Season',
    excerpt: 'Traditional trappers along the highway corridor report healthy fur-bearer populations and fair prices at auction.',
    content: '',
    category: 'Outdoors',
    image_url: null,
    featured: false,
    published_at: new Date().toISOString()
  }
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'History': 'bg-warning/20 text-warning',
    'Wildlife': 'bg-aurora-green/20 text-aurora-green',
    'Education': 'bg-primary/20 text-primary',
    'Transportation': 'bg-glacier-blue/20 text-glacier-blue',
    'Tourism': 'bg-glacier-teal/20 text-glacier-teal',
    'Sports': 'bg-destructive/20 text-destructive',
    'Economy': 'bg-gold-premium/20 text-gold-premium',
    'Outdoors': 'bg-aurora-green/20 text-aurora-green',
  };
  return colors[category] || 'bg-muted text-muted-foreground';
};

const LatestNews = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: articles } = useQuery({
    queryKey: ['news_articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(8);
      
      if (error) throw error;
      return data as NewsArticle[];
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const displayArticles = articles && articles.length > 0 ? articles : fallbackArticles;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Latest News</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayArticles.map((article) => (
            <article
              key={article.id}
              className={`news-card cursor-pointer transition-all duration-300 ${
                expandedId === article.id ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
              onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-foreground mb-2 line-clamp-2">
                  {article.title}
                </h3>

                <p className={`text-sm text-muted-foreground mb-3 ${
                  expandedId === article.id ? '' : 'line-clamp-3'
                }`}>
                  {article.excerpt}
                </p>

                {expandedId === article.id && article.content && (
                  <p className="text-sm text-foreground mb-4">
                    {article.content}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <span>{expandedId === article.id ? 'Less' : 'More'}</span>
                    <ChevronRight className={`h-3 w-3 transition-transform ${
                      expandedId === article.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
