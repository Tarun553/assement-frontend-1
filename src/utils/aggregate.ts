import type { FormField } from "../types";

type Response = {
  answers: Record<string, unknown>;
};

export function buildDistributionData(params: {
  responses: Response[];
  xFieldIds: string[]; // multiple
  delimiter?: string;
}) {
  const { responses, xFieldIds, delimiter = " | " } = params;

  if (!responses.length || xFieldIds.length === 0) return [];

  const counts: Record<string, number> = {};

  for (const resp of responses) {
    const key = xFieldIds
      .map((id) => {
        const v = resp.answers?.[id];
        if (v === undefined || v === null || v === "") return "N/A";
        return String(v);
      })
      .join(delimiter);

    counts[key] = (counts[key] ?? 0) + 1;
  }

  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

export function getXAxisEligibleFields(fields: FormField[]) {
  // pick types that make sense as categories
  const allowed = new Set<FormField["type"]>(["text", "email", "select", "date", "number"]);
  return fields.filter((f) => allowed.has(f.type));
}
