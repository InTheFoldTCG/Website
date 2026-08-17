import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Menu,
  X,
  Mail,
  Tag,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import logo from "@/imports/Untitled (1).svg";

const GAMES = [
  {
    name: "Pokémon TCG",
    abbr: "PKM",
    desc: "Vintage and modern sets, holos, graded slabs, and bulk.",
    color: "#e84040",
  },
  {
    name: "Magic: The Gathering",
    abbr: "MTG",
    desc: "Singles, sealed product, Commander staples, and more.",
    color: "#c2973a",
  },
  {
    name: "One Piece TCG",
    abbr: "OP",
    desc: "Full booster sets and sought-after alternate art leaders.",
    color: "#2277cc",
  },
  {
    name: "Disney Lorcana",
    abbr: "LRC",
    desc: "New chapters in stock. Enchanted cards always available.",
    color: "#338866",
  },
];

const SHOWS = [
  {
    name: "West Valley TCG Expo 6",
    date: "Saturday Sep 26 & Sunday Sep 27",
    location: "20570 West Roosevelt St, Buckeye, AZ 85326",
    table: "Table 45",
    status: "confirmed",
  },
  {
    name: "TBD",
    date: "Sep 2026",
    location: "Phoenix, AZ",
    table: "Table 231",
    status: "upcoming",
  },
  {
    name: "TBD",
    date: "Oct 2026",
    location: "Phoenix, AZ",
    table: "TBD",
    status: "upcoming",
  },
  {
    name: "TBD",
    date: "Dec 2026",
    location: "Phoenix, AZ",
    table: "TBD",
    status: "upcoming",
  },
];

