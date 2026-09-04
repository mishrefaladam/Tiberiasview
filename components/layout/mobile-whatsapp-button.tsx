"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {MessageCircle} from "lucide-react";
import {siteConfig} from "@/lib/site-config";

export function MobileWhatsAppButton() {
  const pathname = usePathname();

  // The booking page is itself a WhatsApp flow with its own send button, and the
  // floating bubble overlaps the date/time fields on small screens — hide it there.
  if (pathname.includes("/booking")) {
    return null;
  }

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
