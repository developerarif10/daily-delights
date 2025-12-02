import { CheckCircle, ChevronRight } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";
import PriceBadge from "./PriceBadge";

/*
  Updated MenuItem with tighter alignment and improved visual balance.
  The component itself is stateless and receives selected/onSelect props.
*/
export default function MenuItem({ pizza, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(pizza)}
      className="w-full text-left flex items-center gap-4 p-2"
      aria-pressed={selected}
    >
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
        <ImageWithFallback
          images={pizza.images}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {pizza.name}
          </h3>
          <PriceBadge>{pizza.price}৳</PriceBadge>
        </div>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{pizza.desc}</p>

        <div className="mt-3 flex items-center gap-2">
          {pizza.tag && (
            <span className="inline-block text-xs font-semibold text-white bg-orange-500 px-2 py-0.5 rounded">
              {pizza.tag}
            </span>
          )}
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
}
