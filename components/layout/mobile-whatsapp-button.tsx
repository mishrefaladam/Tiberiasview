import Link from "next/link";
import {MessageCircle} from "lucide-react";
import {siteConfig} from "@/lib/site-config";

export function MobileWhatsAppButton() {
  return (
    <Link
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/35 transition hover:scale-105 md:hidden"
    >
      <MessageCircle size={26} />
    </Link>
  );
}
