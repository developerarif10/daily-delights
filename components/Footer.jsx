import { Clock, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="lg-my-8 my-4 text-center text-xs text-gray-500">
      <div className="flex items-center justify-center gap-2">
        <MapPin size={12} /> Campus Delivery • <Clock size={12} /> 20 mins (est)
      </div>
      <div className="mt-2">Built with care • Odommo Digital</div>
    </footer>
  );
}
