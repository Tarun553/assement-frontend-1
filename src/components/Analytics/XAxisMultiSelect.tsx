import type { FormField } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

export function XAxisMultiSelect({
  fields,
  value,
  onChange,
}: {
  fields: FormField[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">X-Axis Fields</p>
      <div className="space-y-2 rounded-xl border p-3">
        {fields.map((f) => (
          <label key={f.id} className="flex items-center gap-2 text-sm">
            <Checkbox checked={value.includes(f.id)} onCheckedChange={() => toggle(f.id)} />
            <span>{f.label}</span>
          </label>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Selected fields will be combined like: <b>Field1 | Field2</b>
      </p>
    </div>
  );
}
