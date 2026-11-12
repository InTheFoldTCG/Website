import { useEffect, useState } from "react";
import { Upload, Sparkles, CreditCard, CheckCircle2, Plus, Trash2 } from "lucide-react";

// Where orders get sent (your Apps Script Web app URL). Make sure this matches your current deployment.
const ENDPOINT = "https://script.google.com/macros/s/AKfycbyHdtavgEg3aEh_v0toowGa03yS1sMo4aOfJ_ZdBo11Doy4kyaAyBcrTiCwvnzq-M18/exec";

// PRICING: change a number here and the buttons, banner, total and order rows all follow.
const CARD_PRICE = 12; // basic and full art
const ADDON_PRICE = 2; // holo layer / magnetic holder, each
const CARD_DUPLICATE_PRICE = 8; // extra copy of a card
const STICKER_SHEET_PRICE = 5; // sticker sheet ordered by itself
const STICKER_DUPLICATE_PRICE = 5; // extra copy of a sticker sheet
const BUNDLE_PRICE = 15; // card + sticker sheet together
const STICKER_ADDON_PRICE = BUNDLE_PRICE - CARD_PRICE; // what a sticker sheet adds to a card order
const BUNDLE_SAVINGS = CARD_PRICE + STICKER_SHEET_PRICE - BUNDLE_PRICE;

// Icon: a single card
function CardIcon() {
  return (
    <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="22" height="30" rx="3" />
      <rect x="3.5" y="3.5" width="17" height="4" rx="1" fill="currentColor" fillOpacity="0.15" />
      <rect x="3.5" y="9" width="17" height="12" rx="1" fill="currentColor" fillOpacity="0.08" />
      <line x1="3.5" y1="23" x2="15" y2="23" />
      <line x1="3.5" y1="26" x2="12" y2="26" />
    </svg>
  );
}

// Icon: a sticker sheet with 9 stickers (3 rows of 3)
function StickerSheetIcon() {
  return (
    <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="22" height="30" rx="3" />
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={3 + col * 6.4}
            y={3.5 + row * 8.8}
            width="5.2"
            height="7.4"
            rx="0.8"
            fill="currentColor"
            fillOpacity="0.25"
          />
        ))
      )}
    </svg>
  );
}

