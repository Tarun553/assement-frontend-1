import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { FormBuilderPage } from "./pages/FormBuilder";
import { FormProvider } from "./context/FormContext";
import { useViewContext } from "./hooks/useView";
import { Toaster } from "@/components/ui/sonner";

// Lazy load heavy components
const FormRenderer = lazy(() =>
  import("./components/FormRenderer/FormRenderer").then((m) => ({
    default: m.FormRenderer,
  })),
);
const AnalyticsDashboard = lazy(() =>
  import("./components/Analytics/AnalyticsDashboard").then((m) => ({
    default: m.AnalyticsDashboard,
  })),
);

const App = () => {
  const { view } = useViewContext();

  return (
    <FormProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            {view === "builder" && <FormBuilderPage />}
            {view === "preview" && <FormRenderer />}
            {view === "analytics" && <AnalyticsDashboard />}
          </Suspense>
        </main>
        <Toaster position="top-right" richColors />
      </div>
    </FormProvider>
  );
};

export default App;
