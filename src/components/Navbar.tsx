import { Flag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const links = [
  { name: "Home", href: "/" },
  { name: "Apply for eTA", href: "/apply" },
  { name: "My Applications", href: "/dashboard" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-30">
      <nav className="max-w-[1440px] mx-auto flex items-center px-8 py-0 h-20">
        <div className="flex items-center gap-2">
          <Flag className="text-[#19a594]" size={28} />
          <span className="text-xl font-bold tracking-tight">Kenya eTA</span>
        </div>
        <div className="flex-1" />
        <ul className="flex gap-4 items-center font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={cn(
                  "relative group px-3 py-2 rounded transition-colors text-gray-700",
                  pathname === link.href ? "bg-[#e6f6f3] text-[#19a594]" : "hover:bg-gray-100"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {!user ? (
            <li>
              <Button size="sm" variant="outline" onClick={() => navigate("/auth")}>Sign In</Button>
            </li>
          ) : (
            <>
              <li>
                <span className="px-2 text-xs text-gray-600">{user.email}</span>
              </li>
              <li>
                <Button size="sm" variant="outline" onClick={() => { signOut(); navigate("/"); }}>
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
