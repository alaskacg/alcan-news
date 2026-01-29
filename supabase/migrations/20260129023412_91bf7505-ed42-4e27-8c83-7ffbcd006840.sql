-- Create News Articles table
CREATE TABLE public.news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'local',
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create Alerts table (weather, safety, community)
CREATE TABLE public.alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Ticker Messages table
CREATE TABLE public.ticker_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  message TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticker_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access for news articles"
ON public.news_articles
FOR SELECT
USING (true);

CREATE POLICY "Public read access for active alerts"
ON public.alerts
FOR SELECT
USING (active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Public read access for active ticker messages"
ON public.ticker_messages
FOR SELECT
USING (active = true);

-- Service role full access policies
CREATE POLICY "Service role full access for news articles"
ON public.news_articles
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role full access for alerts"
ON public.alerts
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role full access for ticker messages"
ON public.ticker_messages
FOR ALL
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();