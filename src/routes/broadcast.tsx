import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Briefcase,
  Megaphone,
  Mail,
  Hourglass,
  AlertCircle,
  Clock,
  SkipForward,
  Check,
  CheckCheck,
  CheckCircle2,
  CornerUpLeft,
  ExternalLink,
  Send,
  Search,
} from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/broadcast")({
  head: () => ({
    meta: [
      { title: "Broadcast — Ceipal" },
      { name: "description", content: "Broadcast messages to candidates across jobs." },
    ],
  }),
  component: BroadcastPage,
});

type BroadcastItem = { name: string; preview: string; time: string; active?: boolean };
type Job = {
  id: string;
  title: string;
  badge?: number;
  expanded?: boolean;
  broadcasts?: BroadcastItem[];
};

const jobs: Job[] = [
  { id: "530123", title: "Human Resources Managemen..." },
  { id: "513945", title: "Cloud Engineer" },
  { id: "531140", title: "AI Developer" },
  { id: "530726", title: "Senior Engineer" },
  { id: "530413", title: "Software Engineer" },
  { id: "530413", title: "AI Developer" },
  { id: "392283", title: "Verfahrensingenieur, BIW", expanded: false },
  {
    id: "514884",
    title: "Senior Engineer",
    badge: 3,
    expanded: true,
    broadcasts: [
      { name: "Automation", preview: "{{Candidate.Name}} Are you intere...", time: "1mon ago", active: true },
      { name: "Broadcast 3", preview: "Hi {{Candidate.Name}}! Are you int...", time: "1mon ago" },
      { name: "Broadcast 2", preview: "{{Candidate.Name}} Are you intere...", time: "1mon ago" },
    ],
  },
  { id: "526553", title: "UX/UI Designer" },
  { id: "483924", title: "UX/UI Designer" },
  { id: "525140", title: "Operations Engineer", expanded: false },
  { id: "502431", title: "Scrum Master", badge: 1 },
];

type Person = {
  initials: string;
  name: string;
  role: string;
  status: string;
};

const modalPeopleData: Record<string, Person[]> = {
  Failed: [
    { initials: "PK", name: "Poojitha Konanki", role: "Cloud Engineer", status: "Failed" },
    { initials: "AK", name: "Anjal Karki", role: "Software Engineer", status: "Failed" },
    { initials: "TM", name: "Tejas Maladwala", role: "Senior Lead Software Engineer", status: "Failed" },
  ],
  Skipped: [
    { initials: "PK", name: "Poojitha Konanki", role: "Cloud Engineer", status: "Skipped" },
    { initials: "AK", name: "Anjal Karki", role: "Software Engineer", status: "Skipped" },
    { initials: "TM", name: "Tejas Maladwala", role: "Senior Lead Software Engineer", status: "Skipped" },
  ],
  Pending: [
    { initials: "PK", name: "Poojitha Konanki", role: "Cloud Engineer", status: "Pending" },
  ],
  Scheduled: [
    { initials: "AK", name: "Anjal Karki", role: "Software Engineer", status: "Scheduled" },
  ],
  Sent: [
    { initials: "TM", name: "Tejas Maladwala", role: "Senior Lead Software Engineer", status: "Sent" },
  ],
  Delivered: [
    { initials: "PK", name: "Poojitha Konanki", role: "Cloud Engineer", status: "Delivered" },
    { initials: "AK", name: "Anjal Karki", role: "Software Engineer", status: "Delivered" },
  ],
  Read: [
    { initials: "TM", name: "Tejas Maladwala", role: "Senior Lead Software Engineer", status: "Read" },
  ],
  Replied: [
    { initials: "PK", name: "Poojitha Konanki", role: "Cloud Engineer", status: "Replied" },
  ],
};

function StatChip({
  icon: Icon,
  value,
  label,
  tone = "muted",
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  tone?: "muted" | "amber" | "rose" | "blue" | "emerald" | "sky";
  onClick?: () => void;
}) {
  const tones: Record<string, string> = {
    muted: "text-muted-foreground",
    amber: "text-amber-600",
    rose: "text-rose-500",
    blue: "text-blue-600",
    emerald: "text-emerald-600",
    sky: "text-sky-600",
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 text-xs ${tones[tone]} ${onClick ? "cursor-pointer hover:opacity-80" : ""}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {value} {label}
    </button>
  );
}

