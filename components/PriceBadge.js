const PriceBadge = ({ children }) => (
  <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 bg-white/60 px-3 py-1 rounded-full shadow-sm">
    {children}
  </span>
);

export default PriceBadge;
