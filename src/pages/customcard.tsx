import { useEffect, useState } from "react";
import { Upload, Sparkles, CreditCard, CheckCircle2, Plus, Trash2 } from "lucide-react";

export default function CustomCard() {
  useEffect(() => {
    document.title = "In The Fold TCG - Custom Cards";
  }, []);

  // Primary Card State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [cardType, setCardType] = useState<"basic" | "fullart">("basic");
  const [pokemonType, setPokemonType] = useState("Fire");
  const [cardName, setCardName] = useState("");
  const [attackName, setAttackName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [hasHolo, setHasHolo] = useState(false);
  const [hasHolder, setHasHolder] = useState(false);

  // Duplicate Card State (Add-ons only)
  const [hasDuplicate, setHasDuplicate] = useState(false);
  const [dupHolo, setDupHolo] = useState(false);
  const [dupHolder, setDupHolder] = useState(false);

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
      if (dupHolo) total += 2;
      if (dupHolder) total += 2;
    }
    return total;
  };

  const totalPrice = calculateTotal();

  const handleSubmitAndPay = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const photoUrl = photo ? URL.createObjectURL(photo) : "No photo uploaded";
   const endpoint = "https://script.google.com/macros/s/AKfycbysPqQAPHfwMkQmfbJjAy8pRAItlmUNrcdPKso6X69kMBQkH6yzpKRG7hLJLHw1SVs/exec";
    
    // Generate a unique order ID
    const orderId = `ITF-${Math.floor(100000 + Math.random() * 900000)}`;

    const primaryOrder = {
      orderId: orderId,
      customerName: customerName,
      customerEmail: customerEmail,
      cardName: cardName,
      attackName: attackName,
      cardType: cardType,
      pokemonType: pokemonType,
      holoAddon: hasHolo ? "Yes" : "No",
      holderAddon: hasHolder ? "Yes" : "No",
      totalPrice: `Primary Card`,
      photoUrl: photoUrl
    };

      await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // required for GAS web apps to parse JSON cleanly without pre-flight CORS blocks
      body: JSON.stringify(primaryOrder),
    });

    if (hasDuplicate) {
      const duplicateOrder = {
        orderId: orderId,
        customerName: customerName,
        customerEmail: customerEmail,
        cardName: cardName,
        attackName: attackName,
        cardType: cardType,
        pokemonType: pokemonType,
        holoAddon: dupHolo ? "Yes" : "No",
        holderAddon: dupHolder ? "Yes" : "No",
        totalPrice: `Duplicate Card`,
        photoUrl: photoUrl
      };

    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(duplicateOrder),
    });
    }

    setIsSubmitting(false);
    setSubmitted(true);
  } catch (error) {
    console.error("Order submission failed", error);
    setIsSubmitting(false);
    alert("Something went wrong saving your order. Please try again.");
  }
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
            Design your custom cards below. Total based on add-ons.
          </p>
        </div>

       {!submitted ? (
          <form onSubmit={handleSubmitAndPay} className="space-y-8">
            
            {/* === CUSTOMER INFORMATION (MOVED TO TOP) === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-border">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Customer Email
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. jane@example.com"
                  className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                />
              </div>
            </div>
            
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
                    Attack / Ability
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
                    {photo ? photo.name : "Select photo"}
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

            {/* DUPLICATE CARD TOGGLE / SECTION */}
            {!hasDuplicate ? (
              <button
                type="button"
                onClick={() => setHasDuplicate(true)}
                className="w-full py-3 border border-dashed border-border text-xs uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <Plus size={16} /> Add Duplicate Copy ($8)
              </button>
            ) : (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                    Duplicate Card Add-ons ($8)
                  </span>
                  <button
                    type="button"
                    onClick={() => setHasDuplicate(false)}
                    className="text-xs text-red-500 hover:underline"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    [Remove Duplicate]
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                    <input
                      type="checkbox"
                      checked={dupHolo}
                      onChange={(e) => setDupHolo(e.target.checked)}
                      className="accent-primary"
                    />
                    <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                      Add Holo Layer <strong className="text-primary">(+$2)</strong>
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                    <input
                      type="checkbox"
                      checked={dupHolder}
                      onChange={(e) => setDupHolder(e.target.checked)}
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
                    <CreditCard size={16} /> Proceed to pay (${totalPrice})
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
              onClick={() => { setSubmitted(false); setPhoto(null); setHasDuplicate(false); setHasHolo(false); setHasHolder(false); setDupHolo(false); setDupHolder(false); }}
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
