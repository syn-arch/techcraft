"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { Calendar as CalendarIcon, Plus, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// ---- Types
export type DateRange = {
  from?: Date;
  to?: Date;
};

type Milestone = {
  id: string;
  title: string;
  description?: string;
  range: DateRange;
  status: "Planned" | "In Progress" | "Done";
  progress: number; // 0..100
};

// ---- Utilities
function fmtRange(range: DateRange) {
  if (!range?.from && !range?.to) return "–";
  const f = range.from
    ? format(range.from, "dd MMM yyyy", { locale: localeID })
    : "?";
  const t = range.to
    ? format(range.to, "dd MMM yyyy", { locale: localeID })
    : f;
  return `${f} – ${t}`;
}

function statusColor(status: Milestone["status"]) {
  switch (status) {
    case "Planned":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200";
    case "In Progress":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200";
    case "Done":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200";
    default:
      return "";
  }
}

// ---- DateRange picker (inline component)
function DateRangePicker({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (r: DateRange) => void;
}) {
  const label = value?.from ? fmtRange(value) : "Pilih rentang tanggal";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start w-full md:w-[280px]">
          <CalendarIcon className="mr-2 h-4 w-4" /> {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Calendar
          mode="range"
          selected={{ from: value?.from, to: value?.to }}
          onSelect={(r) => onChange(r ?? { from: undefined, to: undefined })}
          numberOfMonths={2}
          locale={localeID}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// ---- Dialog Form for Add/Edit
function MilestoneForm({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Partial<Milestone>;
  onSubmit: (data: Omit<Milestone, "id">) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [range, setRange] = useState<DateRange>(
    initial?.range ?? { from: new Date(), to: new Date() }
  );
  const [status, setStatus] = useState<Milestone["status"]>(
    initial?.status ?? "Planned"
  );
  const [progress, setProgress] = useState<number>(initial?.progress ?? 0);

  React.useEffect(() => {
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setRange(initial?.range ?? { from: new Date(), to: new Date() });
    setStatus(initial?.status ?? "Planned");
    setProgress(initial?.progress ?? 0);
  }, [initial, open]);

  function handleSave() {
    if (!title.trim()) return; // minimal validation
    onSubmit({ title: title.trim(), description, range, status, progress });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>
            {initial?.title ? "Edit Milestone" : "Tambah Milestone"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Rilis v1.0"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="desc">Deskripsi (opsional)</Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail singkat milestone"
            />
          </div>

          <div className="grid gap-2">
            <Label>Rentang Tanggal</Label>
            <DateRangePicker value={range} onChange={setRange} />
            <p className="text-xs text-muted-foreground">
              Gunakan kalender untuk memilih <b>start date</b> dan{" "}
              <b>end date</b>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as Milestone["status"])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="progress">Progress (%)</Label>
              <Input
                id="progress"
                type="number"
                min={0}
                max={100}
                value={progress}
                onChange={(e) =>
                  setProgress(
                    Math.max(0, Math.min(100, Number(e.target.value) || 0))
                  )
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSave}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---- Main Component
export default function MilestonesUI() {
  const [items, setItems] = useState<Milestone[]>(() => [
    {
      id: crypto.randomUUID(),
      title: "Setup Project",
      description: "Inisialisasi repo, CI/CD, dan konfigurasi linting.",
      range: { from: new Date(2025, 7, 1), to: new Date(2025, 7, 3) },
      status: "Done",
      progress: 100,
    },
    {
      id: crypto.randomUUID(),
      title: "Desain UI/UX",
      description: "Wireframe & komponen dasar.",
      range: { from: new Date(2025, 7, 4), to: new Date(2025, 7, 10) },
      status: "In Progress",
      progress: 45,
    },
    {
      id: crypto.randomUUID(),
      title: "Implementasi Fitur Milestone",
      description: "CRUD dummy & date range.",
      range: { from: new Date(2025, 7, 11), to: new Date(2025, 7, 15) },
      status: "Planned",
      progress: 0,
    },
  ]);

  const [filterRange, setFilterRange] = useState<DateRange>({});

  const [isFormOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Milestone | null>(null);

  const filtered = useMemo(() => {
    if (!filterRange?.from && !filterRange?.to) return items;
    return items.filter((m) => {
      const s = m.range.from?.getTime() ?? 0;
      const e = m.range.to?.getTime() ?? s;
      const f = filterRange.from?.getTime() ?? -Infinity;
      const t = filterRange.to?.getTime() ?? Infinity;
      // overlap check
      return s <= t && e >= f;
    });
  }, [items, filterRange]);

  function openAdd() {
    setEditTarget(null);
    setFormOpen(true);
  }

  function openEdit(m: Milestone) {
    setEditTarget(m);
    setFormOpen(true);
  }

  function upsertMilestone(data: Omit<Milestone, "id">) {
    if (editTarget) {
      // update
      setItems((prev) =>
        prev.map((i) =>
          i.id === editTarget.id ? { ...editTarget, ...data } : i
        )
      );
    } else {
      // create
      const newItem: Milestone = { id: crypto.randomUUID(), ...data };
      setItems((prev) => [newItem, ...prev]);
    }
  }

  function removeMilestone(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Milestones</h1>
          <p className="text-sm text-muted-foreground">
            UI dummy (tanpa database) dengan rentang tanggal & aksi CRUD.
          </p>
        </div>
        <div className="flex gap-2">
          <DateRangePicker value={filterRange} onChange={setFilterRange} />
          <Button onClick={openAdd} className="gap-2">
            <Plus className="h-4 w-4" /> Tambah
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <Card key={m.id} className="flex flex-col">
            <CardHeader className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base md:text-lg leading-tight">
                  {m.title}
                </CardTitle>
                <Badge className={statusColor(m.status)} variant="secondary">
                  {m.status}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>{fmtRange(m.range)}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
              {m.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {m.description}
                </p>
              )}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{m.progress}%</span>
                </div>
                <Progress value={m.progress} />
              </div>

              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => openEdit(m)}
                >
                  <Edit className="h-4 w-4" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-1"
                  onClick={() => removeMilestone(m.id)}
                >
                  <Trash2 className="h-4 w-4" /> Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <MilestoneForm
        open={isFormOpen}
        onOpenChange={setFormOpen}
        initial={editTarget ?? undefined}
        onSubmit={upsertMilestone}
      />
    </div>
  );
}