function BroadcastPage() {
  const [openJobs, setOpenJobs] = useState<Record<number, boolean>>(
    Object.fromEntries(jobs.map((j, i) => [i, j.expanded ?? true])),
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState<{ label: string; tone: string; body: React.ReactNode } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatClick = (stat: Stat, messageBody: React.ReactNode) => {
    if (stat.value === 0) return;
    setModalStat({ label: stat.label, tone: stat.tone, body: messageBody });
    setSearchQuery("");
    setModalOpen(true);
  };

  const people = modalStat ? (modalPeopleData[modalStat.label] ?? []) : [];
  const filteredPeople = people.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-background text-foreground">
      <AppSidebar />

      {/* Job list panel */}
      <div className="flex w-[340px] shrink-0 flex-col border-r border-border bg-card">
        <div className="flex items-center gap-2 px-5 py-4">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-xl font-semibold">Broadcast</h1>
        </div>
        <div className="flex-1 overflow-y-auto pb-4">
          {jobs.map((job, i) => {
            const open = openJobs[i];
            return (
              <div key={i} className="px-2">
                <button
                  onClick={() => setOpenJobs((s) => ({ ...s, [i]: !s[i] }))}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted/60"
                >
                  {open ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <Briefcase className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 truncate text-sm font-medium">{job.title}</span>
                  <span className="text-xs text-muted-foreground">#{job.id}</span>
                  {job.badge ? (
                    <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-100 px-1.5 text-xs font-semibold text-blue-700">
                      {job.badge}
                    </span>
                  ) : null}
                </button>
                {open && job.broadcasts && (
                  <div className="relative ml-5 mt-1 border-l border-border pl-2">
                    {job.broadcasts.map((b, bi) => (
                      <button
                        key={bi}
                        className={`mb-1 flex w-full items-start gap-2 rounded-md p-2 text-left transition-colors ${
                          b.active
                            ? "bg-blue-50 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:ring-blue-900"
                            : "hover:bg-muted/60"
                        }`}
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                          <Megaphone className="h-3.5 w-3.5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between">
                            <span className={`truncate text-sm font-medium ${b.active ? "text-blue-700 dark:text-blue-300" : ""}`}>
                              {b.name}
                            </span>
                            <span className="ml-2 shrink-0 text-[11px] text-muted-foreground">{b.time}</span>
                          </span>
                          <span className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {b.preview}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversation panel */}
      <div className="flex flex-1 flex-col bg-muted/30">
        <header className="flex items-center gap-3 border-b border-border bg-card px-6 py-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Megaphone className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold leading-tight">Automation</h2>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              Sourced for <span className="font-medium text-foreground">Senior Engineer</span>
              <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">ID: 514884</span>
              <ExternalLink className="h-3 w-3 cursor-pointer hover:text-foreground" />
            </p>
          </div>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <div className="flex justify-center">
            <span className="rounded-full bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">03 Apr 2026</span>
          </div>

          <MessageBlock
            author="Ashlesh"
            title={null}
            body={
              <>
                Hi {`{{Candidate.Name}}`}! Are you interested in exploring {`{{Job.Title}}`} opportunity at {`{{Organization.Name}}`}?
                <br />
                Reply YES to continue or NO if this role is not of interest.
              </>
            }
            stats={[
              { icon: Hourglass, value: 0, label: "Pending", tone: "muted" as const },
              { icon: AlertCircle, value: 0, label: "Failed", tone: "rose" as const },
              { icon: Clock, value: 0, label: "Scheduled", tone: "amber" as const },
              { icon: SkipForward, value: 4, label: "Skipped", tone: "amber" as const },
              { icon: Check, value: 67, label: "Sent", tone: "muted" as const },
              { icon: CheckCheck, value: 67, label: "Delivered", tone: "sky" as const },
              { icon: CheckCircle2, value: 0, label: "Read", tone: "emerald" as const },
              { icon: CornerUpLeft, value: 1, label: "Replied", tone: "blue" as const },
            ]}
            onStatClick={handleStatClick}
          />

          <MessageBlock
            author="Ashlesh"
            authorMeta="ashlesh.gaddam@leoforce.com"
            title={"{{Job.Title}}"}
            body={
              <>
                {`{{Candidate.Name}}`} Are you interested for applying to a job that is a best fit for you? You can use
                the Below given link to apply for this job{" "}
                <span className="text-blue-600 underline">click here</span>
                <button className="mt-2 flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline">
                  See more <ChevronDown className="h-3 w-3" />
                </button>
              </>
            }
            stats={[
              { icon: Hourglass, value: 0, label: "Pending", tone: "muted" as const },
              { icon: AlertCircle, value: 0, label: "Failed", tone: "rose" as const },
              { icon: Clock, value: 0, label: "Scheduled", tone: "amber" as const },
              { icon: SkipForward, value: 0, label: "Skipped", tone: "amber" as const },
              { icon: Check, value: 0, label: "Sent", tone: "muted" as const },
              { icon: CheckCheck, value: 77, label: "Delivered", tone: "sky" as const },
              { icon: CheckCircle2, value: 0, label: "Read", tone: "emerald" as const },
              { icon: CornerUpLeft, value: 0, label: "Replied", tone: "blue" as const },
            ]}
            onStatClick={handleStatClick}
          />
        </div>

        <div className="border-t border-border bg-card p-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm">
            <Mail className="h-5 w-5 text-muted-foreground" />
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

      {/* Stat Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden">
          <div className="p-6 pb-0">
            <DialogHeader className="mb-4">
              <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                <span className="h-5 w-1 rounded-full bg-blue-500" />
                {modalStat?.label}
              </DialogTitle>
            </DialogHeader>

            {/* Message Preview */}
            <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
              <div className="mb-2 text-right text-sm font-medium">Ashlesh</div>
              <div className="rounded-2xl rounded-tr-sm bg-blue-50/70 px-4 py-3 text-sm leading-relaxed ring-1 ring-blue-100 dark:bg-blue-950/30 dark:ring-blue-900">
                <div className="mb-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                {modalStat?.body}
              </div>
            </div>

            {/* People Section */}
            <div className="mb-3 flex items-center gap-2 text-base font-semibold">
              <span className="h-5 w-1 rounded-full bg-blue-500" />
              People
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* People List */}
          <div className="max-h-[320px] overflow-y-auto px-6 pb-6">
            <div className="space-y-2">
              {filteredPeople.map((person, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                    {person.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{person.name}</div>
                    <div className="text-xs text-muted-foreground">{person.role}</div>
                  </div>
                  <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                    {person.status}
                  </span>
                </div>
              ))}
              {filteredPeople.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">No results found</div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type Stat = {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  tone: "muted" | "amber" | "rose" | "blue" | "emerald" | "sky";
};

function MessageBlock({
  author,
  authorMeta,
  title,
  body,
  stats,
  onStatClick,
}: {
  author: string;
  authorMeta?: string;
  title: React.ReactNode;
  body: React.ReactNode;
  stats: Stat[];
  onStatClick?: (stat: Stat, body: React.ReactNode) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-end gap-2 pr-12 text-sm">
        <span className="font-medium">{author}</span>
        {authorMeta && <span className="text-xs text-muted-foreground">{authorMeta}</span>}
      </div>
      <div className="flex items-start justify-end gap-2">
        <div className="max-w-[720px] rounded-2xl rounded-tr-sm bg-blue-50/70 px-4 py-3 ring-1 ring-blue-100 dark:bg-blue-950/30 dark:ring-blue-900">
          {title && (
            <div className="mb-1 flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {title}
            </div>
          )}
          {!title && (
            <div className="mb-1">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div className="text-sm leading-relaxed">{body}</div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
          AG
        </div>
      </div>
      <div className="mt-2 flex flex-wrap justify-end gap-x-4 gap-y-1 pr-12">
        {stats.map((s, i) => (
          <StatChip
            key={i}
            icon={s.icon}
            value={s.value}
            label={s.label}
            tone={s.tone}
            onClick={onStatClick && s.value > 0 ? () => onStatClick(s, body) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
