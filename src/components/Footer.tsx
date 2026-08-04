import Link from "next/link";
import { Linkedin, Instagram, MessageCircleMore } from "lucide-react";

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
                <Link key={l.path} href={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xs tracking-widest text-primary mb-4">Contact Intel</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:base8headquarters@gmail.com" className="hover:text-primary transition-colors">
                base8headquarters@gmail.com
              </a>
              <a href="https://wa.me/923396006135" className="hover:text-primary transition-colors">
                +92 339 6006135
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-xs tracking-widest text-primary mb-4">Social Channels</h4>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/base8hq/" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/base8hq" },
                { icon: MessageCircleMore, label: "WhatsApp", href: "https://wa.me/923396006135" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
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
