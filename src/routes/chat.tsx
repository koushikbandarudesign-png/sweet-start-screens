import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Code2,
  Briefcase,
  Phone,
  MessageSquare,
  Send,
  PhoneCall,
  AlertTriangle,
  Play,
  RotateCcw,
  RotateCw,
  FileText,
  StickyNote,
  ChevronDown,
} from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat — Ceipal" },
      { name: "description", content: "Chat with candidates and internal teams." },
    ],
  }),
  component: ChatPage,
});

type Candidate = {
  initials: string;
  name: string;
  time: string;
  role: string;
  roleId: string;
  preview: string;
  previewIcon: "msg" | "phone";
  tone: "rose" | "emerald" | "amber" | "orange";
  active?: boolean;
};

const candidates: Candidate[] = [
  {
    initials: "KS",
    name: "Kumaid Singh",
    time: "10h ago",
    role: "Principal Architect",
    roleId: "530054",
    preview: "I believe you'll receive a confirmation e...",
    previewIcon: "msg",
    tone: "rose",
    active: true,
  },
  {
    initials: "MP",
    name: "Mousami Pal",
    time: "5h ago",
    role: "Principal Architect",
    roleId: "530746",
    preview: "+17203412686",
    previewIcon: "phone",
    tone: "emerald",
  },
  {
    initials: "NR",
    name: "Nirma Rizvic",
    time: "5h ago",
    role: "Software Engineer",
    roleId: "514018",
    preview: "+18329874298",
    previewIcon: "phone",
    tone: "amber",
  },
  {
    initials: "SM",
    name: "Srilatha Magam",
    time: "Recently",
    role: "Principal Architect",
    roleId: "530746",
    preview: "",
    previewIcon: "msg",
    tone: "rose",
  },
  {
    initials: "HP",
    name: "Harish Palakuri",
    time: "6d ago",
    role: "Senior Java Developer",
    roleId: "529748",
    preview: "Hi Harish, there's an urgent opening for...",
    previewIcon: "msg",
    tone: "emerald",
  },
  {
    initials: "WJ",
    name: "William Shank Jr",
    time: "1w ago",
    role: "Senior Engineer",
    roleId: "514719",
    preview: "+12024136717",
    previewIcon: "phone",
    tone: "orange",
  },
  {
    initials: "KS",
    name: "Kumaid Singh",
    time: "1w ago",
    role: "Senior Engineer",
    roleId: "514719",
    preview: "",
    previewIcon: "msg",
    tone: "rose",
  },
];

const toneClasses: Record<Candidate["tone"], string> = {
  rose: "bg-rose-100 text-rose-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  orange: "bg-orange-100 text-orange-700",
};

