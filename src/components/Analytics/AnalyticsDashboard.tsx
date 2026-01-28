

import React, { useMemo, useState } from "react";
import { useFormContext } from "../../context/FormContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, Table as TableIcon } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

import { exportResponsesToCSV } from "@/utils/exportCsv";
import {
  buildDistributionData,
  getXAxisEligibleFields,
} from "@/utils/aggregate";
import { XAxisMultiSelect } from "./XAxisMultiSelect";

export const AnalyticsDashboard: React.FC = () => {
  const { fields, responses } = useFormContext();

  const eligibleFields = useMemo(
    () => getXAxisEligibleFields(fields),
    [fields],
  );

  // multi X-axis - stores user-picked IDs
  const [selectedXAxisFieldIds, setSelectedXAxisFieldIds] = useState<string[]>(
    [],
  );

  // Derived selection: filter out any deleted fields and default to first if empty
  const activeXAxisFieldIds = useMemo(() => {
    const allowedIds = new Set(eligibleFields.map((f) => f.id));
    const cleaned = selectedXAxisFieldIds.filter((id) => allowedIds.has(id));
    if (cleaned.length > 0) return cleaned;
    // default to first eligible field
    return eligibleFields[0]?.id ? [eligibleFields[0].id] : [];
  }, [eligibleFields, selectedXAxisFieldIds]);

  const chartData = useMemo(() => {
    return buildDistributionData({
      responses,
      xFieldIds: activeXAxisFieldIds,
    });
  }, [responses, activeXAxisFieldIds]);

  const exportCSV = () => {
    exportResponsesToCSV({ fields, responses });
  };

  if (responses.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <BarChart3 className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold mb-2">No responses yet</h3>
        <p className="text-muted-foreground">
          Go to the Preview tab and submit the form to see analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Visualize and export your form data.
          </p>
        </div>
        <Button onClick={exportCSV} className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-lg border-primary/5">
          <CardHeader className="space-y-3 pb-7">
            <div>
              <CardTitle className="text-xl">Response Distribution</CardTitle>
              <CardDescription>
                Frequency of values for selected X-axis fields
              </CardDescription>
            </div>

            <XAxisMultiSelect
              fields={eligibleFields}
              value={activeXAxisFieldIds}
              onChange={setSelectedXAxisFieldIds}
            />
          </CardHeader>

          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--muted))"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-15}
                    height={60}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-primary/5">
          <CardHeader>
            <CardTitle className="text-xl">Summary</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl">
                <TableIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Submissions
                </p>
                <p className="text-2xl font-bold">{responses.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Fields</p>
                <p className="text-2xl font-bold">{fields.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