const SERVICES = [
  {
    icon: ShoppingBag,
    label: "Buy",
    desc: "Singles, sealed product, and collections sourced from across the hobby.",
    href: "https://app.getcollectr.com/showcase/profile/@inthefoldtcg",
  },
  {
    icon: Tag,
    label: "Sell",
    desc: "Competitive prices on singles, lots, and sealed product. Walk-ins welcome at shows.",
  },
  {
    icon: RefreshCw,
    label: "Trade",
    desc: "We love to trade. Bring your binders to our table or reach out and let’s make a deal.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const GOOGLE_FORM_ID = "1FAIpQLSfzjjJy1P8wQh7Wtxz4sVXw9NcwcXi0REwp26GCnCmnv03hRg";
    const GOOGLE_EMAIL_ENTRY_ID = "entry.117977572";
    const formData = new FormData();
    formData.append(GOOGLE_EMAIL_ENTRY_ID, email);

    fetch(`https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
      .then(() => {
        setSubscribed(true);
        setEmail("");
      })
      .catch((error) => {
        console.error("Submission failed:", error);
        alert("Something went wrong. Please try again.");
      });
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={logo}
              alt="In The Fold TF logo"
              className="h-7 w-auto object-contain invert"
            />
            <span
              className="text-xs tracking-[0.25em] uppercase text-foreground/60"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              In The Fold
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Shows", href: "#shows" },
              { label: "Inventory", href: "#inventory" },
              { label: "Buy · Sell · Trade", href: "#services" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-5 flex flex-col gap-5">
            {[
              { label: "Shows", href: "#shows" },
              { label: "Inventory", href: "#inventory" },
              { label: "Buy · Sell · Trade", href: "#services" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontFamily: "'Space Mono', monospace" }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-10 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,237,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[600px] h-[500px] pointer-events-none blur-[160px] opacity-[0.06]"
          style={{ background: "#b5ff00" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="text-xs tracking-[0.35em] uppercase text-primary mb-6"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              In The Fold TCG
            </div>
            <h1
              className="text-[clamp(3.5rem,10vw,7.5rem)] font-bold leading-[0.88] uppercase mb-8"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Find Us <br />
              <span className="text-primary">At The</span> <br /> Show
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-10">
              In The Fold is a local TCG vendor setting up at card shows across the
              Valley. We carry a varied portfolio of slabs, sealed product, and
              singles. Come by our table, bring your binders, and see what we have
              in stock!
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#shows"
                className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Upcoming Shows{" "}
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
              <a
                href="#services"
                className="flex items-center gap-2 px-6 py-3 border border-border text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Buy · Sell · Trade
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute inset-0 blur-[80px] scale-90 opacity-15 pointer-events-none"
                style={{ background: "#b5ff00" }}
              />
              <ImageWithFallback
                src={logo}
                alt="In The Fold geometric TF logo"
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain invert opacity-85"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* UPCOMING SHOWS */}
      <section id="shows" className="py-14 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div
                className="text-[10px] tracking-[0.35em] uppercase text-primary mb-4"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                — Show Schedule
              </div>
              <h2
                className="text-5xl md:text-6xl font-bold uppercase"
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Find Our Table
              </h2>
            </div>
            <p
              className="text-xs text-muted-foreground max-w-xs leading-relaxed"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              We attend shows across the Valley. Sign up below to get notified when
              the schedule updates!
            </p>
          </div>

       <div className="flex flex-col gap-px" style={{ background: "rgba(255,255,255,0.07)" }}>
            {SHOWS.map((show, i) => (
              <div key={i} className="bg-background hover:bg-card transition-colors group">
                <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-[140px_1fr_220px_120px] gap-6 items-center">
                  <div className="flex items-center gap-2">
                    <Calendar size={11} className="text-primary shrink-0" />
                    <span className="text-xs tracking-wider text-primary" style={{ fontFamily: "'Space Mono', monospace" }}>
                      {show.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold uppercase truncate" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                    {show.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <MapPin size={11} className="text-muted-foreground shrink-0" />
                    <span className="text-xs text-muted-foreground tracking-wide truncate" style={{ fontFamily: "'Space Mono', monospace" }}>
                      {show.location}
                    </span>
                  </div>
                  <div className="flex items-center lg:justify-end">
                    <span
                      className="text-xs px-3 py-1 border whitespace-nowrap"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        borderColor: show.table === "TBD" ? "rgba(255,255,255,0.12)" : "rgba(181,255,0,0.4)",
                        color: show.table === "TBD" ? "#7878a0" : "#b5ff00",
                      }}
                    >
                      {show.table}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div
              className="text-[10px] tracking-[0.35em] uppercase text-primary mb-4"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              — What We Do
            </div>
            <h2
              className="text-5xl md:text-6xl font-bold uppercase"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Buy · Sell · Trade
            </h2>
          </div>

       <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            {SERVICES.map(({ icon: Icon, label, desc, href }) => (
              <a
                key={label}
                href={href || "#"}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener noreferrer" : undefined}
                className="bg-background p-10 hover:bg-card transition-colors group block"
              >
                <Icon
                  size={28}
                  className="text-primary mb-6 group-hover:scale-110 transition-transform"
                />
                <h3
                  className="text-2xl font-bold uppercase mb-4"
                  style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                >
                  {label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </a>
            ))}
          </div>

          <div
            className="mt-px p-8 bg-card hover:bg-card/80 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{
              background: "rgba(181,255,0,0.04)",
              borderTop: "1px solid rgba(181,255,0,0.15)",
            }}
          >
            <div>
              <div
                className="text-xs tracking-widest uppercase text-primary mb-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Selling a collection?
              </div>
              <p className="text-sm text-muted-foreground">
                Bring it to any show or reach out ahead of time. We buy bulk,
                binders, and sealed product.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary text-xs tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Get in Touch <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* INVENTORY */}
      <section id="inventory" className="py-14 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div
              className="text-[10px] tracking-[0.35em] uppercase text-primary mb-4"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              — What We Carry
            </div>
            <h2
              className="text-5xl md:text-6xl font-bold uppercase"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Games In Stock
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            {GAMES.map((game) => (
              <div
                key={game.name}
                className="bg-background p-8 hover:bg-card transition-colors group"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3
                    className="text-xl font-bold uppercase leading-tight"
                    style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                  >
                    {game.name}
                  </h3>
                  <span
                    className="shrink-0 text-[10px] px-2 py-0.5 border font-bold"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      borderColor: `${game.color}66`,
                      color: game.color,
                    }}
                  >
                    {game.abbr}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {game.desc}
                </p>
              </div>
            ))}
          </div>
          <p
            className="mt-6 text-xs text-muted-foreground/60 tracking-wide"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Don't see your game? Ask at the table — inventory varies by show.
          </p>
        </div>
      </section>

      {/* BRICK & MORTAR TEASER */}
      <section className="py-14 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="relative overflow-hidden p-10 md:p-16"
            style={{
              background: "#0e0e14",
              border: "1px solid rgba(181,255,0,0.1)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none blur-[100px] opacity-[0.08]"
              style={{ background: "#b5ff00" }}
            />
            <div className="relative">
              <div
                className="text-[10px] tracking-[0.35em] uppercase text-primary mb-4"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                — What's Next
              </div>
              <h2
                className="text-5xl md:text-6xl font-bold uppercase mb-6"
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                A Shop <span className="text-primary">Coming</span> Soon
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                We are working toward opening our own brick-and-mortar location
                right here in Phoenix. Our goal is to build a clean, permanent
                home for the local Valley tabletop community featuring dedicated
                singles cases, comfortable custom table seating, and plenty of space
                to play. We will share more details as we get closer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & NEWSLETTER */}
      <section id="contact" className="py-14 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Newsletter */}
          <div>
            <div
              className="text-[10px] tracking-[0.35em] uppercase text-primary mb-4"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              — Stay Updated
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold uppercase mb-4"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Show <br /> Updates
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Get notified when we add new shows, update our schedule, or have
              news about the shop.
            </p>

            {subscribed ? (
              <div
                className="flex items-center gap-3 p-5 border"
                style={{
                  borderColor: "rgba(181,255,0,0.3)",
                  background: "rgba(181,255,0,0.05)",
                }}
              >
                <Mail size={14} className="text-primary shrink-0" />
                <span
                  className="text-sm tracking-wider text-primary"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  You're on the list. We'll be in touch.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 bg-card border border-border border-r-0 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity shrink-0"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Contact */}
          <div>
            <div
              className="text-[10px] tracking-[0.35em] uppercase text-primary mb-4"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              — Get in Touch
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold uppercase mb-4"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Contact <br /> Us
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Questions about inventory, selling a collection, or want to know if
              we'll be at a specific show? Reach out.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: "Email",
                  value: "info@inthefoldtcg.com",
                  href: "mailto:info@inthefoldtcg.com",
                },
                {
                  label: "Instagram",
                  value: "@inthefoldtcg",
                  href: "https://www.instagram.com/inthefoldtcg",
                },
              ].map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center justify-between p-4 border border-border hover:border-foreground/20 hover:bg-card transition-all group"
                >
                  <span
                    className="text-[10px] tracking-widest uppercase text-muted-foreground"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-xs text-foreground/70 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={logo}
              alt="In The Fold"
              className="h-5 w-auto object-contain invert opacity-40"
            />
            <span
              className="text-[10px] tracking-widest uppercase text-muted-foreground/50"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              In The Fold TCG by Sixfold Holdings
            </span>
          </div>
          <div
            className="text-[10px] text-muted-foreground/30 tracking-wider"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            © 2026 In The Fold TCG. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
