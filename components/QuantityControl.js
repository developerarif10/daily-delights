import { Minus, Plus } from "lucide-react";

const QuantityControl = ({ value, onChange }) => {
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
};

export default QuantityControl;
