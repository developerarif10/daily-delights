"use client";

import { Phone, Send, ShoppingBag, XCircle } from "lucide-react";
import { useMemo, useState } from "react";

import Footer from "./Footer";
import Header from "./Header";
import MenuItem from "./MenuItem";
import QuantityControl from "./QuantityControl";

/*
  Client component: interactive ordering UI.
  Improvements:
  - Centered layout with consistent max-width
  - Translucent "glass" cards (backdrop blur + semi-transparent background)
  - Proper spacing and alignment
  - Form sticks visually under the selected card with consistent width
  - Mobile-first and responsive (cards stack on small screens)
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
    phone: "+880", // default BD country code
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
    v = v.replace(/\s+/g, "");
    if (v.startsWith("+880")) return v;
    if (v.startsWith("880")) return "+" + v;
    if (v.startsWith("0")) return "+880" + v.slice(1);
    if (/^\d+$/.test(v) && v.length <= 11 && v.startsWith("1"))
      return "+880" + v;
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

    window.open(waUrl, "_blank");
    setTimeout(() => setSubmitting(false), 400);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Top header card (glass) */}
      <Header />

      {/* Small spacer */}
      <div className="h-6" />

      {/* Main content: menu list */}
      <section className="space-y-4">
        <div className="backdrop-blur-sm bg-white/60 border border-white/30 rounded-xl px-4 py-3 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag size={18} className="text-orange-600" />
              <div>
                <div className="text-sm font-semibold">
                  Today&apos;s Specials
                </div>
                <div className="text-xs text-gray-600">
                  Select a pizza to start your order
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Secure & Contactless</div>
          </div>
        </div>

        {/* Menu items: each is a semi-transparent card */}
        <div className="space-y-3">
          {MENU.map((p) => (
            <div key={p.id} className="relative">
              <div
                className={`backdrop-blur-sm transition-all rounded-xl p-3 border border-white/30 shadow-sm
                  ${
                    selectedPizza?.id === p.id
                      ? "bg-white/70 shadow-lg ring-2 ring-orange-200"
                      : "bg-white/50 hover:shadow-md hover:scale-[1.01]"
                  }`}
              >
                <MenuItem
                  pizza={p}
                  selected={selectedPizza?.id === p.id}
                  onSelect={(pizza) => {
                    setSelectedPizza(pizza);
                    setQuantity(1);
                    // scroll form into view on select (mobile friendly)
                    const form = document.getElementById("order-form");
                    if (form)
                      form.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Order form card */}
        <div id="order-form" className="mt-4">
          <form
            onSubmit={handleOrderSubmit}
            className="backdrop-blur-md bg-white/70 border border-white/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">{selectedPizza?.name}</h3>
                <p className="text-xs text-gray-600">{selectedPizza?.desc}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">{total}৳</div>
                <div className="text-xs text-gray-400">Est. total</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-700">Quantity</div>
              <QuantityControl value={quantity} onChange={setQuantity} />
            </div>

            <div className="mt-6 grid gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Your name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Rahim Uddin"
                  className="w-full mt-1 p-3 bg-white/60 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-300 outline-none"
                  autoComplete="name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600">
                    Hall / Location
                  </label>
                  <select
                    name="hall"
                    value={formData.hall}
                    onChange={(e) => updateField("hall", e.target.value)}
                    className="w-full mt-1 p-3 bg-white/60 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-300 outline-none"
                  >
                    {HALLS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">
                    Room / Gate
                  </label>
                  <input
                    name="room"
                    value={formData.room}
                    onChange={(e) => updateField("room", e.target.value)}
                    placeholder="Ex: 304"
                    className="w-full mt-1 p-3 bg-white/60 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
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
                    className="w-full pl-10 p-3 bg-white/60 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-300 outline-none"
                    inputMode="tel"
                    aria-invalid={!!phoneError}
                  />
                </div>
                {phoneError ? (
                  <p className="text-xs mt-1 text-red-500 flex items-center gap-2">
                    <XCircle size={14} />
                    {phoneError}
                  </p>
                ) : (
                  <p className="text-xs mt-1 text-gray-500">
                    Default country code is{" "}
                    <span className="font-semibold">+880</span> (Bangladesh). We
                    will confirm via WhatsApp.
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Extra note
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={(e) => updateField("note", e.target.value)}
                  placeholder="Ex: Extra spicy, call when you reach gate..."
                  className="w-full mt-1 p-3 bg-white/60 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-300 outline-none h-24 resize-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={
                  !formData.name.trim() || !formData.phone.trim() || submitting
                }
                className={`w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl font-bold text-white transition transform active:scale-95
                  ${
                    !formData.name.trim() ||
                    !formData.phone.trim() ||
                    submitting
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                <Send size={18} />{" "}
                {submitting ? "Opening WhatsApp..." : "Order via WhatsApp"}
              </button>

              <div className="mt-3 text-center text-xs text-gray-600">
                Total:{" "}
                <span className="font-semibold text-gray-800">{total}৳</span> •
                Confirm on WhatsApp
              </div>
            </div>
          </form>
        </div>

        <Footer />
      </section>
    </div>
  );
}
