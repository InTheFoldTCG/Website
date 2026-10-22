import { useEffect, useState } from "react";
import { Upload, Sparkles, CreditCard, CheckCircle2, Plus, Trash2 } from "lucide-react";

export default function CustomCard() {
  useEffect(() => {
    document.title = "In The Fold TCG - Custom Cards";
  }, []);

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

  // Duplicate Card State (Add-ons only)
  const [hasDuplicate, setHasDuplicate] = useState(false);
  const [dupHolo, setDupHolo] = useState(false);
  const [dupHolder, setDupHolder] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // LIVE PRICING CALCULATION ($10 basic, $12 full art, $8 duplicate, $2 add-ons each)
  const calculateTotal = () => {
    let basePrice = cardType === "fullart" ? 12 : 10;
    let total = basePrice; // Primary base
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

    const basePrice = cardType === "fullart" ? 12 : 10;
    const primaryPrice = basePrice + (hasHolo ? 2 : 0) + (hasHolder ? 2 : 0);
    const duplicatePrice = 8 + (dupHolo ? 2 : 0) + (dupHolder ? 2 : 0);

    const sendData = async (fileData = "", fileName = "", mimeType = "") => {
      try {
        const endpoint = "https://script.google.com/macros/s/AKfycbz7ucDlvtmLaQYlAY_KLTojTDzP_Vp0_RUVHR2bbxpwdeOK2gEOSgVab4XOd4jtIy2S/exec";
        const orderId = `ITF-${Math.floor(100000 + Math.random() * 900000)}`;

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

        console.log("PRIMARY ORDER BEING SENT:", primaryOrder);

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
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider uppercase mb-2" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
            Custom Card Form
          </h1>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Space Mono', monospace" }}>
            Design your custom card, pick your upgrades, and submit your order.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmitAndPay} className="space-y-6">
            {/* Customer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2 font-semibold" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2 font-semibold" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Customer Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="555-123-4567"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                />
              </div>
            </div>

            {/* Card Type Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-semibold" style={{ fontFamily: "'Space Mono', monospace" }}>
                Card Style *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCardType("basic")}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    cardType === "basic"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:border-muted-foreground"
                  }`}
                >
                  <div className="font-bold text-sm uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Basic Card</div>
                  <div className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "'Space Mono', monospace" }}>$10.00</div>
                </button>
                <button
                  type="button"
                  onClick={() => setCardType("fullart")}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    cardType === "fullart"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:border-muted-foreground"
                  }`}
                >
                  <div className="font-bold text-sm uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Full Art</div>
                  <div className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "'Space Mono', monospace" }}>$12.00</div>
                </button>
              </div>
            </div>

            {/* Pokémon Type */}
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-semibold" style={{ fontFamily: "'Space Mono', monospace" }}>
                Pokémon Type *
              </label>
              <select
                value={pokemonType}
                onChange={(e) => setPokemonType(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <option value="Fire">Fire</option>
                <option value="Water">Water</option>
                <option value="Grass">Grass</option>
                <option value="Lightning">Lightning</option>
                <option value="Psychic">Psychic</option>
                <option value="Fighting">Fighting</option>
                <option value="Darkness">Darkness</option>
                <option value="Metal">Metal</option>
                <option value="Fairy">Fairy</option>
                <option value="Dragon">Dragon</option>
                <option value="Colorless">Colorless</option>
              </select>
            </div>

            {/* Card Name & Attack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2 font-semibold" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Card Name *
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Custom Charizard"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2 font-semibold" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Attack Name *
                </label>
                <input
                  type="text"
                  required
                  value={attackName}
                  onChange={(e) => setAttackName(e.target.value)}
                  placeholder="Solar Flare"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-semibold" style={{ fontFamily: "'Space Mono', monospace" }}>
                Upload Artwork *
              </label>
              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer"
                style={{ fontFamily: "'Space Mono', monospace" }}
              />
            </div>

            {/* Primary Add-ons */}
            <div className="space-y-3 pt-2 border-t border-border">
              <label className="block text-xs uppercase tracking-wider font-semibold" style={{ fontFamily: "'Space Mono', monospace" }}>
                Primary Add-ons
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>
                  <input
                    type="checkbox"
                    checked={hasHolo}
                    onChange={(e) => setHasHolo(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                  />
                  Holo Finish (+$2)
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>
                  <input
                    type="checkbox"
                    checked={hasHolder}
                    onChange={(e) => setHasHolder(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                  />
                  Magnetic Holder (+$2)
                </label>
              </div>
            </div>

            {/* Duplicate Card Section */}
            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Add Duplicate Card</div>
                  <div className="text-xs text-muted-foreground" style={{ fontFamily: "'Space Mono', monospace" }}>Get an extra copy for $8.00 base</div>
                </div>
                <button
                  type="button"
                  onClick={() => setHasDuplicate(!hasDuplicate)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                    hasDuplicate ? "bg-red-500/10 text-red-500 border border-red-500" : "bg-primary/10 text-primary border border-primary"
                  }`}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {hasDuplicate ? "Remove Duplicate" : "+ Add Duplicate"}
                </button>
              </div>

              {hasDuplicate && (
                <div className="p-4 rounded-lg bg-background/50 border border-border space-y-3">
                  <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Duplicate Add-ons
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>
                      <input
                        type="checkbox"
                        checked={dupHolo}
                        onChange={(e) => setDupHolo(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                      />
                      Holo Finish (+$2)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>
                      <input
                        type="checkbox"
                        checked={dupHolder}
                        onChange={(e) => setDupHolder(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                      />
                      Magnetic Holder (+$2)
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Total and Submit */}
            <div className="pt-6 border-t border-border flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>Total Price</div>
                <div className="text-2xl font-bold text-primary" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>${totalPrice}.00</div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold uppercase text-xs tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {isSubmitting ? "Submitting..." : "Submit Order"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-2xl font-bold uppercase" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Order Submitted Successfully!</h2>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Space Mono', monospace" }}>Your custom card details and image have been received.</p>
          </div>
        )}
      </div>
    </div>
  );
}
