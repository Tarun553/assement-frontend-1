import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useFormContext } from "../../context/FormContext";
import { Button } from "@/components/ui/button";

import type { FormField } from "@/types";
import { buildZodSchema } from "@/utils/buildZodSchema";
import { FormFieldBlock } from "@/components/FormFieldBlock";
import { FieldInput } from "@/components/FieldInput";

type Values = Record<FormField["id"], unknown>;

function getDefaultValues(fields: FormField[]): Values {
  return fields.reduce<Values>((acc, f) => {
    if (f.type === "checkbox") acc[f.id] = false;
    else acc[f.id] = "";
    return acc;
  }, {});
}

export const FormRenderer: React.FC = () => {
  const { fields, addResponse } = useFormContext();

  const schema = useMemo(() => buildZodSchema(fields), [fields]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(fields),
    mode: "onSubmit",
  });

  const onSubmit = (data: Values) => {
    addResponse({
      id: window.crypto?.randomUUID?.() ,
      formId: "current-form",
      answers: data,
    });

    toast.success("Form submitted successfully!");
    reset(getDefaultValues(fields));
  };

  if (fields.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center text-muted-foreground border-2 border-dashed rounded-3xl">
        <p>No fields added to the form yet. Go back to the builder to add some.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-card border rounded-3xl shadow-lg animate-in fade-in slide-in-from-bottom-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field) => {
          const errMsg = (errors?.[field.id]?.message as string) || undefined;

          return (
            <FormFieldBlock
              key={field.id}
              id={field.id}
              label={field.label}
              required={field.required}
              error={errMsg}
            >
              <FieldInput
                field={field}
                register={register}
                setValue={setValue}
                control={control}
                hasError={!!errMsg}
              />
            </FormFieldBlock>
          );
        })}

        <div className="pt-4">
          <Button type="submit" className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20">
            Submit Form
          </Button>
        </div>
      </form>
    </div>
  );
};
