import { Link, useRouterState } from "@tanstack/react-router";
import {
  Search,
  Briefcase,
  MessageSquare,
  Megaphone,
  Phone,
  LayoutGrid,
  SlidersHorizontal,
  Moon,
} from "lucide-react";
import type { ComponentType } from "react";

type NavItem = {
  to: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
};

const topNav: NavItem[] = [
  { to: "/search", icon: Search, label: "Search" },
  { to: "/jobs", icon: Briefcase, label: "Jobs" },
  { to: "/chat", icon: MessageSquare, label: "Chat" },
  { to: "/broadcast", icon: Megaphone, label: "Broadcast" },
  { to: "/calls", icon: Phone, label: "Calls" },
];

const bottomNav: NavItem[] = [
  { to: "/apps", icon: LayoutGrid, label: "Apps" },
  { to: "/settings", icon: SlidersHorizontal, label: "Settings" },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="flex w-14 shrink-0 flex-col items-center justify-between border-r border-border bg-card py-3">
      <div className="flex flex-col items-center gap-1">
        <Link to="/" className="mb-2 flex h-9 w-9 items-center justify-center rounded-md text-primary">
          <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
            <path
              d="M22 6c-3.3-2.7-8.3-2.5-11.4.6C7 10.2 6.7 16 10 19.4l1.5-1.5C9.2 15.3 9.5 11.3 12 8.8c2.5-2.5 6.5-2.7 9.2-.6L22 6z"
              fill="currentColor"
            />
            <path
              d="M14 22c2.6 2 6.2 1.8 8.5-.5 2.6-2.6 2.8-6.7.6-9.4l-1.5 1.5c1.6 2 1.4 4.9-.5 6.8-1.9 1.9-4.8 2.1-6.8.5L14 22z"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
        </Link>
        {topNav.map((item) => {
          const active = pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
        <div className="my-2 h-px w-6 bg-border" />
        {bottomNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          aria-label="Theme"
        >
          <Moon className="h-5 w-5" />
        </button>
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-900">
            AG
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
        </div>
      </div>
    </aside>
  );
}
