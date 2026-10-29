import { useEffect, useState } from "react";
import { Upload, CreditCard, CheckCircle2, Plus } from "lucide-react";

// --- SVG ICONS ---
const BasicCardIcon = () => (
  <svg className="w-8 h-8 shrink-0 text-primary" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="1" width="22" height="30" rx="3" />
    <rect x="3.5" y="3.5" width="17" height="14" rx="1" fill="currentColor" fillOpacity="0.15" />
    <line x1="3.5" y1="21" x2="15" y2="21" />
    <line x1="3.5" y1="24" x2="12" y2="24" />
    <line x1="3.5" y1="27" x2="17" y2="27" />
  </svg>
);

const FullArtIcon = () => (
  <svg className="w-8 h-8 shrink-0 text-primary" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="1" width="22" height="30" rx="3" />
    <rect x="2.5" y="2.5" width="19" height="27" rx="2" fill="currentColor" fillOpacity="0.25" />
    <line x1="3.5" y1="21" x2="15" y2="21" />
    <line x1="3.5" y1="24" x2="12" y2="24" />
    <line x1="3.5" y1="27" x2="17" y2="27" />
  </svg>
);

const StickerSheetIcon = () => (
  <svg className="w-8 h-8 shrink-0 text-primary" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="1" width="22" height="30" rx="3" />
    {[0, 1, 2, 3].flatMap((r) =>
      [0, 1, 2].map((c) => (
        <rect
          key={`${r}-${c}`}
          x={3.5 + c * 6.25}
          y={3.5 + r * 6.5}
          width="4.5"
          height="5.5"
          rx="0.8"
          fill="currentColor"
          fillOpacity="0.15"
          strokeWidth="1"
        />
      ))
    )}
  </svg>
);

const HoloIcon = () => (
  <svg className="w-6 h-6 shrink-0 text-primary" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="1" width="22" height="30" rx="3" fill="currentColor" fillOpacity="0.1" />
    <line x1="5" y1="26" x2="19" y2="12" strokeWidth="1" strokeOpacity="0.6" />
    <line x1="5" y1="31" x2="23" y2="13" strokeWidth="1" strokeOpacity="0.4" />
    <path d="M12 5 L13.4 9.6 L18 11 L13.4 12.4 L12 17 L10.6 12.4 L6 11 L10.6 9.6 Z" fill="currentColor" fillOpacity="0.5" strokeWidth="1" />
  </svg>
);

const HolderIcon = () => (
  <svg className="w-6 h-6 shrink-0 text-primary" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="1" width="22" height="30" rx="2.5" strokeWidth="2" />
    <rect x="4.5" y="4.5" width="15" height="23" rx="1" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
    <circle cx="2.8" cy="2.8" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="21.2" cy="2.8" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="2.8" cy="29.2" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="21.2" cy="29.2" r="0.9" fill="currentColor" stroke="none" />
    <line x1="10" y1="30" x2="14" y2="30" strokeWidth="1" />
  </svg>
);

