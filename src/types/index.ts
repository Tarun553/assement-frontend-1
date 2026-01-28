export type FieldType = 'text' | 'number' | 'email' | 'select' | 'checkbox' | 'date' | 'textarea';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select inputs
  validationRule?: string; // Regex string for custom validation
}

export interface FormResponse {
  id: string;
  submittedAt: string;
  answers: Record<string, unknown>;
  formId: string;
}

export type ViewMode = 'builder' | 'preview' | 'analytics';

export interface ChartConfig {
  xAxisFieldId: string;
  chartType: 'bar' | 'pie' | 'line';
}