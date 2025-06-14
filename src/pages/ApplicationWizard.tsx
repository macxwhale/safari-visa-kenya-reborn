
import { useState } from "react";
import ApplicationStepper from "@/components/ApplicationStepper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STEP_LABELS = [
  "Personal Info",
  "Passport",
  "Travel Details",
  "Documents",
  "Review",
];

export default function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    passport: "",
    nationality: "",
    travelFrom: "",
    entryDate: "",
    doc: null as File | null,
  });

  // --- Step Content Rendering ---
  let content = null;
  if (step === 0) {
    content = (
      <div className="space-y-4 animate-fade-in">
        <div>
          <label className="font-medium">Full Name</label>
          <Input
            required
            placeholder="As in passport"
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
          />
        </div>
        <div>
          <label className="font-medium">Email Address</label>
          <Input
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            type="email"
          />
        </div>
      </div>
    );
  } else if (step === 1) {
    content = (
      <div className="space-y-4 animate-fade-in">
        <div>
          <label className="font-medium">Passport Number</label>
          <Input
            required
            placeholder="e.g. A1234567"
            value={form.passport}
            onChange={(e) => setForm((f) => ({ ...f, passport: e.target.value }))}
          />
        </div>
        <div>
          <label className="font-medium">Nationality</label>
          <Input
            required
            placeholder="e.g. United States"
            value={form.nationality}
            onChange={(e) => setForm((f) => ({ ...f, nationality: e.target.value }))}
          />
        </div>
      </div>
    );
  } else if (step === 2) {
    content = (
      <div className="space-y-4 animate-fade-in">
        <div>
          <label className="font-medium">Visiting From</label>
          <Input
            required
            placeholder="Your country of departure"
            value={form.travelFrom}
            onChange={(e) => setForm((f) => ({ ...f, travelFrom: e.target.value }))}
          />
        </div>
        <div>
          <label className="font-medium">Entry Date</label>
          <Input
            required
            type="date"
            value={form.entryDate}
            onChange={(e) => setForm((f) => ({ ...f, entryDate: e.target.value }))}
          />
        </div>
      </div>
    );
  } else if (step === 3) {
    content = (
      <div className="space-y-4 animate-fade-in">
        <div>
          <label className="font-medium">Upload Passport Scan or Photo</label>
          <Input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) =>
              setForm((f) => ({ ...f, doc: e.target.files?.[0] || null }))
            }
          />
          {form.doc && (
            <div className="mt-2 text-xs text-gray-500">
              Selected: {form.doc.name}
            </div>
          )}
        </div>
      </div>
    );
  } else if (step === 4) {
    content = (
      <div className="animate-fade-in">
        <h2 className="font-semibold mb-2 text-lg">Review your information</h2>
        <ul className="list-disc ml-4 space-y-1 text-gray-700">
          <li>Name: <span className="font-mono">{form.fullName}</span></li>
          <li>Email: <span className="font-mono">{form.email}</span></li>
          <li>Passport Number: <span className="font-mono">{form.passport}</span></li>
          <li>Nationality: <span className="font-mono">{form.nationality}</span></li>
          <li>From: <span className="font-mono">{form.travelFrom}</span></li>
          <li>Entry Date: <span className="font-mono">{form.entryDate}</span></li>
          <li>Document: <span className="font-mono">{form.doc?.name ? form.doc.name : "none"}</span></li>
        </ul>
        <div className="mt-3 text-[0.95rem] text-muted-foreground">Please ensure all data is correct before submission.</div>
      </div>
    );
  }

  // --- Navigation ---
  function goNext() {
    if (step < STEP_LABELS.length - 1) setStep((s) => s + 1);
  }
  function goBack() {
    if (step > 0) setStep((s) => s - 1);
  }
  function handleSubmit() {
    // In a real app, you'd submit the form to an API here!
    alert("Submitted! (This is a demo)");
    setStep(0);
    setForm({
      fullName: "",
      email: "",
      passport: "",
      nationality: "",
      travelFrom: "",
      entryDate: "",
      doc: null,
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl bg-white shadow-lg mx-auto mt-12 mb-20 rounded-lg border border-gray-200 p-8 space-y-6 animate-fade-in">
        <ApplicationStepper currentStep={step} steps={STEP_LABELS} />
        <div>{content}</div>
        <div className="flex justify-between pt-6">
          <Button variant="secondary" onClick={goBack} disabled={step === 0}>
            Back
          </Button>
          {step < STEP_LABELS.length - 1 ? (
            <Button onClick={goNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit Application</Button>
          )}
        </div>
      </div>
    </div>
  );
}