export default function CustomCard() {
  useEffect(() => {
    document.title = "In The Fold TCG - Custom Cards";
  }, []);

  // Top Product Selector State
  const [productType, setProductType] = useState<"card" | "sticker">("card");

  // Primary Customer & Design State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [cardType, setCardType] = useState<"basic" | "fullart">("basic");
  const [pokemonType, setPokemonType] = useState("Fire");
  const [cardName, setCardName] = useState("");
  const [attackName, setAttackName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  // Card Add-ons State
  const [hasHolo, setHasHolo] = useState(false);
  const [hasHolder, setHasHolder] = useState(false);

  // Duplicate Card State (Card Orders)
  const [hasDuplicate, setHasDuplicate] = useState(false);
  const [dupHolo, setDupHolo] = useState(false);
  const [dupHolder, setDupHolder] = useState(false);

  // Sticker Add-ons State
  const [hasStickerSheet, setHasStickerSheet] = useState(false); 
  const [hasDupStickerSheet, setHasDupStickerSheet] = useState(false); 

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [placedTotal, setPlacedTotal] = useState(0);

  // Pricing Calculation Logic
  const calculateTotal = () => {
    let basePrice = cardType === "fullart" ? 12 : 10;
    let total = basePrice;

    if (productType === "card") {
      if (hasHolo) total += 2;
      if (hasHolder) total += 2;
      if (hasDuplicate) {
        total += 8;
        if (dupHolo) total += 2;
        if (dupHolder) total += 2;
      }
      if (hasStickerSheet) total += 5;
    } else {
      if (hasDupStickerSheet) total += 5;
    }

    return total;
  };

  const totalPrice = calculateTotal();

  const handleProductTypeChange = (type: "card" | "sticker") => {
    setProductType(type);
    setHasHolo(false);
    setHasHolder(false);
    setHasDuplicate(false);
    setDupHolo(false);
    setDupHolder(false);
    setHasStickerSheet(false);
    setHasDupStickerSheet(false);
  };

  const handleSubmitAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const basePrice = cardType === "fullart" ? 12 : 10;
    const primaryPrice = basePrice + (hasHolo ? 2 : 0) + (hasHolder ? 2 : 0);
    const duplicatePrice = 8 + (dupHolo ? 2 : 0) + (dupHolder ? 2 : 0);
    const orderId = `ITF-${Math.floor(100000 + Math.random() * 900000)}`;

    const sendData = async (fileData = "", fileName = "", mimeType = "") => {
      try {
        const endpoint = "https://script.google.com/macros/s/AKfycbyr6xDrHewbAprFeywPwdRydmV12_-6nji8eEVkv2uc1ju_fBAWA_As0jCwMimtg6cb/exec";

        if (productType === "card") {
          const primaryOrder = {
            orderId: orderId,
            customerName: customerName,
            customerPhone: customerPhone,
            cardName: cardName,
            attackName: attackName,
            cardType: cardType,
            pokemonType: pokemonType,
            holoAddon: hasHolo ? "Yes" : "No",
            holderAddon: hasHolder ? "Yes" : "No",
            totalPrice: `Primary Card`,
            itemPrice: primaryPrice,
            orderTotal: totalPrice,
            fileData: fileData,
            fileName: fileName,
            mimeType: mimeType
          };

          await fetch(endpoint, {
            method: "POST",
            redirect: "follow",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(primaryOrder),
          });

          if (hasDuplicate) {
            const duplicateOrder = {
              orderId: orderId,
              customerName: customerName,
              customerPhone: customerPhone,
              cardName: cardName,
              attackName: attackName,
              cardType: cardType,
              pokemonType: pokemonType,
              holoAddon: dupHolo ? "Yes" : "No",
              holderAddon: dupHolder ? "Yes" : "No",
              totalPrice: `Duplicate Card`,
              itemPrice: duplicatePrice,
              orderTotal: totalPrice,
              fileData: fileData,
              fileName: fileName,
              mimeType: mimeType
            };

            await fetch(endpoint, {
              method: "POST",
              redirect: "follow",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify(duplicateOrder),
            });
          }

          if (hasStickerSheet) {
            const stickerOrder = {
              orderId: orderId,
              customerName: customerName,
              customerPhone: customerPhone,
              cardName: cardName,
              attackName: attackName,
              cardType: cardType,
              pokemonType: pokemonType,
              holoAddon: "No",
              holderAddon: "No",
              totalPrice: `Sticker Sheet Addon`,
              itemPrice: 5,
              orderTotal: totalPrice,
              fileData: fileData,
              fileName: fileName,
              mimeType: mimeType
            };

            await fetch(endpoint, {
              method: "POST",
              redirect: "follow",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify(stickerOrder),
            });
          }
        } else {
          const standaloneStickerOrder = {
            orderId: orderId,
            customerName: customerName,
            customerPhone: customerPhone,
            cardName: cardName,
            attackName: attackName,
            cardType: cardType,
            pokemonType: pokemonType,
            holoAddon: "No",
            holderAddon: "No",
            totalPrice: `Standalone Sticker Sheet`,
            itemPrice: basePrice,
            orderTotal: totalPrice,
            fileData: fileData,
            fileName: fileName,
            mimeType: mimeType
          };

          await fetch(endpoint, {
            method: "POST",
            redirect: "follow",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(standaloneStickerOrder),
          });

          if (hasDupStickerSheet) {
            const dupStickerOrder = {
              orderId: orderId,
              customerName: customerName,
              customerPhone: customerPhone,
              cardName: cardName,
              attackName: attackName,
              cardType: cardType,
              pokemonType: pokemonType,
              holoAddon: "No",
              holderAddon: "No",
              totalPrice: `Duplicate Sticker Sheet`,
              itemPrice: 5,
              orderTotal: totalPrice,
              fileData: fileData,
              fileName: fileName,
              mimeType: mimeType
            };

            await fetch(endpoint, {
              method: "POST",
              redirect: "follow",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify(dupStickerOrder),
            });
          }
        }

        setPlacedOrderId(orderId);
        setPlacedTotal(totalPrice);
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
      <div className="max-w-xl mx-auto bg-card border border-border p-6 sm:p-10 rounded-xl relative overflow-hidden">
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
            Design your custom cards or sticker sheets below. Total updates dynamically.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmitAndPay} className="space-y-8">
            {/* === 1. TOP ITEM TYPE SELECTOR === */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                1. Select Item Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleProductTypeChange("card")}
                  className={`p-3 sm:p-4 border text-left transition-all flex flex-col sm:flex-row items-center sm:items-center gap-2.5 sm:gap-3.5 text-center sm:text-left ${
                    productType === "card"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <FullArtIcon />
                  <div>
                    <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                      Custom Card
                    </div>
                    <div className="text-[10px] opacity-80 mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>
                      Starts at $10
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleProductTypeChange("sticker")}
                  className={`p-3 sm:p-4 border text-left transition-all flex flex-col sm:flex-row items-center sm:items-center gap-2.5 sm:gap-3.5 text-center sm:text-left ${
                    productType === "sticker"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <StickerSheetIcon />
                  <div>
                    <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                      Sticker Sheet
                    </div>
                    <div className="text-[10px] opacity-80 mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>
                      12 Stickers · $10
                    </div>
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

            {/* === 2. DESIGN CUSTOMIZATION SECTION === */}
            <div className="space-y-6 pb-6 border-b border-border">
              <div className="text-sm font-bold uppercase text-primary tracking-wider" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                {productType === "card"
                  ? "2. Card Design Details ($10-$12)"
                  : "2. Sticker Sheet Design ($10)"}
              </div>

              {/* Card Style */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Card Style <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Basic Card Button */}
                  <button
                    type="button"
                    onClick={() => setCardType("basic")}
                    className={`p-3 sm:p-4 border text-left transition-all flex flex-col sm:flex-row items-center sm:items-center gap-2.5 sm:gap-3.5 text-center sm:text-left ${
                      cardType === "basic"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <BasicCardIcon />
                    <div>
                      <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Basic Card</div>
                      <div className="text-[10px] opacity-80 mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>$10</div>
                    </div>
                  </button>

                  {/* Full Art Button */}
                  <button
                    type="button"
                    onClick={() => setCardType("fullart")}
                    className={`p-3 sm:p-4 border text-left transition-all flex flex-col sm:flex-row items-center sm:items-center gap-2.5 sm:gap-3.5 text-center sm:text-left ${
                      cardType === "fullart"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <FullArtIcon />
                    <div>
                      <div className="font-bold uppercase text-xs" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Full Art</div>
                      <div className="text-[10px] opacity-80 mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>$12</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Pokémon Type Select */}
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

              {/* Primary Card Options (Card mode only) */}
              {productType === "card" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                    <input
                      type="checkbox"
                      checked={hasHolo}
                      onChange={(e) => setHasHolo(e.target.checked)}
                      className="accent-primary"
                    />
                    <HoloIcon />
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
                    <HolderIcon />
                    <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                      Magnetic Holder <strong className="text-primary">(+$2)</strong>
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* === 3. CONDITIONALLY RENDERED ADD-ONS === */}
            {productType === "card" ? (
              <>
                {/* DUPLICATE CARD SECTION */}
                {!hasDuplicate ? (
                  <button
                    type="button"
                    onClick={() => setHasDuplicate(true)}
                    className="w-full py-4 border-2 border-primary bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                    style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                  >
                    <Plus size={20} strokeWidth={3} /> Add Duplicate Copy ($8)
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                        <input
                          type="checkbox"
                          checked={dupHolo}
                          onChange={(e) => setDupHolo(e.target.checked)}
                          className="accent-primary"
                        />
                        <HoloIcon />
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
                        <HolderIcon />
                        <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                          Magnetic Holder <strong className="text-primary">(+$2)</strong>
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* STICKER SHEET ADD-ON ON CARD ORDERS ($5) */}
                <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                  <input
                    type="checkbox"
                    checked={hasStickerSheet}
                    onChange={(e) => setHasStickerSheet(e.target.checked)}
                    className="accent-primary"
                  />
                  <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Add A Custom Sticker Sheet <strong className="text-primary">(+$5)</strong>
                    <span className="block text-[10px] opacity-80 mt-0.5">4 rows of 3 · matches your card art</span>
                  </span>
                  <div className="flex-1 flex justify-center">
                    <StickerSheetIcon />
                  </div>
                </label>
              </>
            ) : (
              /* DUPLICATE STICKER SHEET ON STICKER-ONLY ORDERS ($5) */
              <label className="flex items-center gap-3 p-3 border border-border bg-background cursor-pointer hover:border-primary/50">
                <input
                  type="checkbox"
                  checked={hasDupStickerSheet}
                  onChange={(e) => setHasDupStickerSheet(e.target.checked)}
                  className="accent-primary"
                />
                <span className="text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Duplicate Sticker Sheet <strong className="text-primary">(+$5)</strong>
                  <span className="block text-[10px] opacity-80 mt-0.5">An extra sheet of 12 stickers with matching artwork</span>
                </span>
                <div className="flex-1 flex justify-center">
                  <StickerSheetIcon />
                </div>
              </label>
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
          <div className="text-center py-8 space-y-5">
            <CheckCircle2 size={48} className="text-primary mx-auto" />
            <h2 className="text-2xl font-bold uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              Order Received
            </h2>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "'Space Mono', monospace" }}>
              Thank you for your order. Please visit us at our booth and show this screen to finalize your payment. Your items go to print once payment is complete.
            </p>

            <div className="border border-primary/40 bg-primary/10 p-5 max-w-xs mx-auto">
              <div className="text-[10px] uppercase text-muted-foreground tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>
                Order Number
              </div>
              <div className="text-3xl font-bold text-primary mt-1" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                {placedOrderId}
              </div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-widest mt-4" style={{ fontFamily: "'Space Mono', monospace" }}>
                Total Due
              </div>
              <div className="text-xl font-bold" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                ${placedTotal}.00
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setPhoto(null);
                setPlacedOrderId("");
                setPlacedTotal(0);
                setHasDuplicate(false);
                setHasHolo(false);
                setHasHolder(false);
                setDupHolo(false);
                setDupHolder(false);
                setHasStickerSheet(false);
                setHasDupStickerSheet(false);
                handleProductTypeChange("card");
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
