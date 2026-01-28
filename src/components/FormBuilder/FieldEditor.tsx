import React from "react";
import { useFormContext } from "../../context/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FieldEditor: React.FC = () => {
  const { fields, activeFieldId, updateField, setActiveFieldId } =
    useFormContext();

  const field = fields.find((f) => f.id === activeFieldId);

  if (!field) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground p-8 text-center bg-card rounded-xl border border-dashed">
        <p>Select a field in the canvas to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-card rounded-xl border border-border shadow-sm animate-in fade-in slide-in-from-right-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Field Properties</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActiveFieldId(null)}
          className="h-8 w-8 text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={field.label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateField(field.id, { label: e.target.value })
            }
            placeholder="Enter field label"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="placeholder">Placeholder</Label>
          <Input
            id="placeholder"
            value={field.placeholder || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateField(field.id, { placeholder: e.target.value })
            }
            placeholder="Enter placeholder text"
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="required"
            checked={field.required}
            onCheckedChange={(checked) =>
              updateField(field.id, { required: !!checked })
            }
          />
          <Label
            htmlFor="required"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Required Field
          </Label>
        </div>

        {field.type === "select" && (
          <div className="space-y-2 pt-4 border-t mt-4">
            <Label htmlFor="options">Options (comma separated)</Label>
            <Textarea
              id="options"
              value={field.options?.join(", ")}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateField(field.id, {
                  options: e.target.value
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean),
                })
              }
              placeholder="Option 1, Option 2, ..."
              rows={4}
            />
          </div>
        )}

        <div className="space-y-2 pt-4 border-t mt-4">
          <Label htmlFor="validation">Custom Validation (Regex)</Label>
          <Input
            id="validation"
            value={field.validationRule || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateField(field.id, { validationRule: e.target.value })
            }
            placeholder="e.g. ^[0-9]{5}$"
          />
          <p className="text-[11px] text-muted-foreground italic">
            Leave empty for default type validation.
          </p>
        </div>
      </div>
    </div>
  );
};
