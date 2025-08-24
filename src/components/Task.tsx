"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  MoreVertical,
  CalendarDays,
  CircleAlert,
  Clock,
  Pencil,
  Trash2,
  CheckCircle2,
  ListChecks,
} from "lucide-react";

// ===== Types =====
export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Status = "todo" | "in_progress" | "done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: string; // ISO string
  assignee?: { name: string };
};

// ===== Dummy Data =====
const initialTasks: Task[] = [
  {
    id: "t-1",
    title: "Setup project repository",
    description: "Initialize repo, add README, and basic CI.",
    status: "done",
    priority: "Medium",
    dueDate: daysFromNow(-3),
    assignee: { name: "Ady" },
  },
  {
    id: "t-2",
    title: "Create task/todos component UI",
    description: "Build UI only with dummy data.",
    status: "in_progress",
    priority: "High",
    dueDate: daysFromNow(1),
    assignee: { name: "Rina" },
  },
  {
    id: "t-3",
    title: "Write milestone dummy",
    status: "todo",
    priority: "Low",
    dueDate: daysFromNow(4),
    assignee: { name: "Dika" },
  },
  {
    id: "t-4",
    title: "Hook tasks to local state",
    description: "No backend, state only.",
    status: "todo",
    priority: "Medium",
    dueDate: daysFromNow(0),
    assignee: { name: "Ady" },
  },
  {
    id: "t-5",
    title: "Polish empty states & badges",
    status: "in_progress",
    priority: "Urgent",
    dueDate: daysFromNow(-1),
    assignee: { name: "Nadia" },
  },
];

function daysFromNow(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString();
}

// ===== Helpers =====
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function shortDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function dueBadge(task: Task) {
  if (!task.dueDate) return { text: "No due", intent: "secondary" as const };
  const today = new Date();
  const due = new Date(task.dueDate);
  const diff = Math.ceil(
    (stripTime(due).getTime() - stripTime(today).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (task.status !== "done") {
    if (diff < 0) return { text: "Overdue", intent: "destructive" as const };
    if (diff === 0) return { text: "Due today", intent: "warning" as const };
    if (diff === 1) return { text: "Due tomorrow", intent: "default" as const };
    return { text: `Due in ${diff}d`, intent: "default" as const };
  }
  return { text: "Completed", intent: "secondary" as const };
}

function stripTime(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function initials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

const STATUS_META: Record<Status, { label: string; color: string }> = {
  todo: { label: "To Do", color: "bg-muted" },
  in_progress: { label: "In Progress", color: "bg-muted" },
  done: { label: "Done", color: "bg-muted" },
};

const PRIORITY_INTENT: Record<Priority, string> = {
  Low: "",
  Medium: "",
  High: "",
  Urgent: "",
};

// ===== Component =====
export default function TaskTodos() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [prioFilter, setPrioFilter] = useState<"all" | Priority>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const assignees = useMemo(
    () =>
      Array.from(
        new Set(tasks.map((t) => t.assignee?.name).filter(Boolean))
      ) as string[],
    [tasks]
  );

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        (t.description?.toLowerCase().includes(q) ?? false) ||
        (t.assignee?.name?.toLowerCase().includes(q) ?? false);

      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      const matchesPrio = prioFilter === "all" || t.priority === prioFilter;
      const matchesAssignee =
        assigneeFilter === "all" || t.assignee?.name === assigneeFilter;

      return matchesQuery && matchesStatus && matchesPrio && matchesAssignee;
    });
  }, [tasks, query, statusFilter, prioFilter, assigneeFilter]);

  const grouped = useMemo(() => {
    const by: Record<Status, Task[]> = { todo: [], in_progress: [], done: [] };
    for (const t of filtered) by[t.status].push(t);
    return by;
  }, [filtered]);

  const completionPct = useMemo(() => {
    if (!tasks.length) return 0;
    const done = tasks.filter((t) => t.status === "done").length;
    return Math.round((done / tasks.length) * 100);
  }, [tasks]);

  function toggleDone(task: Task) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, status: t.status === "done" ? "todo" : "done" }
          : t
      )
    );
  }

  function updateStatus(task: Task, status: Status) {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status } : t))
    );
  }

  function removeTask(task: Task) {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  }

  function upsertTask(next: Task) {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === next.id);
      if (exists) return prev.map((t) => (t.id === next.id ? next : t));
      return [next, ...prev];
    });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <ListChecks className="h-5 w-5" />
          <div>
            <h1 className="text-xl font-semibold leading-tight">
              Tasks / Todos
            </h1>
            <p className="text-sm text-muted-foreground">
              UI only • dummy data • local state
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Overall completion: {completionPct}%
          </span>
          <div className="w-40">
            <Progress value={completionPct} />
          </div>
          <AddOrEditTaskDialog onSubmit={upsertTask} />
        </div>
      </div>

      {/* Filters */}
      <Card className="p-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3">
          <div className="flex-1">
            <Input
              placeholder="Cari tugas, deskripsi, atau assignee…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Separator className="md:hidden" />
          <div className="flex gap-2">
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={prioFilter}
              onValueChange={(v) => setPrioFilter(v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priority</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All assignees</SelectItem>
                {assignees.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/** Column: To Do */}
        <StatusColumn
          title={STATUS_META.todo.label}
          count={grouped.todo.length}
          emptyHint="Tidak ada tugas. Klik New Task untuk menambahkan."
        >
          {grouped.todo.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              onToggleDone={() => toggleDone(t)}
              onChangeStatus={(s) => updateStatus(t, s)}
              onDelete={() => removeTask(t)}
              onEdit={(next) => upsertTask(next)}
            />
          ))}
        </StatusColumn>

        {/** Column: In Progress */}
        <StatusColumn
          title={STATUS_META.in_progress.label}
          count={grouped.in_progress.length}
          emptyHint="Belum ada yang dikerjakan."
        >
          {grouped.in_progress.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              onToggleDone={() => toggleDone(t)}
              onChangeStatus={(s) => updateStatus(t, s)}
              onDelete={() => removeTask(t)}
              onEdit={(next) => upsertTask(next)}
            />
          ))}
        </StatusColumn>

        {/** Column: Done */}
        <StatusColumn
          title={STATUS_META.done.label}
          count={grouped.done.length}
          emptyHint="Selesaikan tugas untuk muncul di sini."
        >
          {grouped.done.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              onToggleDone={() => toggleDone(t)}
              onChangeStatus={(s) => updateStatus(t, s)}
              onDelete={() => removeTask(t)}
              onEdit={(next) => upsertTask(next)}
            />
          ))}
        </StatusColumn>
      </div>
    </div>
  );
}

