
import { Flag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "Apply for eTA", href: "/apply" },
  { name: "My Applications", href: "/dashboard" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="w-full border-b bg-white/95 backdrop-blur sticky top-0 z-30 shadow-sm">
      <nav className="max-w-[1440px] mx-auto flex items-center px-8 py-0 h-16">
        <div className="flex items-center gap-2">
          <Flag className="text-green-700" size={24} />
          <span className="text-lg font-bold tracking-tight text-gray-800">Kenya eTA</span>
        </div>
        <div className="flex-1" />
        <ul className="flex gap-6 items-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={cn(
                  "relative group px-4 py-2 rounded-md transition-colors text-sm font-medium",
                  pathname === link.href 
                    ? "bg-green-50 text-green-700" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
