import Link from "next/link";
import { Linkedin, Instagram, MessageCircleMore } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-primary/15 bg-black/55 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Nav */}
          <div>
            <h4 className="font-heading text-[0.62rem] tracking-[0.32em] text-primary mb-5 text-glow-amber">
              Quick Navigation
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "Operational Units", path: "/operational-units" },
                { label: "Mission Archive", path: "/mission-archive" },
                { label: "Headquarters", path: "/headquarters" },
                { label: "Strike Team", path: "/strike-team" },
                { label: "Contact Point", path: "/contact" },
              ].map((l) => (
                <Link
                  key={l.path}
                  href={l.path}
                  className="text-[0.85rem] text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-[0.62rem] tracking-[0.32em] text-primary mb-5 text-glow-amber">
              Contact Intel
            </h4>
            <div className="flex flex-col gap-2.5 text-[0.85rem] text-muted-foreground">
              <a
                href="mailto:base8headquarters@gmail.com"
                className="hover:text-primary transition-colors duration-200 tracking-wide"
              >
                base8headquarters@gmail.com
              </a>
              <a
                href="https://wa.me/923396006135"
                className="hover:text-primary transition-colors duration-200 tracking-wide"
              >
                +92 339 6006135
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-[0.62rem] tracking-[0.32em] text-primary mb-5 text-glow-amber">
              Social Channels
            </h4>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/base8hq/" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/base8hq" },
                { icon: MessageCircleMore, label: "WhatsApp", href: "https://wa.me/923396006135" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border border-primary/25 rounded-sm text-muted-foreground hover:text-primary hover:border-primary/55 hover:bg-primary/8 transition-all duration-300"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="glow-separator mt-10 mb-6" />
        <p className="text-center text-[0.6rem] text-muted-foreground font-heading tracking-[0.3em]">
          © 2026 BASE8HQ — All Systems Operational
        </p>
      </div>
    </footer>
  );
};

export default Footer;
