import { useEffect, useState } from "react";
import { Upload, Sparkles, CreditCard, CheckCircle2, Plus, Trash2 } from "lucide-react";

export default function CustomCard() {
  useEffect(() => {
    document.title = "In The Fold TCG - Custom Cards";
  }, []);

  // Primary Card State
  const [cardType, setCardType] = useState<"basic" | "fullart">("basic");
  const [pokemonType, setPokemonType] = useState("Fire");
  const [cardName, setCardName] = useState("");
  const [attackName, setAttackName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [hasHolo, setHasHolo] = useState(false);
  const [hasHolder, setHasHolder] = useState(false);

  // Duplicate Card State
  const [hasDuplicate, setHasDuplicate] = useState(false);
  const [dupCardType, setDupCardType] = useState<"basic" | "fullart">("basic");
  const [dupPokemonType, setDupPokemonType] = useState("Fire");
  const [dupCardName, setDupCardName] = useState("");
  const [dupAttackName, setDupAttackName] = useState("");
  const [dupPhoto, setDupPhoto] = useState<File | null>(null);
  const [dupHasHolo, setDupHasHolo] = useState(false);
  const [dupHasHolder, setDupHasHolder] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // LIVE PRICING CALCULATION ($10 primary, $8 duplicate, $2 add-ons each)
  const calculateTotal = () => {
    let total = 10; // Primary base
    if (hasHolo) total += 2;
    if (hasHolder) total += 2;

    if (hasDuplicate) {
      total += 8; // Duplicate base
      if (dupHasHolo) total += 2;
      if (dupHasHolder) total += 2;
    }
    return total;
  };

  const totalPrice = calculateTotal();

  const handleSubmitAndPay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Connect totalPrice to your Chase-linked payment processor / terminal checkout
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="max-w-xl mx-auto bg-card border border-border p-8 md:p-10 rounded-xl relative overflow-hidden">
        
        {/* Accent glow */}
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none blur-[80px] opacity-10" style={{ background: "#b5ff00" }} />

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="text-xs tracking-[0.3em] uppercase text-primary mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            In The Fold Live Lab
          </div>
          <h1 className="text-3xl md:text-4xl font-bold uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
            Custom Card Studio
          </h1>
          <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            Design your custom cards below. Total updates live based on add-ons.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmitAndPay} className="space-y-8">
            
            {/* === PRIMARY CARD SECTION === */}
            <div className="space-y-6 pb-6 border-b border-border">
              <div className="text-sm font-bold uppercase text-primary tracking-wider" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                Primary Card ($10)
              </div>

              {/* Card Style */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Card Style
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setCardType("basic")}
                    className={`p-3 border text-left transition-all ${cardType === "basic" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"}`}
                  >
                    <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Basic Card</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardType("fullart")}
                    className={`p-3 border text-left transition-all ${cardType === "fullart" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"}`}
                  >
                    <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Full Art</div>
                  </button>
                </div>
              </div>

              {/* Conditional Pokémon Type (Basic only) */}
              {cardType === "basic" && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Pokémon Type
                  </label>
                  <select
                    value={pokemonType}
                    onChange={(e) => setPokemonType(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <option value="Fire">Fire Type</option>
                    <option value="Water">Water Type</option>
                    <option value="Grass">Grass Type</option>
                    <option value="Electric">Electric Type</option>
                    <option value="Psychic">Psychic Type</option>
                    <option value="Fighting">Fighting Type</option>
                    <option value="Colorless">Colorless Type</option>
                  </select>
                </div>
              )}

              {/* Name & Attack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Name at Top
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="e.g. Trainer Mike"
                    className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Attack / Effect
                  </label>
                  <input
                    type="text"
                    required
                    value={attackName}
                    onChange={(e) => setAttackName(e.target.value)}
                    placeholder="e.g. Strike - 100"
                    className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Subject Photo
                </label>
                <label className="border border-dashed border-border hover:border-primary/50 p-4 flex items-center justify-center cursor-pointer bg-background transition-colors">
                  <Upload size={18} className="text-primary mr-2" />
                  <span className="text-xs text-foreground font-medium" style={{ fontFamily: "'Space Mono', monospace" }}>
                    {photo ? photo.name : "Select or snap photo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => e.target.files && setPhoto(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Primary Add-ons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                  <input
                    type="checkbox"
                    checked={hasHolo}
                    onChange={(e) => setHasHolo(e.target.checked)}
                    className="accent-primary"
                  />
                  <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Add Holo Layer <strong className="text-primary">(+$2)</strong>
                  </span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                  <input
                    type="checkbox"
                    checked={hasHolder}
                    onChange={(e) => setHasHolder(e.target.checked)}
                    className="accent-primary"
                  />
                  <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Magnetic Holder <strong className="text-primary">(+$2)</strong>
                  </span>
                </label>
              </div>
            </div>

            {/* === DUPLICATE CARD SECTION === */}
            {!hasDuplicate ? (
              <button
                type="button"
                onClick={() => setHasDuplicate(true)}
                className="w-full py-3 border border-dashed border-border hover:border-primary text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 transition-colors"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <Plus size={16} /> Add a Duplicate Card ($8 base)
              </button>
            ) : (
              <div className="space-y-6 p-5 border border-primary/40 bg-primary/5 relative">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold uppercase text-primary tracking-wider" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                    Duplicate Card ($8)
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasDuplicate(false)}
                    className="text-muted-foreground hover:text-red-400 text-xs flex items-center gap-1"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                {/* Dup Style */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Duplicate Style
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDupCardType("basic")}
                      className={`p-3 border text-left transition-all ${dupCardType === "basic" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"}`}
                    >
                      <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Basic Card</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDupCardType("fullart")}
                      className={`p-3 border text-left transition-all ${dupCardType === "fullart" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"}`}
                    >
                      <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Full Art</div>
                    </button>
                  </div>
                </div>

                {/* Dup Type (Basic only) */}
                {dupCardType === "basic" && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                      Duplicate Pokémon Type
                    </label>
                    <select
                      value={dupPokemonType}
                      onChange={(e) => setDupPokemonType(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      <option value="Fire">Fire Type</option>
                      <option value="Water">Water Type</option>
                      <option value="Grass">Grass Type</option>
                      <option value="Electric">Electric Type</option>
                      <option value="Psychic">Psychic Type</option>
                      <option value="Fighting">Fighting Type</option>
                      <option value="Colorless">Colorless Type</option>
                    </select>
                  </div>
                )}

                {/* Dup Name & Attack */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                      Name at Top
                    </label>
                    <input
                      type="text"
                      required={hasDuplicate}
                      value={dupCardName}
                      onChange={(e) => setDupCardName(e.target.value)}
                      placeholder="e.g. Trainer Mike"
                      className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                      Attack / Effect
                    </label>
                    <input
                      type="text"
                      required={hasDuplicate}
                      value={dupAttackName}
                      onChange={(e) => setDupAttackName(e.target.value)}
                      placeholder="e.g. Strike - 100"
                      className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Dup Photo */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Duplicate Subject Photo
                  </label>
                  <label className="border border-dashed border-border hover:border-primary/50 p-4 flex items-center justify-center cursor-pointer bg-background transition-colors">
                    <Upload size={18} className="text-primary mr-2" />
                    <span className="text-xs text-foreground font-medium" style={{ fontFamily: "'Space Mono', monospace" }}>
                      {dupPhoto ? dupPhoto.name : "Select or snap photo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      required={hasDuplicate}
                      onChange={(e) => e.target.files && setDupPhoto(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Dup Add-ons */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                    <input
                      type="checkbox"
                      checked={dupHasHolo}
                      onChange={(e) => setDupHasHolo(e.target.checked)}
                      className="accent-primary"
                    />
                    <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                      Add Holo Layer <strong className="text-primary">(+$2)</strong>
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                    <input
                      type="checkbox"
                      checked={dupHasHolder}
                      onChange={(e) => setDupHasHolder(e.target.checked)}
                      className="accent-primary"
                    />
                    <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                      Magnetic Holder <strong className="text-primary">(+$2)</strong>
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* LIVE TOTAL & SUBMIT BAR */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase text-muted-foreground tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Total Price
                </div>
                <div className="text-2xl font-bold text-primary" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                  ${totalPrice}.00
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-bold hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <CreditCard size={16} /> Pay & Submit (${totalPrice})
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 size={48} className="text-primary mx-auto" />
            <h2 className="text-2xl font-bold uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              Order Queued Successfully!
            </h2>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "'Space Mono', monospace" }}>
              Payment of ${totalPrice}.00 processed. Your cards are locked in and heading to the print station!
            </p>
            <button
              onClick={() => { setSubmitted(false); setPhoto(null); setDupPhoto(null); setHasDuplicate(false); setHasHolo(false); setHasHolder(false); }}
              className="px-6 py-3 border border-border text-xs tracking-widest uppercase hover:text-primary transition-colors mt-4"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Create Another Order
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