// ===== Subcomponents =====
function StatusColumn(
  props: React.PropsWithChildren<{
    title: string;
    count: number;
    emptyHint?: string;
  }>
) {
  const { title, count, emptyHint, children } = props;
  const isEmpty = React.Children.count(children) === 0;
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b py-3">
        <CardTitle className="text-base font-semibold">
          {title} <span className="text-muted-foreground">({count})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {isEmpty ? (
          <div className="flex min-h-[88px] items-center justify-center text-sm text-muted-foreground">
            {emptyHint ?? "No items"}
          </div>
        ) : (
          <div className="space-y-2">{children}</div>
        )}
      </CardContent>
    </Card>
  );
}

function TaskRow({
  task,
  onToggleDone,
  onChangeStatus,
  onDelete,
  onEdit,
}: {
  task: Task;
  onToggleDone: () => void;
  onChangeStatus: (s: Status) => void;
  onDelete: () => void;
  onEdit: (next: Task) => void;
}) {
  const d = dueBadge(task);
  return (
    <div className="group rounded-2xl border p-3 transition hover:shadow-sm">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.status === "done"}
          onCheckedChange={onToggleDone}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div
                className={cn(
                  "truncate text-sm font-medium",
                  task.status === "done" && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </div>
              {task.description ? (
                <div className="truncate text-xs text-muted-foreground">
                  {task.description}
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={d.intent as any} className="whitespace-nowrap">
                {d.intent === "destructive" ? (
                  <CircleAlert className="mr-1 h-3 w-3" />
                ) : d.intent === "warning" ? (
                  <Clock className="mr-1 h-3 w-3" />
                ) : (
                  <CalendarDays className="mr-1 h-3 w-3" />
                )}
                {d.text}
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap">
                {task.priority}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => onChangeStatus("todo")}>
                    Move to To Do
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onChangeStatus("in_progress")}
                  >
                    Move to In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onChangeStatus("done")}>
                    Move to Done
                  </DropdownMenuItem>
                  <Separator className="my-1" />
                  <DropdownMenuItem onClick={() => onEditOpen(task, onEdit)}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={onDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px]">
                  {initials(task.assignee?.name)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">
                {task.assignee?.name ?? "Unassigned"}
              </span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{shortDate(task.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Imperative edit open helper (simple pattern to reuse the same dialog)
function onEditOpen(task: Task, onEdit: (next: Task) => void) {
  const event = new CustomEvent("open-task-dialog", {
    detail: { task, onEdit },
  });
  window.dispatchEvent(event);
}

function AddOrEditTaskDialog({ onSubmit }: { onSubmit: (task: Task) => void }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  // Listen to open events from TaskRow
  React.useEffect(() => {
    function handler(e: Event) {
      const ce = e as CustomEvent;
      setEditing(ce.detail.task as Task);
      setOpen(true);
    }
    window.addEventListener("open-task-dialog", handler as any);
    return () => window.removeEventListener("open-task-dialog", handler as any);
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-1">
        <Plus className="h-4 w-4" /> New Task
      </Button>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setEditing(null);
        }}
      >
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editing ? (
                <>
                  <Pencil className="h-4 w-4" /> Edit Task
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" /> New Task
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <TaskForm
            key={editing?.id ?? "new"}
            initial={
              editing ?? {
                id: cryptoRandomId(),
                title: "",
                description: "",
                status: "todo",
                priority: "Medium",
                dueDate: new Date().toISOString(),
                assignee: { name: "" },
              }
            }
            onCancel={() => {
              setOpen(false);
              setEditing(null);
            }}
            onSave={(t) => {
              onSubmit(t);
              setOpen(false);
              setEditing(null);
            }}
          />

          <DialogFooter className="hidden" />
        </DialogContent>
      </Dialog>
    </>
  );
}

function TaskForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Task>(initial);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Design login page"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            value={form.description ?? ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Optional details…"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => setForm({ ...form, status: v as Status })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Priority</Label>
            <Select
              value={form.priority}
              onValueChange={(v) =>
                setForm({ ...form, priority: v as Priority })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="due">Due date</Label>
            <Input
              id="due"
              type="date"
              value={
                form.dueDate
                  ? new Date(form.dueDate).toISOString().slice(0, 10)
                  : ""
              }
              onChange={(e) => {
                const v = e.target.value
                  ? new Date(e.target.value + "T00:00:00").toISOString()
                  : undefined;
                setForm({ ...form, dueDate: v });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              placeholder="Nama orang"
              value={form.assignee?.name ?? ""}
              onChange={(e) =>
                setForm({ ...form, assignee: { name: e.target.value } })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="gap-1">
          <CheckCircle2 className="h-4 w-4" /> Save Task
        </Button>
      </div>
    </form>
  );
}

function cryptoRandomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return (crypto as any).randomUUID();
  return Math.random().toString(36).slice(2);
}
