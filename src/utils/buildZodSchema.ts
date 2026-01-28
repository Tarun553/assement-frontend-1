import * as z from "zod";
import type { FormField } from "@/types";

function safeRegex(pattern: string): RegExp | null {
  try {
    return new RegExp(pattern);
  } catch {
    return null;
  }
}

export function buildZodSchema(fields: FormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    let base: z.ZodTypeAny;

    switch (field.type) {
      case "number":
        base = z.number({
          message: `${field.label} must be a number`,
        });
        break;

      case "email":
        base = z.string().email(`${field.label} must be a valid email`);
        break;

      case "checkbox":
        base = z.boolean();
        break;

      case "date":
        // You’ll likely store date as string from <input type="date" />
        // So validate it as string with a basic check.
        base = z
          .string()
          .refine((v) => v === "" || !Number.isNaN(Date.parse(v)), {
            message: `${field.label} must be a valid date`,
          });
        break;

      case "select":
      case "textarea":
      case "text":
      default:
        base = z.string();
        break;
    }

    // required/optional handling
    if (field.required) {
      if (field.type === "checkbox") {
        base = (base as z.ZodBoolean).refine((v) => v === true, {
          message: `${field.label} is required`,
        });
      } else if (base instanceof z.ZodString) {
        base = base.min(1, `${field.label} is required`);
      }
      // number required is automatically handled by zodResolver when value is undefined / NaN
    } else {
      base = base.optional();
    }

    // custom regex only makes sense for string-ish fields
    if (field.validationRule && base instanceof z.ZodString) {
      const rx = safeRegex(field.validationRule);
      if (rx) {
        base = base.regex(rx, `Invalid format for ${field.label}`);
      }
    }

    // optional: validate select is in options (only if options exist)
    if (field.type === "select" && Array.isArray(field.options) && field.options.length > 0) {
      const allowed = new Set(field.options);
      base = (base as z.ZodString).refine((v) => !v || allowed.has(v), {
        message: `Please select a valid option for ${field.label}`,
      });
    }

    shape[field.id] = base;
  }

  return z.object(shape);
}
