"use client";

import * as React from "react";
import { useState } from "react";
import { format } from "date-fns";

// shadcn/ui components (assume installed)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
export type Milestone = {
  id: string;
  title: string;
  description?: string;
  status: "PLANNED" | "IN_PROGRESS" | "DONE";
  dueDate?: string | null; // ISO date string
};

// Dummy initial data
const initialData: Milestone[] = [
  {
    id: "m1",
    title: "Setup Repository & CI",
    description: "Init monorepo, add CI for lint + test",
    status: "DONE",
    dueDate: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "m2",
    title: "Design Database Schema",
    description: "Projects, Milestones, Tasks, Kanban Columns",
    status: "IN_PROGRESS",
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
  },
  {
    id: "m3",
    title: "MVP Release v0.1",
    description: "Public demo for stakeholders",
    status: "PLANNED",
    dueDate: new Date(Date.now() + 86400000 * 21).toISOString(),
  },
];

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function statusLabel(s: Milestone["status"]) {
  switch (s) {
    case "PLANNED":
      return "Planned";
    case "IN_PROGRESS":
      return "In Progress";
    case "DONE":
      return "Done";
  }
}

function StatusPill({ s }: { s: Milestone["status"] }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const map: Record<Milestone["status"], string> = {
    PLANNED: `${base} bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200`,
    IN_PROGRESS: `${base} bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200`,
    DONE: `${base} bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200`,
  };
  return <span className={map[s]}>{statusLabel(s)}</span>;
}

// Form for create/edit
function MilestoneForm({
  initial,
  onSubmit,
  submitting,
}: {
  initial?: Partial<Milestone>;
  submitting?: boolean;
  onSubmit: (values: Omit<Milestone, "id">) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [status, setStatus] = useState<Milestone["status"]>(
    (initial?.status as Milestone["status"]) ?? "PLANNED"
  );
  const [dueDate, setDueDate] = useState<string>(
    initial?.dueDate ? format(new Date(initial.dueDate), "yyyy-MM-dd") : ""
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description?.trim() || "",
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Judul</Label>
        <Input
          placeholder="Contoh: Rilis v1.0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Deskripsi</Label>
        <Textarea
          placeholder="Detail milestone…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={status} onValueChange={(v) => setStatus(v as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PLANNED">Planned</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Due Date</Label>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={submitting}>
          Simpan
        </Button>
      </div>
    </form>
  );
}

export default function DemoMilestonesUI() {
  const [items, setItems] = useState<Milestone[]>(initialData);

  // Create
  const [openCreate, setOpenCreate] = useState(false);

  // Edit
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const editingItem = items.find((m) => m.id === editingId) || null;
  const deletingItem = items.find((m) => m.id === deletingId) || null;

  function addMilestone(values: Omit<Milestone, "id">) {
    const next: Milestone = { id: uid(), ...values };
    setItems((prev) => [next, ...prev]);
    setOpenCreate(false);
  }

  function updateMilestone(values: Omit<Milestone, "id">) {
    if (!editingItem) return;
    setItems((prev) =>
      prev.map((m) => (m.id === editingItem.id ? { ...m, ...values } : m))
    );
    setEditingId(null);
  }

  function deleteMilestone() {
    if (!deletingItem) return;
    setItems((prev) => prev.filter((m) => m.id !== deletingItem.id));
    setDeletingId(null);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Milestones</h2>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button>Tambah Milestone</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Tambah Milestone</DialogTitle>
            </DialogHeader>
            <MilestoneForm onSubmit={addMilestone} />
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            Belum ada milestone.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <Card key={m.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{m.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                {m.description ? (
                  <p className="text-sm text-muted-foreground">
                    {m.description}
                  </p>
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    (Tanpa deskripsi)
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Status:</span>
                  <StatusPill s={m.status} />
                </div>
                <div className="text-sm">
                  <span className="font-medium">Due:</span>{" "}
                  <span>
                    {m.dueDate
                      ? format(new Date(m.dueDate), "yyyy-MM-dd")
                      : "-"}
                  </span>
                </div>
              </CardContent>

              <div className="flex gap-2 p-4 pt-0">
                {/* Edit */}
                <Dialog
                  open={editingId === m.id}
                  onOpenChange={(open) => !open && setEditingId(null)}
                >
                  <Button
                    variant="secondary"
                    onClick={() => setEditingId(m.id)}
                  >
                    Edit
                  </Button>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Edit Milestone</DialogTitle>
                    </DialogHeader>
                    <MilestoneForm initial={m} onSubmit={updateMilestone} />
                  </DialogContent>
                </Dialog>

                {/* Delete */}
                <AlertDialog
                  open={deletingId === m.id}
                  onOpenChange={(open) => !open && setDeletingId(null)}
                >
                  <Button
                    variant="destructive"
                    onClick={() => setDeletingId(m.id)}
                  >
                    Hapus
                  </Button>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus “{m.title}”?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <p className="text-sm text-muted-foreground">
                      Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteMilestone}>
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

