"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import SignatureForm from "@/components/ui/signature-form";
import HeaderBar from "@/constants/HeaderBar";

// Helper input component (tailwind styled)
const TextInput = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700" htmlFor={props.id}>{label}</label>
    <input
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-custom-primary focus:ring-2 focus:ring-custom-primary/40 dark:bg-white/5 dark:border-gray-600"
      {...props}
    />
  </div>
);

const TextArea = ({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700" htmlFor={props.id}>{label}</label>
    <textarea
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-custom-primary focus:ring-2 focus:ring-custom-primary/40 dark:bg-white/5 dark:border-gray-600"
      rows={3}
      {...props}
    />
  </div>
);

const steps = [1, 2, 3, 4];

export default function BecomeAgentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isStepValid, setIsStepValid] = useState(true);

  // Refs for step-specific validation
  const step2Ref = useRef<HTMLFormElement>(null);
  const step3Ref = useRef<HTMLFormElement>(null);

  // Track validity of current step inputs to enable/disable "Next" button
  useEffect(() => {
    let currentForm: HTMLFormElement | null = null;
    if (currentStep === 2) currentForm = step2Ref.current;
    else if (currentStep === 3) currentForm = step3Ref.current;

    const evaluate = () => {
      if (!currentForm) {
        // Steps 1 & 4 have no tracked form – allow navigation
        setIsStepValid(true);
      } else {
        setIsStepValid(currentForm.checkValidity());
      }
    };

    // Initial evaluation on step change
    evaluate();

    // Attach listeners to update validity on user input
    currentForm?.addEventListener("input", evaluate);
    currentForm?.addEventListener("change", evaluate);

    return () => {
      currentForm?.removeEventListener("input", evaluate);
      currentForm?.removeEventListener("change", evaluate);
    };
  }, [currentStep]);

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validate inputs for steps 2 and 3
    if (currentStep === 2 && step2Ref.current) {
      if (!step2Ref.current.checkValidity()) {
        step2Ref.current.reportValidity();
        return;
      }
    }
    if (currentStep === 3 && step3Ref.current) {
      if (!step3Ref.current.checkValidity()) {
        step3Ref.current.reportValidity();
        return;
      }
    }

    // Final submission step
    if (currentStep >= steps.length) {
      setIsFinalizing(true);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsFinalizing(false);
        setIsComplete(true);
      }, 1000);
      return;
    }

    // Move to next step
    setIsLoading(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsLoading(false);
    }, 500);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Conditional UI for loading & completion states
  if (isFinalizing) {
    return (
      <div className="container mx-auto max-w-3xl py-32 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-custom-primary" />
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="container mx-auto max-w-3xl py-32 flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold">Form completed successfully!</h2>
        <Button className="bg-custom-primary/90 text-white hover:bg-custom-primary" onClick={() => {}}>
          Proceed to Payment
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-16 pt-24 px-4 space-y-10">
      <div className="space-y-4 text-center">
        <h1 className="section-title text-5xl max-w-xl mx-auto">Become a National Cake Macro Agent</h1>
        <p className="text-gray-700 text-xs dark:text-gray-400 max-w-xl mx-auto">
          Become a Macro Agent and build your nation while earning with a purpose. Start your journey in less than 3 minutes by filling your details correctly. Then go on to pay a yearly non-refundable fee of ₦50,000 and send proof of payment to 08168378999 on WhatsApp.
        </p>
        <p className="text-xs font-medium text-custom-primary max-w-xl mx-auto">#Fast onboarding &nbsp; • &nbsp; #Real commissions &nbsp; • &nbsp; #National impact</p>
      </div>

      {/* Stepper */}
      <Stepper value={currentStep} onValueChange={setCurrentStep} className="mb-10">
        {steps.map((step) => (
          <StepperItem key={step} step={step} loading={isLoading} className="not-last:flex-1">
            <StepperTrigger asChild>
              <StepperIndicator  />
            </StepperTrigger>
            {step < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>

      {/* Step Content */}
      <div className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">National Cake Macro Agent Application Form</h2>
            <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
              <li>Register with a non-refundable fee of ₦50,000.</li>
              <li>Fill the agent form and order not less than five (5) boxes of National Cake.</li>
              <li>Play and Earn.</li>
            </ul>
          </div>
        )}

        {currentStep === 2 && (
          <form ref={step2Ref} className="space-y-6" noValidate>
            <h2 className="text-lg font-semibold">Section 1: Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput id="fullname" label="Full Name" placeholder="John Doe" required />
              <TextInput id="phone" label="Phone Number (WhatsApp preferred)" placeholder="08123456789" required />
              <TextInput id="email" type="email" label="Email Address" placeholder="john@example.com" required />
              <TextInput id="dob" type="date" label="Date of Birth" required />
              <TextInput id="state" label="State" required />
              <TextInput id="lga" label="Local Government Area" required />
            </div>
            <TextArea id="address" label="Residential Address" required />
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Gender:</label>
              <label className="flex items-center gap-1 text-sm"><input type="radio" name="gender" value="male" required /> Male</label>
              <label className="flex items-center gap-1 text-sm"><input type="radio" name="gender" value="female" /> Female</label>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <form ref={step3Ref} className="space-y-6" noValidate>
            <h2 className="text-lg font-semibold">Section 2 & 3: Professional Information & Commitment</h2>
            <TextInput id="occupation" label="Occupation / Current Role" required />
            <div className="space-y-2">
              <p className="text-sm font-medium">Have you sold or distributed educational or game products before?</p>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="experience" value="yes" required /> Yes</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="experience" value="no" /> No</label>
            </div>
            <TextArea id="target-market" label="Target Market You Intend to Serve" placeholder="Schools, Families, etc." required />
            <TextInput id="coverage" label="Area of Coverage" required />
            <TextInput id="pickup" label="Official Contact Address (pickup point)" required />
            <TextInput id="landmark" label="Important Landmark" required />
            <TextInput id="units" label="How many game units can you start with? (Minimum 5 boxes)" type="number" required />
            <div className="space-y-2">
              <p className="text-sm font-medium">How soon can you begin distribution if selected?</p>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="start-time" value="immediate" required /> Immediately</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="start-time" value="7days" /> Within 7 days</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="start-time" value="30days" /> Within 30 days</label>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Do you belong to any network, association, or community that could support sales?</p>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="network" value="yes" required /> Yes</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="network" value="no" /> No</label>
            </div>
            <TextInput id="network-detail" label="If yes, specify" required />
          </form>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Section 4: Declaration & Signature</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              I hereby declare that the information provided above is true and complete to the best of my knowledge. I understand that being a Macro Agent involves responsible representation of the National Cake brand and that misconduct may result in deactivation.
            </p>
            <SignatureForm />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-10">
        <Button variant="outline" className="w-32" onClick={handlePrevStep} disabled={currentStep === 1 || isLoading}>
          Prev step
        </Button>
        <Button type="button" variant="outline" className="w-32 bg-custom-primary/90 text-white hover:bg-custom-primary hover:text-white" onClick={handleNextStep} disabled={isLoading || !isStepValid}>
          {currentStep === steps.length ? "Done" : "Next step"}
        </Button>
      </div>
    </div>
  );
}
