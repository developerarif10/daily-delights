"use client";

import { Clock, MapPin, Phone, Send, ShoppingBag, XCircle } from "lucide-react";
import { useMemo, useState } from "react";

import MenuItem from "./MenuItem";
import QuantityControl from "./QuantityControl";

/*
  Client component that receives initial data from the server page.
  Updated: phone input now defaults to Bangladesh country code (+880)
  and normalizes common local input patterns on blur:
    - "01XXXXXXXXX" -> "+8801XXXXXXXXX"
    - "0XXXXXXXXX"  -> "+880XXXXXXXXX"
    - "8801XXXXXXXXX" -> "+8801XXXXXXXXX"
    - "880XXXXXXXXX"  -> "+880XXXXXXXXX"
    - leaves "+880..." and other international formats intact
*/

export default function OrderApp({ initialMenu = [], halls = [] }) {
  const MENU = initialMenu;
  const HALLS = halls.length ? halls : ["Shah Amanat Hall"];

  const [selectedPizza, setSelectedPizza] = useState(MENU[0] || null);
  const [quantity, setQuantity] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    hall: HALLS[0],
    room: "",
    // default BD country code
    phone: "+880",
    note: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const total = useMemo(
    () => (selectedPizza ? selectedPizza.price * quantity : 0),
    [selectedPizza, quantity]
  );

  const updateField = (name, value) => {
    setFormData((s) => ({ ...s, [name]: value }));
    if (name === "phone" && phoneError) setPhoneError("");
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 9;
  };

  const normalizePhoneForWhatsApp = (raw) => {
    if (!raw) return "";
    const trimmed = raw.trim();
    if (trimmed[0] === "+") {
      return "+" + trimmed.slice(1).replace(/\D/g, "");
    }
    return trimmed.replace(/\D/g, "");
  };

  const normalizeLocalBDInput = (raw) => {
    if (!raw) return "+880";
    let v = raw.trim();

    // remove surrounding spaces
    v = v.replace(/\s+/g, "");

    // already in +880 format
    if (v.startsWith("+880")) return v;

    // starts with 880 (e.g., 8801...)
    if (v.startsWith("880")) {
      return "+".concat(v);
    }

    // starts with 0 (local format) -> replace leading 0 with +880
    if (v.startsWith("0")) {
      return "+880" + v.slice(1);
    }

    // if user just typed digits starting with 1 (without leading 0), assume they meant local and prefix +880
    if (/^\d+$/.test(v) && v.length <= 11 && v.startsWith("1")) {
      return "+880" + v;
    }

    // otherwise return as-is (could be another international format)
    return v;
  };

  const handlePhoneBlur = () => {
    setFormData((s) => ({ ...s, phone: normalizeLocalBDInput(s.phone) }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please provide your name.");
      return;
    }
    if (!formData.phone.trim()) {
      alert("Please provide a phone number.");
      return;
    }
    if (!validatePhone(formData.phone)) {
      setPhoneError("Please provide a valid phone with at least 9 digits.");
      return;
    }

    setSubmitting(true);

    const businessNumber = "8801685366704"; // << Replace with real number

    const message = [
      "*🍕 NEW PIZZA ORDER!*",
      "",
      `*Order:* ${selectedPizza?.name || "—"}`,
      `*Qty:* ${quantity} x ${selectedPizza?.price || 0}৳`,
      `*Total Bill:* ${total}৳`,
      "------------------",
      `*Name:* ${formData.name}`,
      `*Location:* ${formData.hall}${
        formData.room ? `, Room ${formData.room}` : ""
      }`,
      `*Phone:* ${formData.phone}`,
      `*Note:* ${formData.note || "—"}`,
      "",
      "_Please confirm availability & estimated delivery time._",
    ].join("\n");

    let waUrl = "";
    if (businessNumber.includes("X")) {
      // Developer placeholder: open web.whatsapp.com with message typed
      waUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
        message
      )}`;

      console.warn(
        "Replace businessNumber with the real international phone (no placeholders)."
      );
    } else {
      const phoneForWhatsApp = normalizePhoneForWhatsApp(businessNumber);
      waUrl = `https://wa.me/${phoneForWhatsApp}?text=${encodeURIComponent(
        message
      )}`;
    }

    // Open WhatsApp in a new tab/window
    window.open(waUrl, "_blank");

    // Small delay to let the new tab open, then reset submitting state
    setTimeout(() => setSubmitting(false), 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans text-gray-900 pb-24">
      <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-5">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center text-2xl font-extrabold shadow">
              🍕
            </div>
            <div>
              <h1 className="text-xl font-extrabold leading-tight">
                Daily Delights Pizza
              </h1>
              <p className="text-xs opacity-90">
                Hot pizza — campus delivery in ~20 mins
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm bg-white/10 px-3 py-1 rounded-md">
            <div className="flex items-center gap-2">
              <Clock size={14} /> 4PM - 11PM
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> Campus Wide
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-orange-500" />
              <div>
                <div className="text-sm font-bold">Today&apos;s Specials</div>
                <div className="text-xs text-gray-500">
                  Select a pizza to start your order
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">Secure & Contactless</div>
          </div>
        </div>

        {/* MENU */}
        <section className="grid gap-3 mb-6">
          {MENU.map((p) => (
            <MenuItem
              key={p.id}
              pizza={p}
              selected={selectedPizza?.id === p.id}
              onSelect={(pizza) => {
                setSelectedPizza(pizza);
                setQuantity(1);
              }}
            />
          ))}
        </section>

        {/* ORDER FORM */}
        <form
          onSubmit={handleOrderSubmit}
          className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">{selectedPizza?.name}</h2>
              <p className="text-xs text-gray-500">{selectedPizza?.desc}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-800">{total}৳</div>
              <div className="text-xs text-gray-400">Est. total</div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Quantity</div>
            <QuantityControl value={quantity} onChange={setQuantity} />
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500">
                Your name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Rahim Uddin"
                className="w-full mt-1 p-3 bg-gray-50 rounded-lg border focus:border-orange-400 outline-none"
                autoComplete="name"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Hall / Location
                </label>
                <select
                  name="hall"
                  value={formData.hall}
                  onChange={(e) => updateField("hall", e.target.value)}
                  className="w-full mt-1 p-3 bg-gray-50 rounded-lg border focus:border-orange-400 outline-none"
                >
                  {HALLS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Room / Gate
                </label>
                <input
                  name="room"
                  value={formData.room}
                  onChange={(e) => updateField("room", e.target.value)}
                  placeholder="Ex: 304"
                  className="w-full mt-1 p-3 bg-gray-50 rounded-lg border focus:border-orange-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">
                Phone number
              </label>
              <div className="relative mt-1">
                <Phone
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onBlur={handlePhoneBlur}
                  placeholder="+8801XXXXXXXXX or 01XXXXXXXXX"
                  className="w-full pl-10 p-3 bg-gray-50 rounded-lg border focus:border-orange-400 outline-none"
                  inputMode="tel"
                  aria-invalid={!!phoneError}
                />
              </div>
              {phoneError ? (
                <p className="text-xs mt-1 text-red-500 flex items-center gap-2">
                  <XCircle size={14} /> {phoneError}
                </p>
              ) : (
                <p className="text-xs mt-1 text-gray-400">
                  Default country code is +880 (Bangladesh). We will confirm via
                  WhatsApp.
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">
                Extra note
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={(e) => updateField("note", e.target.value)}
                placeholder="Ex: Extra spicy, call when you reach gate..."
                className="w-full mt-1 p-3 bg-gray-50 rounded-lg border focus:border-orange-400 outline-none h-20 resize-none"
              />
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              disabled={
                !formData.name.trim() || !formData.phone.trim() || submitting
              }
              className={`w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl font-bold text-white transition transform active:scale-95
                ${
                  !formData.name.trim() || !formData.phone.trim() || submitting
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
            >
              <Send size={18} />
              {submitting ? "Opening WhatsApp..." : "Order via WhatsApp"}
            </button>

            <div className="mt-3 text-center text-xs text-gray-500">
              Total:{" "}
              <span className="font-semibold text-gray-800">{total}৳</span> •
              Confirm on WhatsApp
            </div>
          </div>
        </form>

        <footer className="mt-6 mb-10 text-center text-xs text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <MapPin size={12} /> Campus Delivery • <Clock size={12} /> 20 mins
            (est)
          </div>
          <div className="mt-2">
            Built with care • Replace the business number in code before going
            live
          </div>
        </footer>
      </main>
    </div>
  );
}
