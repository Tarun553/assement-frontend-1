import React from "react";
import { Toolbar } from "../components/FormBuilder/Toolbar";
import { Canvas } from "../components/FormBuilder/Canvas";
import { FieldEditor } from "../components/FormBuilder/FieldEditor";
import { ScrollArea } from "@/components/ui/scroll-area";

export const FormBuilderPage: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-10rem)] gap-8">
      {/* Sidebar - Fields Toolbar */}
      <aside className="w-72 shrink-0 flex flex-col gap-4">
        <ScrollArea className="h-full pr-4">
          <Toolbar />
        </ScrollArea>
      </aside>

      {/* Main Workspace - Canvas */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <ScrollArea className="h-full pr-4">
          <Canvas />
        </ScrollArea>
      </div>

      {/* Properties Panel - Field Editor */}
      <aside className="w-80 shrink-0 flex flex-col gap-4">
        <ScrollArea className="h-full pl-4">
          <FieldEditor />
        </ScrollArea>
      </aside>
    </div>
  );
};
