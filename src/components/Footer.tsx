import { Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const regionalNews = [
    { name: 'Chugach News', url: 'https://chugachnews.com' },
    { name: 'Anchorage Chronicle', url: 'https://anchoragechronicle.com' },
    { name: 'Kenai News', url: 'https://kenainews.com' },
  ];

  return (
    <footer className="bg-secondary/50 border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl font-serif font-bold">
                <span className="gradient-text">Alcan</span> News
              </h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted source for news along the Alaska Highway corridor. 
              Serving Tok, Delta Junction, Fairbanks, Glennallen, and communities 
              throughout Interior Alaska since the opening of the Alcan Highway.
            </p>
          </div>

          {/* Regional News Links */}
          <div>
            <h3 className="font-serif font-bold text-foreground mb-4">
              Alaska News Corporation
            </h3>
            <ul className="space-y-2">
              {regionalNews.map((site) => (
                <li key={site.name}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {site.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold text-foreground mb-4">Contact</h3>
            <a
              href="mailto:support@alaskanewscorporation.com"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
            >
              <Mail className="h-4 w-4" />
              support@alaskanewscorporation.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Alaska News Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
