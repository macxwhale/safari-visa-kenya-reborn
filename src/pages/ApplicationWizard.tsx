
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X, Globe, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import ApplicationStepper from "@/components/ApplicationStepper";

const STEP_LABELS = [
  "Traveler Type",
  "Personal Info", 
  "Passport",
  "Travel Details",
  "Documents",
  "Review",
];

export default function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [travelerType, setTravelerType] = useState<string>("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    passport: "",
    nationality: "",
    travelFrom: "",
    entryDate: "",
    doc: null as File | null,
  });
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 0: Traveler Type Selection
  if (step === 0) {
    const travelerTypes = [
      {
        id: "tourist",
        title: "Tourists & Visitors",
        description: "If you are visiting Kenya for tourism, business, or visiting for any other reason to apply for your travel authorisation.",
        color: "bg-green-600",
        icon: <Globe className="w-12 h-12 text-white" />
      },
      {
        id: "eac-passport",
        title: "Kenya & East African Partner State Passport Holders",
        description: "As of early 2025, citizens of Kenya & East African Partner States Passport Holders countries can enter Kenya without a visa",
        color: "bg-orange-500",
        flags: ["🇰🇪", "🇹🇿", "🇺🇬", "🇷🇼", "🇧🇮", "🇨🇩", "🇸🇸"]
      }
    ];

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        {/* Modal overlay */}
        <div className="fixed inset-0 bg-black/50 z-40"></div>
        
        {/* Modal content */}
        <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Start your trip to Kenya</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
                className="text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-sm text-gray-700 mb-8 leading-relaxed">
              All foreign visitors except citizens of EAC member States planning to travel to the Republic of Kenya are required to submit Immigration forms in compliance with Section 48 of the Kenya Citizenship & Immigration Act (No. 12 of 2011). Failure to comply may lead to denied boarding and/or deportation upon arrival.
            </p>

            {/* Traveler Type Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {travelerTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => {
                    setTravelerType(type.id);
                    setStep(1);
                  }}
                  className={`${type.color} text-white rounded-lg p-6 cursor-pointer hover:opacity-90 transition-opacity`}
                >
                  <div className="flex items-start gap-4">
                    {type.icon && <div className="flex-shrink-0">{type.icon}</div>}
                    {type.flags && (
                      <div className="flex gap-1 mb-4">
                        {type.flags.map((flag, idx) => (
                          <span key={idx} className="text-2xl">{flag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{type.description}</p>
                </div>
              ))}
            </div>

            {/* Diplomat Section */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 bg-green-600 rounded"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Diplomats and Laissez Passer Holders</h4>
                <p className="text-sm text-gray-600">Choose this option if you are a holder of Diplomat/Service/Official Passports or a Laissez Passer holder on official duty</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t">
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- Step Content Rendering for other steps ---
  let content = null;
  if (step === 1) {
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
  } else if (step === 2) {
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
  } else if (step === 3) {
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
  } else if (step === 4) {
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
  } else if (step === 5) {
    content = (
      <div className="animate-fade-in">
        <h2 className="font-semibold mb-2 text-lg">Review your information</h2>
        <ul className="list-disc ml-4 space-y-1 text-gray-700">
          <li>Traveler Type: <span className="font-mono">{travelerType}</span></li>
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

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    let doc_url: string | undefined;

    try {
      // 1. Upload document to storage if present
      if (form.doc) {
        const { data, error: uploadError } = await supabase.storage
          .from("eta-documents")
          .upload(`public/${Date.now()}_${form.doc.name}`, form.doc);
        if (uploadError) {
          setError("Failed to upload document: " + uploadError.message);
          setSubmitting(false);
          return;
        }
        doc_url = data?.path;
      }

      // 2. Submit application to DB
      const { error: insertError } = await supabase
        .from("eta_applications")
        .insert([
          {
            user_id: null,
            full_name: form.fullName,
            email: form.email,
            passport: form.passport,
            nationality: form.nationality,
            travel_from: form.travelFrom,
            entry_date: form.entryDate,
            doc_url,
            // status/submitted_at handled by default
          },
        ]);
      if (insertError) {
        setError("Submission failed: " + insertError.message);
        setSubmitting(false);
        return;
      }

      alert("Application submitted!");
      setStep(0);
      setTravelerType("");
      setForm({
        fullName: "",
        email: "",
        passport: "",
        nationality: "",
        travelFrom: "",
        entryDate: "",
        doc: null,
      });
      navigate("/dashboard");
    } catch (e: any) {
      setError("Unexpected error: " + (e.message || e.toString()));
    } finally {
      setSubmitting(false);
    }
  }

  // Regular form steps (1-5)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl bg-white shadow-lg mx-auto mt-12 mb-20 rounded-lg border border-gray-200 p-8 space-y-6 animate-fade-in">
        <ApplicationStepper currentStep={step} steps={STEP_LABELS} />
        <div>{content}</div>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        <div className="flex justify-between pt-6">
          <Button variant="secondary" onClick={goBack} disabled={step === 0 || submitting}>
            Back
          </Button>
          {step < STEP_LABELS.length - 1 ? (
            <Button onClick={goNext} disabled={submitting}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
