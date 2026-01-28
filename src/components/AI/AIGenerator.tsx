import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Wand2, Lightbulb } from "lucide-react";
import { generateFormWithGemini } from "../../utils/gemini";
import { useFormContext } from "../../context/FormContext";
import { useViewContext } from "../../hooks/useView";
import { toast } from "sonner";

const EXAMPLES = [
  "A registration form for a coding bootcamp",
  "A customer satisfaction survey for a restaurant",
  "A contact form with fields for website project inquiry",
  "A simple event RSVP form with dietary preferences",
];

export const AIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setFields } = useFormContext();
  const { setView } = useViewContext();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    try {
      const generatedFields = await generateFormWithGemini(prompt);
      setFields(generatedFields);
      setView("builder");
      toast.success("Form generated successfully!");
      setOpen(false);
      setPrompt("");
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to generate form");
      } else {
        toast.error("Failed to generate form");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground gap-2" size="sm">
          <Sparkles className="w-4 h-4" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Generate Form with AI
          </DialogTitle>
          <DialogDescription>
            Describe the form you want to create, and let AI do the heavy
            lifting.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Textarea
              placeholder="e.g., Generate a job application form for a Senior React Developer position..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Lightbulb className="w-4 h-4" />
              Quick Examples
            </div>
            <div className="grid grid-cols-1 gap-2">
              {EXAMPLES.map((example) => (
                <button
                  key={example}
                  onClick={() => setPrompt(example)}
                  className="text-left py-2 px-3 text-sm rounded-md border bg-muted/50 hover:bg-muted transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={loading} className="gap-2">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
