import {
  CheckCircle,
  ChevronRight,
  Clock,
  MapPin,
  Minus,
  Phone,
  Plus,
  Send,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

/*
  Mobile-first, single-file React component (JavaScript + JSX)
  - Cleaned up and refactored into small components
  - Improved, more professional UI using Tailwind CSS
  - Fully controlled form inputs + basic validation
  - WhatsApp order flow preserved and improved (phone normalization hint)
  - Modern visual touches: subtle gradients, shadows, pill tags, accessible controls
*/

/* ------------------------------
   DATA: Menu and Halls
   ------------------------------ */
const MENU = [
  {
    id: 1,
    name: "The Campus Cheesy",
    price: 250,
    desc: "Loaded with extra mozzarella and our secret spicy sauce.",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Chicken Overload",
    price: 320,
    desc: "BBQ chicken chunks, onions, and capsicum.",
    tag: "Spicy",
  },
  {
    id: 3,
    name: "Veggie Supreme",
    price: 200,
    desc: "Mushrooms, corn, olives, and fresh paneer.",
    tag: "Veg",
  },
];

const HALLS = [
  "Shah Amanat Hall",
  "Shamsun Nahar Hall",
  "A. F. Rahman Hall",
  "Shah Jalal Hall",
  "Suhrawardy Hall",
  "Pritilata Hall",
  "Other / Off-Campus",
];

/* ------------------------------
   Small presentational components
   ------------------------------ */
function PriceBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 bg-white/60 px-3 py-1 rounded-full shadow-sm">
      {children}
    </span>
  );
}

function TagPill({ children }) {
  return (
    <span className="inline-block text-xs font-semibold text-white bg-orange-500 px-2 py-0.5 rounded">
      {children}
    </span>
  );
}

function MenuItem({ pizza, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(pizza)}
      className={`group w-full text-left p-4 rounded-xl flex items-center justify-between transition-shadow border
        ${
          selected
            ? "border-orange-300 shadow-lg bg-gradient-to-tr from-white to-orange-50"
            : "border-transparent bg-white hover:shadow-md"
        }`}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-50 text-orange-600 text-lg font-extrabold shadow-inner">
          🍕
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <h3 className="text-sm font-bold text-gray-800">{pizza.name}</h3>
            <div className="ml-1">
              {pizza.tag && <TagPill>{pizza.tag}</TagPill>}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{pizza.desc}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <PriceBadge>{pizza.price}৳</PriceBadge>
        {selected ? (
          <CheckCircle size={18} className="text-orange-500" />
        ) : (
          <ChevronRight size={18} className="text-gray-300" />
        )}
      </div>
    </button>
  );
}

function QuantityControl({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-3 bg-white rounded-full px-2 py-1 shadow-sm">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="p-2 rounded-full text-orange-600 hover:bg-orange-50"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <div className="w-10 text-center font-bold">{value}</div>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="p-2 rounded-full text-orange-600 hover:bg-orange-50"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

/* ------------------------------
   Utility helpers
   ------------------------------ */
const formatCurrency = (amount) => `${amount}৳`;

/* Basic phone normalization: strip non-digits and keep leading + if provided.
   This keeps the message friendly and avoids broken wa.me URLs.
*/
const normalizePhoneForWhatsApp = (raw) => {
  if (!raw) return "";
  const trimmed = raw.trim();
  // if it starts with + keep it and digits
  if (trimmed[0] === "+") {
    return "+" + trimmed.slice(1).replace(/\D/g, "");
  }
  // otherwise strip non-digits
  return trimmed.replace(/\D/g, "");
};

/* ------------------------------
   Main Component
   ------------------------------ */
const PizzaShop = () => {
  // Order state
  const [selectedPizza, setSelectedPizza] = useState(MENU[0]);
  const [quantity, setQuantity] = useState(1);

  // Form data (fully controlled)
  const [formData, setFormData] = useState({
    name: "",
    hall: HALLS[0],
    room: "",
    phone: "",
    note: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const total = useMemo(
    () => selectedPizza.price * quantity,
    [selectedPizza, quantity]
  );

  const updateField = (name, value) => {
    setFormData((s) => ({ ...s, [name]: value }));
    if (name === "phone" && phoneError) setPhoneError("");
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    // basic rule: require at least 9 digits
    return digits.length >= 9;
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Basic required fields
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

    // Business number (replace before production)
    const businessNumber = "8801XXXXXXXXX";

    const phoneForWhatsApp = normalizePhoneForWhatsApp(businessNumber);
    const senderPhone = normalizePhoneForWhatsApp(formData.phone);

    // WhatsApp-formatted message
    const message = [
      "*🍕 NEW PIZZA ORDER!*",
      "",
      `*Order:* ${selectedPizza.name}`,
      `*Qty:* ${quantity} x ${selectedPizza.price}৳`,
      `*Total Bill:* ${formatCurrency(total)}`,
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

    // Build wa.me link. Use business number; if it's placeholder, open the message in a new tab but warn dev
    let waUrl = "";
    if (businessNumber.includes("X")) {
      // developer hasn't replaced business number; fallback to wa.me without number (opens WhatsApp Web with typed message)
      waUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
        message
      )}`;
      // Also include a small developer warning in console

      console.warn(
        "Replace businessNumber with the real international phone (e.g., 8801XXXXXXXXX -> 8801XXXXXXXXX without X's)."
      );
    } else {
      waUrl = `https://wa.me/${phoneForWhatsApp}?text=${encodeURIComponent(
        message
      )}`;
    }

    // open in new tab
    window.open(waUrl, "_blank");
    setTimeout(() => setSubmitting(false), 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans text-gray-900 pb-24">
      {/* Header / Hero */}
      <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-5">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center text-2xl font-extrabold shadow">
              🍕
            </div>
            <div>
              <h1 className="text-xl font-extrabold leading-tight">
                daily delights pizza
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
        {/* Quick info card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-orange-500" />
              <div>
                <div className="text-sm font-bold">Today's Specials</div>
                <div className="text-xs text-gray-500">
                  Select a pizza to start your order
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">Secure & Contactless</div>
          </div>
        </div>

        {/* Menu */}
        <section className="grid gap-3 mb-6">
          {MENU.map((p) => (
            <MenuItem
              key={p.id}
              pizza={p}
              selected={selectedPizza.id === p.id}
              onSelect={(pizza) => {
                setSelectedPizza(pizza);
                setQuantity(1);
              }}
            />
          ))}
        </section>

        {/* Order Form */}
        <form
          onSubmit={handleOrderSubmit}
          className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">{selectedPizza.name}</h2>
              <p className="text-xs text-gray-500">{selectedPizza.desc}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-800">
                {formatCurrency(total)}
              </div>
              <div className="text-xs text-gray-400">Est. total</div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Quantity</div>
            <QuantityControl value={quantity} onChange={setQuantity} />
          </div>

          {/* Inputs */}
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
                  We will confirm via WhatsApp — include country code if
                  off-campus.
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
              <span className="font-semibold text-gray-800">
                {formatCurrency(total)}
              </span>{" "}
              • Confirm on WhatsApp
            </div>
          </div>
        </form>

        <footer className="mt-6 mb-10 text-center text-xs text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <MapPin size={12} /> Campus Delivery • <Clock size={12} /> 20 mins
            (est)
          </div>
          <div className="mt-2">Built with care • A&J Digital live</div>
        </footer>
      </main>
    </div>
  );
};

export default PizzaShop;
