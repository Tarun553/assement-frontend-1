import React, { createContext, useContext, useState, useCallback } from "react";
import type { FormField, FieldType, FormResponse } from "../types";

interface FormContextType {
  fields: FormField[];
  responses: FormResponse[];
  activeFieldId: string | null;
  setFields: (fields: FormField[]) => void;
  addField: (type: FieldType) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  setActiveFieldId: (id: string | null) => void;
  moveField: (startIndex: number, endIndex: number) => void;
  addResponse: (response: Omit<FormResponse, "submittedAt">) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fields, setFieldsState] = useState<FormField[]>([]);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);

  const setFields = useCallback((newFields: FormField[]) => {
    setFieldsState(newFields);
  }, []);

  const addField = useCallback((type: FieldType) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      required: false,
      placeholder: "",
      options: type === "select" ? ["Option 1", "Option 2"] : [],
    };
    setFieldsState((prev) => [...prev, newField]);
    setActiveFieldId(newField.id);
  }, []);

  const removeField = useCallback((id: string) => {
    setFieldsState((prev) => prev.filter((f) => f.id !== id));
    setActiveFieldId((prev) => (prev === id ? null : prev));
  }, []);

  const updateField = useCallback((id: string, updates: Partial<FormField>) => {
    setFieldsState((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    );
  }, []);

  const moveField = useCallback((startIndex: number, endIndex: number) => {
    setFieldsState((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  const addResponse = useCallback(
    (response: Omit<FormResponse, "submittedAt">) => {
      const newResponse: FormResponse = {
        ...response,
        submittedAt: new Date().toISOString(),
      };
      setResponses((prev) => [...prev, newResponse]);
    },
    [],
  );

  return (
    <FormContext.Provider
      value={{
        fields,
        responses,
        activeFieldId,
        setFields,
        addField,
        removeField,
        updateField,
        setActiveFieldId,
        moveField,
        addResponse,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
