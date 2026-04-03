import { Link } from "react-router-dom";
import { Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Nav */}
          <div>
            <h4 className="font-heading text-xs tracking-widest text-primary mb-4">Quick Navigation</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", path: "/" },
                { label: "Operational Units", path: "/operational-units" },
                { label: "Mission Archive", path: "/mission-archive" },
                { label: "Headquarters", path: "/headquarters" },
                { label: "Strike Team", path: "/strike-team" },
                { label: "Contact Point", path: "/contact" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xs tracking-widest text-primary mb-4">Contact Intel</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>ops@base8hq.com</span>
              <span>+1 (555) 808-BASE</span>
              <span>HQ District, Innovation Tower, Floor 8</span>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-xs tracking-widest text-primary mb-4">Social Channels</h4>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border border-primary/30 rounded-sm text-muted-foreground hover:text-primary hover:border-primary/60 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="glow-separator mt-10 mb-6" />
        <p className="text-center text-xs text-muted-foreground font-heading tracking-widest">
          © 2026 BASE8HQ — All Systems Operational
        </p>
      </div>
    </footer>
  );
};

export default Footer;
