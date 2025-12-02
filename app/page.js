import { HALLS } from "@/data/halls";
import { MENU } from "@/data/menu";
import OrderApp from "../components/OrderApp";
/*
  Server-rendered page (app/router). This file runs on the server and
  sends fully-rendered HTML for faster first paint and SEO.

  It passes static data (MENU, HALLS) down to a client component (OrderApp)
  which handles all interactive behavior (state, form, WhatsApp redirect).
*/
export default function Page() {
  // If you later fetch from an external API, you can do it here using fetch()
  // with { next: { revalidate: 60 } } for ISR or not for pure SSR.
  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Pass the data serializably into the client component */}
      <OrderApp initialMenu={MENU} halls={HALLS} />
    </main>
  );
}
