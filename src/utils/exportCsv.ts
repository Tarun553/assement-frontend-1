import type { FormField } from "../types";

type Response = {
  submittedAt?: string | number;
  answers: Record<string, unknown>;
};

export async function exportResponsesToCSV(params: {
  fields: FormField[];
  responses: Response[];
  filenamePrefix?: string;
}) {
  const { fields, responses, filenamePrefix = "form-responses" } = params;

  // Dynamically import PapaParse
  const Papa = (await import("papaparse")).default;

  const data = responses.map((r) => {
    const row: Record<string, unknown> = {
      SubmittedAt: r.submittedAt ?? "",
    };

    // Safer: keep ids in header to avoid label collisions
    for (const f of fields) {
      row[`${f.label} (${f.id})`] = r.answers?.[f.id] ?? "";
    }

    return row;
  });

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${filenamePrefix}-${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  // cleanup
  URL.revokeObjectURL(url);
}
