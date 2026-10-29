import React, { useState } from 'react';
import { Layers, Sparkles, Copy, Check, Upload, Tag } from 'lucide-react';

export default function CustomCardForm() {
  // Product Selector Mode
  const [productType, setProductType] = useState<'card' | 'sticker'>('card');

  // Customer Contact Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Design Details (Shared by both Card and Sticker designs)
  const [cardStyle, setCardStyle] = useState<'basic' | 'fullArt'>('basic');
  const [pokemonType, setPokemonType] = useState('Fire Type');
  const [cardName, setCardName] = useState('');
  const [attackText, setAttackText] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  // Card Add-ons
  const [addHolo, setAddHolo] = useState(false);
  const [addHolder, setAddHolder] = useState(false);
  const [addDuplicateCard, setAddDuplicateCard] = useState(false);
  const [addStickerSheet, setAddStickerSheet] = useState(false); // $5 Add-on on Card order

  // Standalone Sticker Add-ons
  const [addDuplicateSticker, setAddDuplicateSticker] = useState(false); // $5 Add-on on Sticker order

  // UI / Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Dynamic Total Price Calculation
  const calculateTotal = () => {
    let total = cardStyle === 'fullArt' ? 12 : 10; // Base $10 for Basic, $12 for Full Art

    if (productType === 'card') {
      if (addHolo) total += 2;
      if (addHolder) total += 2;
      if (addDuplicateCard) total += 8;
      if (addStickerSheet) total += 5;
    } else {
      // Standalone Sticker Sheet order
      if (addDuplicateSticker) total += 5;
    }

    return total;
  };

  // Reset add-on checkboxes when switching product type
  const handleProductTypeChange = (type: 'card' | 'sticker') => {
    setProductType(type);
    setAddHolo(false);
    setAddHolder(false);
    setAddDuplicateCard(false);
    setAddStickerSheet(false);
    setAddDuplicateSticker(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please fill out your name and phone number.');
      return;
    }
    setIsSubmitting(true);

    // Simulated API call payload structure
    const payload = {
      productType: productType === 'card' ? 'Custom Card' : 'Sticker Sheet Only',
      customerName,
      customerPhone,
      cardStyle,
      pokemonType,
      cardName,
      attackText,
      addOns:
        productType === 'card'
          ? {
              holo: addHolo,
              holder: addHolder,
              duplicateCard: addDuplicateCard,
              stickerSheetAddon: addStickerSheet,
            }
          : {
              duplicateStickerSheet: addDuplicateSticker,
            },
      totalPrice: calculateTotal(),
    };

    console.log('Submitting Order Payload:', payload);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-[#0a0a0a] border border-[#b5ff00]/40 rounded-2xl text-center text-white">
        <div className="w-16 h-16 bg-[#b5ff00]/10 text-[#b5ff00] rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2 uppercase font-['Chakra_Petch']">Order Submitted!</h2>
        <p className="text-zinc-400 text-sm mb-6 font-['Space_Mono']">
          Thanks {customerName}! We have received your custom order request and will contact you shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setCustomerName('');
            setCustomerPhone('');
            setCardName('');
            setAttackText('');
            setPhoto(null);
            handleProductTypeChange('card');
          }}
          className="w-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Create Another Order
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-8 p-6 sm:p-8 bg-[#0a0a0a] text-white rounded-2xl border border-zinc-800 shadow-2xl font-['Space_Mono']">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-wider text-[#b5ff00] uppercase font-['Chakra_Petch']">
          IN THE FOLD TCG
        </h2>
        <p className="text-zinc-400 text-xs mt-1">Design your custom cards or sticker sheets below. Total updates dynamically.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TOP SELECTOR: ITEM TYPE */}
        <div>
          <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
            1. SELECT ITEM TYPE *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleProductTypeChange('card')}
              className={`p-3.5 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${
                productType === 'card'
                  ? 'border-[#b5ff00] bg-[#b5ff00]/10 text-[#b5ff00]'
                  : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="text-xs uppercase">Custom Card</div>
                <div className="text-[10px] font-normal text-zinc-400">Starts at $10</div>
              </div>
              {productType === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#b5ff00]" />}
            </button>

            <button
              type="button"
              onClick={() => handleProductTypeChange('sticker')}
              className={`p-3.5 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${
                productType === 'sticker'
                  ? 'border-[#b5ff00] bg-[#b5ff00]/10 text-[#b5ff00]'
                  : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="text-xs uppercase">🏷️ Sticker Sheet</div>
                <div className="text-[10px] font-normal text-zinc-400">12 Stickers · Starts at $10</div>
              </div>
              {productType === 'sticker' && <div className="w-2.5 h-2.5 rounded-full bg-[#b5ff00]" />}
            </button>
          </div>
        </div>

        {/* CUSTOMER CONTACT DETAILS */}
        <div className="space-y-4 pt-4 border-t border-zinc-800/80">
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
              CUSTOMER NAME *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:border-[#b5ff00] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
              CUSTOMER PHONE *
            </label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="e.g. 555-123-4567"
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:border-[#b5ff00] outline-none transition-all"
            />
          </div>
        </div>

        {/* CUSTOMIZATION DETAILS (SHARED FIELDS) */}
        <div className="space-y-4 pt-4 border-t border-zinc-800/80">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            2. {productType === 'card' ? 'CARD DESIGN DETAILS' : 'STICKER SHEET DESIGN DETAILS'}
          </div>

          {/* STYLE SELECTOR */}
          <div>
            <label className="block text-[10px] text-zinc-400 uppercase mb-1.5">STYLE *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCardStyle('basic')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all ${
                  cardStyle === 'basic'
                    ? 'border-[#b5ff00] bg-[#b5ff00]/10 text-[#b5ff00]'
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400'
                }`}
              >
                BASIC STYLE ($10)
              </button>
              <button
                type="button"
                onClick={() => setCardStyle('fullArt')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all ${
                  cardStyle === 'fullArt'
                    ? 'border-[#b5ff00] bg-[#b5ff00]/10 text-[#b5ff00]'
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400'
                }`}
              >
                FULL ART STYLE ($12)
              </button>
            </div>
          </div>

          {/* POKEMON TYPE */}
          <div>
            <label className="block text-[10px] text-zinc-400 uppercase mb-1.5">POKÉMON TYPE *</label>
            <select
              value={pokemonType}
              onChange={(e) => setPokemonType(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 outline-none focus:border-[#b5ff00]"
            >
              <option value="Fire Type">Fire Type</option>
              <option value="Water Type">Water Type</option>
              <option value="Grass Type">Grass Type</option>
              <option value="Electric Type">Electric Type</option>
              <option value="Psychic Type">Psychic Type</option>
              <option value="Fighting Type">Fighting Type</option>
              <option value="Colorless Type">Colorless Type</option>
            </select>
          </div>

          {/* NAME ON CARD */}
          <div>
            <label className="block text-[10px] text-zinc-400 uppercase mb-1.5">NAME ON ITEM *</label>
            <input
              type="text"
              required
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="e.g. Trainer Mike"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 outline-none focus:border-[#b5ff00]"
            />
          </div>

          {/* ATTACK / ABILITY TEXT */}
          <div>
            <label className="block text-[10px] text-zinc-400 uppercase mb-1.5">ATTACK / ABILITY & TEXT *</label>
            <input
              type="text"
              required
              value={attackText}
              onChange={(e) => setAttackText(e.target.value)}
              placeholder="e.g. Strike - 100"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 outline-none focus:border-[#b5ff00]"
            />
          </div>

          {/* SUBJECT PHOTO UPLOAD */}
          <div>
            <label className="block text-[10px] text-zinc-400 uppercase mb-1.5">SUBJECT PHOTO *</label>
            <div className="relative border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 rounded-lg p-4 text-center cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/*"
                required={!photo}
                onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center space-y-1">
                <Upload className="w-5 h-5 text-[#b5ff00] mb-1" />
                <span className="text-xs text-zinc-300 font-bold">
                  {photo ? photo.name : 'Select or drop card image photo'}
                </span>
                <span className="text-[10px] text-zinc-500">JPG, PNG, or WEBP</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONDITIONALLY RENDERED ADD-ONS */}
        <div className="pt-4 border-t border-zinc-800/80">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
            3. ADD-ONS
          </div>

          {productType === 'card' ? (
            /* CARD MODE ADD-ONS */
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-2.5 bg-zinc-900 border border-zinc-800 p-3 rounded-xl cursor-pointer hover:border-zinc-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={addHolo}
                    onChange={(e) => setAddHolo(e.target.checked)}
                    className="accent-[#b5ff00] w-4 h-4 rounded"
                  />
                  <span className="text-xs text-zinc-200">Holo Layer (+$2)</span>
                </label>

                <label className="flex items-center space-x-2.5 bg-zinc-900 border border-zinc-800 p-3 rounded-xl cursor-pointer hover:border-zinc-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={addHolder}
                    onChange={(e) => setAddHolder(e.target.checked)}
                    className="accent-[#b5ff00] w-4 h-4 rounded"
                  />
                  <span className="text-xs text-zinc-200">Magnetic Case (+$2)</span>
                </label>
              </div>

              {/* DUPLICATE CARD */}
              <div
                onClick={() => setAddDuplicateCard(!addDuplicateCard)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  addDuplicateCard
                    ? 'border-[#b5ff00] bg-[#b5ff00]/10'
                    : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">DUPLICATE CARD COPY</div>
                  <div className="text-[10px] text-zinc-400">An exact second physical card</div>
                </div>
                <span className="text-xs font-bold text-[#b5ff00]">
                  {addDuplicateCard ? 'ADDED (+$8)' : '+ ADD ($8)'}
                </span>
              </div>

              {/* STICKER SHEET ADD-ON ($5) */}
              <div
                onClick={() => setAddStickerSheet(!addStickerSheet)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  addStickerSheet
                    ? 'border-[#b5ff00] bg-[#b5ff00]/10'
                    : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">CUSTOM STICKER SHEET</div>
                  <div className="text-[10px] text-zinc-400">12 stickers (4 rows of 3) matching card art</div>
                </div>
                <span className="text-xs font-bold text-[#b5ff00]">
                  {addStickerSheet ? 'ADDED (+$5)' : '+ ADD ($5)'}
                </span>
              </div>
            </div>
          ) : (
            /* STICKER SHEET MODE ADD-ONS */
            <div className="space-y-3">
              <div
                onClick={() => setAddDuplicateSticker(!addDuplicateSticker)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  addDuplicateSticker
                    ? 'border-[#b5ff00] bg-[#b5ff00]/10'
                    : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">DUPLICATE STICKER SHEET</div>
                  <div className="text-[10px] text-zinc-400">Extra sheet of 12 stickers with matching artwork</div>
                </div>
                <span className="text-xs font-bold text-[#b5ff00]">
                  {addDuplicateSticker ? 'ADDED (+$5)' : '+ ADD ($5)'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* SUBMIT FOOTER */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase text-zinc-400">TOTAL PRICE</div>
            <div className="text-2xl font-black text-[#b5ff00] font-['Chakra_Petch']">
              ${calculateTotal()}.00
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#b5ff00] hover:bg-[#a0e600] text-black font-bold font-['Chakra_Petch'] px-6 py-3 rounded-xl uppercase tracking-wider text-xs transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'PROCESSING...' : `SUBMIT ORDER ($${calculateTotal()})`}
          </button>
        </div>
      </form>
    </div>
  );
}