function ChatPage() {
  const [tab, setTab] = useState<"candidates" | "internals">("candidates");

  return (
    <div className="flex h-screen bg-background text-foreground">
      <AppSidebar />

      <div className="flex w-[360px] shrink-0 flex-col border-r border-border bg-card">
        <div className="px-5 pt-4">
          <h1 className="mb-3 text-xl font-semibold">Chat</h1>
          <div className="flex border-b border-border">
            <button
              onClick={() => setTab("candidates")}
              className={`flex-1 pb-2 text-sm font-medium transition-colors ${
                tab === "candidates"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Candidates
            </button>
            <button
              onClick={() => setTab("internals")}
              className={`flex-1 pb-2 text-sm font-medium transition-colors ${
                tab === "internals"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Internals
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-4 py-3">
          <button className="whitespace-nowrap rounded-md bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white">
            My Chats
          </button>
          <button className="inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
            <Sparkles className="h-3 w-3 text-blue-600" /> Qualified
          </button>
          <button className="inline-flex items-center gap-1 overflow-hidden whitespace-nowrap rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
            <Sparkles className="h-3 w-3 shrink-0 text-blue-600" /> Pote
          </button>
          <button className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted">
            <Search className="h-4 w-4" />
          </button>
          <button className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {candidates.map((c, i) => (
            <button
              key={i}
              className={`flex w-full items-start gap-3 border-l-2 px-5 py-3 text-left transition-colors ${
                c.active
                  ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/30"
                  : "border-transparent hover:bg-muted/50"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${toneClasses[c.tone]}`}
              >
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="truncate text-sm font-semibold">{c.name}</span>
                  <span className="ml-2 shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <Code2 className="h-3 w-3 text-blue-600" />
                  <span className="truncate">{c.role}</span>
                  <span className="rounded bg-muted px-1 font-mono text-[10px]">ID: {c.roleId}</span>
                </div>
                {c.preview && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    {c.previewIcon === "phone" ? (
                      <Phone className="h-3 w-3" />
                    ) : (
                      <MessageSquare className="h-3 w-3" />
                    )}
                    <span className="truncate">
                      {c.previewIcon === "phone" ? <>You • {c.preview}</> : c.preview}
                    </span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div className="flex flex-1 flex-col bg-muted/30">
        <header className="flex items-center gap-3 border-b border-border bg-card px-6 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700">
            KS
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold leading-tight">Kumaid Singh</h2>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              Sourced for <span className="font-medium text-foreground">Principal Architect</span>
              <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">ID: 530054</span>
            </p>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted">
            <PhoneCall className="h-5 w-5" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-md text-amber-500 hover:bg-muted">
            <AlertTriangle className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <div className="flex justify-center">
            <span className="rounded-full bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">26 May 2026</span>
          </div>

          {/* Call ended block */}
          <div>
            <div className="mb-1 flex items-center justify-end gap-2 pr-12 text-sm">
              <span className="font-medium">Nikhil</span>
              <span className="text-xs text-muted-foreground">9022</span>
            </div>
            <div className="flex items-start justify-end gap-2">
              <div className="w-full max-w-[720px] rounded-2xl rounded-tr-sm border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <PhoneCall className="h-4 w-4 text-muted-foreground" />
                    Call Ended
                  </div>
                  <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
                    Direct
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Outgoing · 13 sec · To: +18726788830
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button className="text-muted-foreground hover:text-foreground">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                  <button className="text-muted-foreground hover:text-foreground">
                    <RotateCw className="h-4 w-4" />
                  </button>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="relative h-1 flex-1 rounded-full bg-muted">
                      <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-blue-600" />
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">00:00/00:00</span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    1x <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-6 border-t border-border pt-3">
                  <button className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-blue-600">
                    <FileText className="h-4 w-4" /> Call Transcript
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-blue-600">
                    <StickyNote className="h-4 w-4" /> View Notes
                  </button>
                </div>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                NG
              </div>
            </div>
            <div className="mt-1 pr-12 text-right text-xs text-muted-foreground">06:52 PM</div>
          </div>

          <div className="flex justify-center">
            <span className="rounded-full bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">Today</span>
          </div>

          {/* Text reply */}
          <div>
            <div className="mb-1 pr-12 text-right text-sm font-medium">Nikhil</div>
            <div className="flex items-start justify-end gap-2">
              <div className="max-w-[720px] rounded-2xl rounded-tr-sm bg-blue-50/70 px-4 py-3 ring-1 ring-blue-100 dark:bg-blue-950/30 dark:ring-blue-900">
                <div className="mb-1">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm leading-relaxed">
                  I believe you'll receive a confirmation email from the U.S. Secret Service shortly after submitting
                  your application. You can expect an update on the next steps within 3 to 5 business days.
                  <br />
                  Reply YES to continue or NO if this role is not of interest.
                </p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                NG
              </div>
            </div>
            <div className="mt-1 flex items-center justify-end gap-2 pr-12 text-xs text-muted-foreground">
              <span>05:54 PM</span>
              <span className="inline-flex items-center gap-1 text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Skipped
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-card p-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <input
              placeholder="Tap here to expand"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
