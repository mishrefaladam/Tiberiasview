import Link from "next/link";

export default function RootPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 text-center text-deep-green">
      <div>
        <p dir="rtl" className="text-2xl font-extrabold">
          متنزه واستراحة بحيرة طبريا
        </p>
        <Link href="/ar" className="tv-btn-primary mt-6 inline-flex">
          افتح الموقع
        </Link>
      </div>
    </main>
  );
}
