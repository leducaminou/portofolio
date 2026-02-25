"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Cpu,
  Menu,
  X,
  ArrowLeft,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  lang: string;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "" },
  { icon: FolderKanban, label: "Projects", href: "/projects" },
  { icon: Cpu, label: "Tech Stack", href: "/stack" },
];

export default function Sidebar({ lang }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push(`/${lang}/login`);
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const basePath = `/${lang}/admin`;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass rounded-lg"
      >
        {collapsed ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border flex flex-col 
            ${collapsed ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} 
            transition-transform lg:transition-none`}
        >
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-border">
            <span className="text-lg font-bold gradient-text">Admin Panel</span>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const fullPath = `${basePath}${item.href}`;
              const isActive = pathname === fullPath;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={fullPath}
                  onClick={() => setCollapsed(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-accent/15 text-accent-light border border-accent/20"
                      : "text-muted hover:text-foreground hover:bg-surface-light"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Back to site / Logout */}
          <div className="p-4 border-t border-border space-y-1">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-muted hover:text-foreground hover:bg-surface-light transition-all"
            >
              <ArrowLeft size={16} />
              Back to site
            </Link>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-error/80 hover:text-error hover:bg-error/5 transition-all disabled:opacity-50"
            >
              <LogOut size={16} />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Mobile overlay */}
      {collapsed && (
        <div
          onClick={() => setCollapsed(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
