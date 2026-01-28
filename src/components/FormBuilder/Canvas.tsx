import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFormContext } from "../../context/FormContext";
import { SortableField } from "./SortableField";
import { Plus } from "lucide-react";

export const Canvas: React.FC = () => {
  const { fields, moveField } = useFormContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over?.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        moveField(oldIndex, newIndex);
      }
    }
  };

  return (
    <div className="flex-1 min-h-[600px] bg-muted/30 rounded-2xl border-2 border-dashed border-border/50 p-6 transition-colors hover:border-primary/20 group">
      {fields.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50 py-20">
          <div className="bg-background p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
            <Plus className="w-10 h-10" />
          </div>
          <p className="text-xl font-medium">Build your form</p>
          <p className="text-sm">
            Click on a field type in the toolbar to get started
          </p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field) => (
                <SortableField key={field.id} field={field} />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      )}
    </div>
  );
};
