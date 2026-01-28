
import { Controller, type Control, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import type { FormField } from "@/types";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  field: FormField;
  register: UseFormRegister<Record<string, unknown>>;
  setValue: UseFormSetValue<Record<string, unknown>>;
  control: Control<Record<string, unknown>>;
  hasError: boolean;
};

export function FieldInput({ field, register, setValue, control, hasError }: Props) {
  const errorClass = hasError ? "border-destructive" : "";

  switch (field.type) {
    case "textarea":
      return (
        <Textarea
          id={field.id}
          placeholder={field.placeholder}
          {...register(field.id)}
          className={errorClass}
        />
      );

    case "select":
      return (
        <Select
          onValueChange={(val) => setValue(field.id, val, { shouldValidate: true })}
        >
          <SelectTrigger className={errorClass}>
            <SelectValue placeholder={field.placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "checkbox":
      return (
        <Controller
          name={field.id}
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox id={field.id} checked={!!value} onCheckedChange={onChange} />
              <span className="text-sm text-muted-foreground">Confirm selection</span>
            </div>
          )}
        />
      );

    case "date":
      return (
        <Input
          id={field.id}
          type="date"
          placeholder={field.placeholder}
          {...register(field.id)}
          className={errorClass}
        />
      );

    case "number":
      return (
        <Input
          id={field.id}
          type="number"
          placeholder={field.placeholder}
          {...register(field.id, { valueAsNumber: true })}
          className={errorClass}
        />
      );

    case "email":
      return (
        <Input
          id={field.id}
          type="email"
          placeholder={field.placeholder}
          {...register(field.id)}
          className={errorClass}
        />
      );

    case "text":
    default:
      return (
        <Input
          id={field.id}
          type="text"
          placeholder={field.placeholder}
          {...register(field.id)}
          className={errorClass}
        />
      );
  }
}
