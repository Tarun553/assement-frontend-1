import React from "react";
import {
  Type,
  Hash,
  Mail,
  List,
  CheckSquare,
  Calendar,
  AlignLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "../../context/FormContext";
import type { FieldType } from "../../types";

const FIELD_TYPES: { type: FieldType; label: string; icon: React.ReactNode }[] =
  [
    { type: "text", label: "Text Input", icon: <Type className="w-4 h-4" /> },
    {
      type: "textarea",
      label: "Long Text",
      icon: <AlignLeft className="w-4 h-4" />,
    },
    { type: "number", label: "Number", icon: <Hash className="w-4 h-4" /> },
    { type: "email", label: "Email", icon: <Mail className="w-4 h-4" /> },
    { type: "select", label: "Dropdown", icon: <List className="w-4 h-4" /> },
    {
      type: "checkbox",
      label: "Checkbox",
      icon: <CheckSquare className="w-4 h-4" />,
    },
    {
      type: "date",
      label: "Date Picker",
      icon: <Calendar className="w-4 h-4" />,
    },
  ];

export const Toolbar: React.FC = () => {
  const { addField } = useFormContext();

  return (
    <div className="flex flex-col gap-2 p-4 bg-card rounded-xl border border-border shadow-sm">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Fields
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {FIELD_TYPES.map(({ type, label, icon }) => (
          <Button
            key={type}
            variant="outline"
            className="justify-start gap-3 h-11 px-4 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            onClick={() => addField(type)}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              {icon}
            </div>
            <span className="text-sm font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
