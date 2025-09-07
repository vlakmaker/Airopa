import { Mail, Rss, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-serif font-medium text-primary mb-3">
                AIropa<span className="text-accent">.news</span>
              </h3>
              <p className="text-body text-muted-foreground mb-4 max-w-md">
                Signals from the European AI frontier. Curating the most important 
                developments in artificial intelligence across the continent.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="RSS Feed"
                >
                  <Rss className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Content</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Latest News
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Startup Database
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Policy Tracker
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Country Insights
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Advertise
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    RSS
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-6">
                <span>© {currentYear} AIropa.news</span>
                <a href="#" className="hover:text-accent transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  Privacy
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>Made with ❄️ in Europe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};