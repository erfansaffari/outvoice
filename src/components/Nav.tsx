"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Settings, FileText, History, Users } from "lucide-react";

export default function Nav() {
  const path = usePathname();

  const link = (href: string, label: string, Icon: React.ElementType) => (
    <Link
      href={href}
      className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
        path === href
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon size={16} />
      {label}
    </Link>
  );

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 no-print">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-blue-600 text-lg">
          <Camera size={22} />
          SnapBill
        </Link>
        <nav className="flex items-center gap-1">
          {link("/", "New Invoice", FileText)}
          {link("/history", "History", History)}
          {link("/contacts", "Contacts", Users)}
          {link("/settings", "Settings", Settings)}
        </nav>
      </div>
    </header>
  );
}
