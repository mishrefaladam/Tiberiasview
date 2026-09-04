// The static export (GitHub Pages) can't run server-side redirects or
// middleware, so "/" is a real prerendered page. A <meta refresh> is the
// only redirect that works with no JavaScript and no server — it fires
// before paint, so visitors land on /ar without seeing this page or
// needing to click anything. The link below only shows if that's ever
// blocked.
export default function RootPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 text-center text-deep-green">
      <meta httpEquiv="refresh" content="0; url=/ar" />
      <p dir="rtl" className="text-2xl font-extrabold">
        متنزه واستراحة بحيرة طبريا
      </p>
    </main>
  );
}