export default function CustomCard() {
  useEffect(() => {
    document.title = "In The Fold TCG - Custom Cards";
  }, []);

  // What they're ordering: a custom card or a sticker sheet by itself
  const [orderType, setOrderType] = useState<"card" | "sticker">("card");

  // Primary Card State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [cardType, setCardType] = useState<"basic" | "fullart">("basic");
  const [pokemonType, setPokemonType] = useState("Fire");
  const [cardName, setCardName] = useState("");
  const [attackName, setAttackName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [hasHolo, setHasHolo] = useState(false);
  const [hasHolder, setHasHolder] = useState(false);

  // Duplicate State (card duplicate has add-ons, sticker duplicate does not)
  const [hasDuplicate, setHasDuplicate] = useState(false);
  const [dupHolo, setDupHolo] = useState(false);
  const [dupHolder, setDupHolder] = useState(false);

  // Sticker sheet added onto a card order (bundle)
  const [hasStickers, setHasStickers] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isSticker = orderType === "sticker";
  const bundleActive = !isSticker && hasStickers;

  // Add-ons and duplicates mean different things in each mode, so start them fresh when switching
  const switchOrderType = (type: "card" | "sticker") => {
    if (type === orderType) return;
    setOrderType(type);
    setHasHolo(false);
    setHasHolder(false);
    setHasDuplicate(false);
    setDupHolo(false);
    setDupHolder(false);
    setHasStickers(false);
  };

  // LIVE PRICING CALCULATION
  const calculateTotal = () => {
    if (isSticker) {
      return STICKER_SHEET_PRICE + (hasDuplicate ? STICKER_DUPLICATE_PRICE : 0);
    }
    let total = CARD_PRICE; // Primary base
    if (hasHolo) total += ADDON_PRICE;
    if (hasHolder) total += ADDON_PRICE;
    if (hasStickers) total += STICKER_ADDON_PRICE; // bundle price
    if (hasDuplicate) {
      total += CARD_DUPLICATE_PRICE; // Duplicate base
      if (dupHolo) total += ADDON_PRICE;
      if (dupHolder) total += ADDON_PRICE;
    }
    return total;
  };

  const totalPrice = calculateTotal();

  const handleSubmitAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const primaryPrice = CARD_PRICE + (hasHolo ? ADDON_PRICE : 0) + (hasHolder ? ADDON_PRICE : 0);
    const duplicatePrice = CARD_DUPLICATE_PRICE + (dupHolo ? ADDON_PRICE : 0) + (dupHolder ? ADDON_PRICE : 0);

    const sendData = async (fileData = "", fileName = "", mimeType = "") => {
      try {
        const orderId = `ITF-${Math.floor(100000 + Math.random() * 900000)}`;

        const baseRow = {
          orderId: orderId,
          customerName: customerName,
          customerPhone: customerPhone,
          cardName: cardName,
          attackName: attackName,
          orderTotal: totalPrice,
          fileData: fileData,
          fileName: fileName,
          mimeType: mimeType
        };

        // One row per line item, all sharing the same order number and photo
        const rows: Record<string, unknown>[] = [];

        if (isSticker) {
          const stickerStyle = `Sticker Sheet (${cardType})`;

          rows.push({
            ...baseRow,
            cardType: stickerStyle,
            pokemonType: pokemonType,
            holoAddon: "No",
            holderAddon: "No",
            totalPrice: `Sticker Sheet`,
            itemPrice: STICKER_SHEET_PRICE,
          });

          if (hasDuplicate) {
            rows.push({
              ...baseRow,
              cardType: stickerStyle,
              pokemonType: pokemonType,
              holoAddon: "No",
              holderAddon: "No",
              totalPrice: `Duplicate Sticker Sheet`,
              itemPrice: STICKER_DUPLICATE_PRICE,
            });
          }
        } else {
          rows.push({
            ...baseRow,
            cardType: cardType,
            pokemonType: pokemonType,
            holoAddon: hasHolo ? "Yes" : "No",
            holderAddon: hasHolder ? "Yes" : "No",
            totalPrice: `Primary Card`,
            itemPrice: primaryPrice,
          });

          if (hasDuplicate) {
            rows.push({
              ...baseRow,
              cardType: cardType,
              pokemonType: pokemonType,
              holoAddon: dupHolo ? "Yes" : "No",
              holderAddon: dupHolder ? "Yes" : "No",
              totalPrice: `Duplicate Card`,
              itemPrice: duplicatePrice,
            });
          }

          if (hasStickers) {
            rows.push({
              ...baseRow,
              cardType: `Sticker Sheet (${cardType})`,
              pokemonType: pokemonType,
              holoAddon: "No",
              holderAddon: "No",
              totalPrice: `Sticker Sheet (Bundle)`,
              itemPrice: STICKER_ADDON_PRICE,
            });
          }
        }

        console.log("ORDER ROWS BEING SENT:", rows);

        for (const row of rows) {
          await fetch(ENDPOINT, {
            method: "POST",
            redirect: "follow",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(row),
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

    if (photo) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        sendData(base64String, photo.name, photo.type);
      };
      reader.readAsDataURL(photo);
    } else {
      sendData();
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
            In The Fold TCG
          </div>
          <h1 className="text-3xl md:text-4xl font-bold uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
            Custom Card Form
          </h1>
          <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            {isSticker
              ? "Design your sticker sheet below. Total updates as you add options."
              : "Design your custom cards below. Total updates with add-ons."}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmitAndPay} className="space-y-8">
            {/* === BUNDLE BANNER === */}
            <div
              className="p-4 border text-center"
              style={{ borderColor: "rgba(181,255,0,0.3)", background: "rgba(181,255,0,0.05)" }}
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1" style={{ fontFamily: "'Space Mono', monospace" }}>
                Bundle Deal
              </div>
              <div className="text-sm font-bold uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                Custom Card + Sticker Sheet = ${BUNDLE_PRICE}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1" style={{ fontFamily: "'Space Mono', monospace" }}>
                {bundleActive
                  ? "Bundle applied to your order."
                  : `Save $${BUNDLE_SAVINGS} when you add a sticker sheet to a card order.`}
              </div>
            </div>

            {/* === ORDER TYPE === */}
            <div className="pb-6 border-b border-border">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                What are you ordering?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => switchOrderType("card")}
                  aria-pressed={!isSticker}
                  className={`p-4 border text-left transition-all flex items-center gap-3.5 ${!isSticker ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/40"}`}
                >
                  <CardIcon />
                  <div>
                    <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Custom Card</div>
                    <div className="text-[10px] opacity-80 mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>${CARD_PRICE}</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => switchOrderType("sticker")}
                  aria-pressed={isSticker}
                  className={`p-4 border text-left transition-all flex items-center gap-3.5 ${isSticker ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/40"}`}
                >
                  <StickerSheetIcon />
                  <div>
                    <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Sticker Sheet</div>
                    <div className="text-[10px] opacity-80 mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>${STICKER_SHEET_PRICE}</div>
                  </div>
                </button>
              </div>
            </div>

            {/* === CUSTOMER INFORMATION === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-border">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Customer Name <span className="text-red-500">*</span>
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
                  Customer Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 555-123-4567"
                  className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                />
              </div>
            </div>

            {/* === PRIMARY SECTION === */}
            <div className="space-y-6 pb-6 border-b border-border">
              <div className="text-sm font-bold uppercase text-primary tracking-wider" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                {isSticker ? `Sticker Sheet ($${STICKER_SHEET_PRICE})` : `Primary Card ($${CARD_PRICE})`}
              </div>

              {/* Card Style */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Card Style <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Basic Card Button */}
                  <button
                    type="button"
                    onClick={() => setCardType("basic")}
                    className={`p-4 border text-left transition-all flex items-center gap-3.5 ${cardType === "basic" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/40"}`}
                  >
                    <CardIcon />
                    <div>
                      <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Basic Card</div>
                      {!isSticker && (
                        <div className="text-[10px] opacity-80 mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>${CARD_PRICE}</div>
                      )}
                    </div>
                  </button>

                  {/* Full Art Button */}
                  <button
                    type="button"
                    onClick={() => setCardType("fullart")}
                    className={`p-4 border text-left transition-all flex items-center gap-3.5 ${cardType === "fullart" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/40"}`}
                  >
                    <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="1" y="1" width="22" height="30" rx="3" />
                      <rect x="2.5" y="2.5" width="19" height="27" rx="2" fill="currentColor" fillOpacity="0.15" />
                      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.3" />
                    </svg>
                    <div>
                      <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Full Art</div>
                      {!isSticker && (
                        <div className="text-[10px] opacity-80 mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>${CARD_PRICE}</div>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Pokémon Type (both card styles) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Pokémon Type <span className="text-red-500">*</span>
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

              {/* Name & Attack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Name at Top of Card <span className="text-red-500">*</span>
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
                    Attack / Ability & Text <span className="text-red-500">*</span>
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
                  Subject Photo <span className="text-red-500">*</span>
                </label>
                <label className="border border-dashed border-border hover:border-primary/50 p-4 flex items-center justify-center cursor-pointer bg-background transition-colors">
                  <Upload size={18} className="text-primary mr-2" />
                  <span className="text-xs text-foreground font-medium" style={{ fontFamily: "'Space Mono', monospace" }}>
                    {photo ? photo.name : "Select photo *"}
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

              {/* Primary Add-ons (cards only, stickers can't have holo or a holder) */}
              {!isSticker && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                    <input
                      type="checkbox"
                      checked={hasHolo}
                      onChange={(e) => setHasHolo(e.target.checked)}
                      className="accent-primary"
                    />
                    <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                      Add Holo Layer <strong className="text-primary">(+${ADDON_PRICE})</strong>
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
                      Magnetic Holder <strong className="text-primary">(+${ADDON_PRICE})</strong>
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* DUPLICATE TOGGLE / SECTION */}
            {!hasDuplicate ? (
              <button
                type="button"
                onClick={() => setHasDuplicate(true)}
                className="w-full py-3 border border-dashed border-border text-xs uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <Plus size={16} />{" "}
                {isSticker
                  ? `Add Duplicate Sticker Sheet ($${STICKER_DUPLICATE_PRICE})`
                  : `Add Duplicate Copy ($${CARD_DUPLICATE_PRICE})`}
              </button>
            ) : (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                    {isSticker
                      ? `Duplicate Sticker Sheet ($${STICKER_DUPLICATE_PRICE})`
                      : `Duplicate Card Add-ons ($${CARD_DUPLICATE_PRICE})`}
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
                {isSticker ? (
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Space Mono', monospace" }}>
                    One extra sheet with the same design.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                      <input
                        type="checkbox"
                        checked={dupHolo}
                        onChange={(e) => setDupHolo(e.target.checked)}
                        className="accent-primary"
                      />
                      <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                        Add Holo Layer <strong className="text-primary">(+${ADDON_PRICE})</strong>
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
                        Magnetic Holder <strong className="text-primary">(+${ADDON_PRICE})</strong>
                      </span>
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* STICKER SHEET ADD-ON (card orders only) */}
            {!isSticker && (
              <button
                type="button"
                onClick={() => setHasStickers(!hasStickers)}
                aria-pressed={hasStickers}
                className={`w-full p-4 border text-left transition-all flex items-center gap-3.5 ${hasStickers ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/40"}`}
              >
                <StickerSheetIcon />
                <div className="flex-1">
                  <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Add a Sticker Sheet</div>
                  <div className="text-[10px] opacity-80 mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>
                    9 stickers (3 rows of 3) · +${STICKER_ADDON_PRICE} with your card
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest shrink-0" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {hasStickers ? "Added" : "+ Add"}
                </span>
              </button>
            )}

            {/* LIVE TOTAL & SUBMIT BAR */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
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
                className="px-4 sm:px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <CreditCard size={16} /> Submit Order (${totalPrice})
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
              Payment of ${totalPrice}.00 processed.{" "}
              {isSticker
                ? "Your sticker sheet is locked in and heading to the print station!"
                : "Your cards are locked in and heading to the print station!"}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setPhoto(null);
                setHasDuplicate(false);
                setHasHolo(false);
                setHasHolder(false);
                setDupHolo(false);
                setDupHolder(false);
                setHasStickers(false);
              }}
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
