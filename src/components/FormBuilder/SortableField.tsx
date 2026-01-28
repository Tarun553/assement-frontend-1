import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FormField } from "../../types";
import { useFormContext } from "../../context/FormContext";
import { GripVertical, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SortableFieldProps {
  field: FormField;
}

export const SortableField: React.FC<SortableFieldProps> = ({ field }) => {
  const { activeFieldId, setActiveFieldId, removeField } = useFormContext();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isActive = activeFieldId === field.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-card p-4 rounded-xl border transition-all duration-200",
        isActive
          ? "ring-2 ring-primary border-transparent shadow-md"
          : "border-border hover:border-primary/50 shadow-sm",
        isDragging && "opacity-50 z-50 scale-[1.02] rotate-1",
      )}
      onClick={() => setActiveFieldId(field.id)}
    >
      <div className="flex items-start gap-4">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
        >
          <GripVertical className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">
                {field.label}
              </span>
              {field.required && (
                <span className="text-destructive text-sm font-bold">*</span>
              )}
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full uppercase font-semibold">
                {field.type}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation();
                  removeField(field.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Visual Placeholder */}
          <div className="pointer-events-none select-none opacity-40">
            {field.type === "textarea" ? (
              <div className="h-20 w-full bg-muted/50 rounded-md border border-border/50 border-dashed" />
            ) : field.type === "select" ? (
              <div className="h-10 w-full bg-muted/50 rounded-md border border-border/50 flex items-center px-3 justify-between">
                <span className="text-xs text-muted-foreground">
                  Select an option...
                </span>
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
              </div>
            ) : field.type === "checkbox" ? (
              <div className="flex items-center gap-2 px-1">
                <div className="w-4 h-4 rounded border border-border" />
                <span className="text-sm text-muted-foreground">Option</span>
              </div>
            ) : (
              <div className="h-10 w-full bg-muted/50 rounded-md border border-border/50" />
            )}
          </div>
        </div>
      </div>

      {isActive && (
        <div className="absolute -right-2 -top-2 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-sm">
          <CheckCircle2 className="w-3 h-3" />
        </div>
      )}
    </div>
  );
};
