"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";

// shadcn/ui
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

// ------------ Types ------------
export type Task = {
  id: string;
  title: string;
  description?: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[]; // order of tasks
};

// ------------ Dummy Data ------------
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const initialTasks: Record<string, Task> = {
  t1: { id: "t1", title: "Setup repo", description: "init monorepo + CI" },
  t2: { id: "t2", title: "Auth page", description: "Login & Register UI" },
  t3: { id: "t3", title: "Milestone CRUD", description: "UI only, dummy" },
  t4: { id: "t4", title: "Kanban board", description: "DnD with dnd-kit" },
  t5: { id: "t5", title: "Integrasi API", description: "Next API routes" },
};

const initialColumns: Column[] = [
  { id: "c-backlog", title: "Backlog", taskIds: ["t1", "t2"] },
  { id: "c-inprogress", title: "In Progress", taskIds: ["t3"] },
  { id: "c-review", title: "Review", taskIds: ["t4"] },
  { id: "c-done", title: "Done", taskIds: ["t5"] },
];

// ------------ Sortable Card ------------
function SortableCard({ task, columnId }: { task: Task; columnId: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "task", columnId } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-xl border bg-card text-card-foreground shadow-sm ${
        isDragging ? "ring-2 ring-primary" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-2 p-3">
        <GripVertical className="h-4 w-4 shrink-0 opacity-40 group-hover:opacity-100" />
        <div className="min-w-0">
          <div className="font-medium truncate">{task.title}</div>
          {task.description ? (
            <div className="text-xs text-muted-foreground line-clamp-2">
              {task.description}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ------------ Board Component ------------
export default function KanbanBoardDemo() {
  const [tasks, setTasks] = useState<Record<string, Task>>(initialTasks);
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // UI State for dialogs
  const [openCreate, setOpenCreate] = useState<null | string>(null); // columnId
  const [editTask, setEditTask] = useState<null | Task>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const dragTask = useState<Task | null>(null)[0]; // for future overlay details if needed

  const allTaskIds = useMemo(
    () => columns.flatMap((c) => c.taskIds),
    [columns]
  );

  function findColumnIdByTaskId(taskId: string) {
    return columns.find((c) => c.taskIds.includes(taskId))?.id;
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const activeTaskId = String(active.id);
    const overId = String(over.id);

    const fromColId = findColumnIdByTaskId(activeTaskId);
    const toColId = columns.some((c) => c.id === overId)
      ? overId // dropped on column body
      : findColumnIdByTaskId(overId); // dropped on another card

    if (!fromColId || !toColId) return;

    const fromCol = columns.find((c) => c.id === fromColId)!;
    const toCol = columns.find((c) => c.id === toColId)!;

    // indices
    const fromIndex = fromCol.taskIds.indexOf(activeTaskId);

    let toIndex = 0;
    if (toColId === overId) {
      // dropped on empty area of column: append to end
      toIndex = toCol.taskIds.length;
    } else {
      toIndex = toCol.taskIds.indexOf(overId);
      if (toIndex === -1) toIndex = toCol.taskIds.length;
    }

    setColumns((prev) => {
      const next = prev.map((c) => ({ ...c }));
      const from = next.find((c) => c.id === fromColId)!;
      const to = next.find((c) => c.id === toColId)!;

      // remove from old
      from.taskIds.splice(fromIndex, 1);

      // insert to new at toIndex
      to.taskIds.splice(toIndex, 0, activeTaskId);
      return next;
    });
  }

  function createTask(columnId: string, values: Omit<Task, "id">) {
    const id = uid();
    setTasks((t) => ({ ...t, [id]: { id, ...values } }));
    setColumns((cols) =>
      cols.map((c) =>
        c.id === columnId ? { ...c, taskIds: [id, ...c.taskIds] } : c
      )
    );
    setOpenCreate(null);
  }

  function updateTask(values: Task) {
    setTasks((t) => ({ ...t, [values.id]: values }));
    setEditTask(null);
  }

  function deleteTask(id: string) {
    setColumns((cols) =>
      cols.map((c) => ({ ...c, taskIds: c.taskIds.filter((x) => x !== id) }))
    );
    setTasks((t) => {
      const { [id]: _, ...rest } = t;
      return rest;
    });
    setDeleteTaskId(null);
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Kanban Board</h2>
      </div>

      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <Card key={col.id} className="bg-muted/30">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">{col.title}</CardTitle>
                <Dialog
                  open={openCreate === col.id}
                  onOpenChange={(o) => !o && setOpenCreate(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setOpenCreate(col.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Tambah Task ({col.title})</DialogTitle>
                    </DialogHeader>
                    <TaskForm onSubmit={(v) => createTask(col.id, v)} />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <SortableContext
                  items={col.taskIds}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col gap-3">
                    {col.taskIds.map((id) => {
                      const t = tasks[id];
                      if (!t) return null;
                      return (
                        <div key={id} className="group relative">
                          <SortableCard task={t} columnId={col.id} />
                          <div className="absolute right-2 top-2 hidden gap-1 group-hover:flex">
                            <Dialog
                              open={!!editTask && editTask.id === id}
                              onOpenChange={(o) => !o && setEditTask(null)}
                            >
                              <Button
                                size="icon"
                                variant="secondary"
                                onClick={() => setEditTask(t)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Edit Task</DialogTitle>
                                </DialogHeader>
                                <TaskForm
                                  initial={t}
                                  onSubmit={(v) =>
                                    updateTask({ id: t.id, ...v })
                                  }
                                />
                              </DialogContent>
                            </Dialog>
                            <AlertDialog
                              open={deleteTaskId === id}
                              onOpenChange={(o) => !o && setDeleteTaskId(null)}
                            >
                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => setDeleteTaskId(id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Hapus “{t.title}”?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <p className="text-sm text-muted-foreground">
                                  Tindakan ini tidak dapat dibatalkan.
                                </p>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteTask(id)}
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </SortableContext>
              </CardContent>
            </Card>
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {/* Optional: custom preview while dragging */}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// ------------ Task Form ------------
function TaskForm({
  initial,
  onSubmit,
}: {
  initial?: Partial<Task>;
  onSubmit: (v: Omit<Task, "id">) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description?.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Judul</Label>
        <Input
          placeholder="Contoh: Setup CI"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Deskripsi</Label>
        <Textarea
          placeholder="Detail…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  );
}
