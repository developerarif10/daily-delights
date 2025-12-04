import { Clock, MapPin } from "lucide-react";
export default function Header() {
  return (
    <header className="relative -mt-3 z-10">
      <div className="mx-auto max-w-3xl">
        <div className="backdrop-blur-md bg-orange-600/85 text-white rounded-2xl px-4 py-4 shadow-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/20 p-2 shadow-inner">
              <span className="text-xl">🍕</span>
            </div>
            <div>
              <div className="text-lg font-bold leading-tight">
                Daily Delights Pizza
              </div>
              <div className="text-xs opacity-90">
                Hot pizza — campus delivery in ~20 mins
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-sm">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
              <Clock size={14} /> 4PM - 11PM
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
              <MapPin size={14} /> Campus Wide
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
