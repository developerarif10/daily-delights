import { CheckCircle, ChevronRight } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";
import PriceBadge from "./PriceBadge";

const TagPill = ({ children }) => (
  <span className="inline-block text-xs font-semibold text-white bg-orange-500 px-2 py-0.5 rounded">
    {children}
  </span>
);

const MenuItem = ({ pizza, selected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(pizza)}
      className={`group w-full text-left p-3 rounded-xl flex items-center gap-3 transition-shadow border
        ${
          selected
            ? "border-orange-300 shadow-lg bg-gradient-to-tr from-white to-orange-50"
            : "border-transparent bg-white hover:shadow-md"
        }`}
      aria-pressed={selected}
    >
      <div className="w-20 h-20 flex-shrink-0">
        <ImageWithFallback images={pizza.images} className="rounded-lg" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-gray-800 truncate">
            {pizza.name}
          </h3>
          <div className="flex items-center gap-2">
            <PriceBadge>{pizza.price}৳</PriceBadge>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{pizza.desc}</p>
        <div className="mt-2">
          {pizza.tag && <TagPill>{pizza.tag}</TagPill>}
        </div>
      </div>

      <div className="flex-shrink-0 ml-2">
        {selected ? (
          <CheckCircle size={18} className="text-orange-500" />
        ) : (
          <ChevronRight size={18} className="text-gray-300" />
        )}
      </div>
    </button>
  );
};

export default MenuItem;
