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
            Design your custom cards below. Total updates with add-ons.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmitAndPay} className="space-y-8">
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

            {/* === PRIMARY CARD SECTION === */}
            <div className="space-y-6 pb-6 border-b border-border">
              <div className="text-sm font-bold uppercase text-primary tracking-wider" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
                Primary Card ($10-$12)
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
                    className={`p-4 border text-left transition-all flex items-center gap-3.5 ${
                      cardType === "basic"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="1" y="1" width="22" height="30" rx="3" />
                      <rect x="3.5" y="3.5" width="17" height="4" rx="1" fill="currentColor" fillOpacity="0.15" />
                      <rect x="3.5" y="9" width="17" height="12" rx="1" fill="currentColor" fillOpacity="0.08" />
                      <line x1="3.5" y1="23" x2="15" y2="23" />
                      <line x1="3.5" y1="26" x
