import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays } from "lucide-react";
import KanbanBoardDemo from "@/components/Kanban";
import DemoMilestonesUI from "@/components/MilestonesPanel";
import TaskTodos from "@/components/Task";

// Types for the component props
export type ProjectDetailProps = {
  name: string;
  description?: string;
  startDate: string | Date; // ISO string or Date
  endDate?: string | Date; // optional if the project is ongoing
  className?: string;
};

function formatDate(value?: string | Date) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export default function ProjectDetail({
  name,
  description,
  startDate,
  endDate,
  className,
}: ProjectDetailProps) {
  return (
    <div className={"w-full max-w-5xl mx-auto p-4 sm:p-6 " + (className ?? "")}>
      {/* Header */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl sm:text-3xl tracking-tight">
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {description ? (
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          ) : null}

          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-4">
            <div className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span className="font-medium">Start</span>
              <span className="text-muted-foreground">
                {formatDate(startDate)}
              </span>
            </div>
            <div className="hidden sm:block text-muted-foreground">•</div>
            <div className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span className="font-medium">End</span>
              <span className="text-muted-foreground">
                {formatDate(endDate)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="mt-6">
        <Tabs defaultValue="kanban" className="w-full">
          <TabsList className="grid grid-cols-3 w-full sm:max-w-md">
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="milestones">Milestone</TabsTrigger>
            <TabsTrigger value="tasks">Task</TabsTrigger>
          </TabsList>

          {/* Leave the contents intentionally empty as requested */}
          <TabsContent value="kanban" className="pt-4">
            <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
              <KanbanBoardDemo></KanbanBoardDemo>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="pt-4">
            <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
              <DemoMilestonesUI></DemoMilestonesUI>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="pt-4">
            <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
              <TaskTodos></TaskTodos>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/*
USAGE EXAMPLE
--------------
import ProjectDetail from "./ProjectDetail";

export default function Page() {
  return (
    <ProjectDetail
      name="Sistem Pemesanan Web App"
      description="Aplikasi untuk pemesanan jasa pembuatan website & aplikasi dengan fitur tracking progres."
      startDate="2025-08-01"
      endDate="2025-09-30"
    />
  );
}
*/
