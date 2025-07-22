"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, CalendarIcon } from "lucide-react";
import DialogContainer from "@/constants/DialogContainer";
import { Button } from "@/components/ui/button";

// React-Aria date-picker pieces
import {
  Button as RacButton,
  DatePicker as RacDatePicker,
  Dialog as RacDialog,
  Group,
  Label as RacLabel,
  Popover,
} from "react-aria-components";
import { Calendar } from "@/components/ui/calendar-rac";
import { DateInput } from "@/components/ui/datefield-rac";

// Stepper & advanced form controls
import { Stepper, StepperIndicator, StepperItem, StepperSeparator, StepperTrigger } from "@/components/ui/stepper";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import MultipleSelector, { Option } from "@/components/ui/multiselect";

/* ------------------------------------------------------------------ */

const stepTitles = [
  "Personal Information",
  "Professional Information",
  "Distribution Capacity",
  "Engagement & Declaration",
];

const stepDescriptions = [
  "Tell us about you",
  "Your professional background",
  "How many units & when you can start",
  "Online presence & confirmation",
];

/* ------------------------------------------------------------------ */

export function AgentStepperDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const totalSteps = stepTitles.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    } else {
      setShowSuccessAlert(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessAlert(false);
    onOpenChange(false);
  };

  /* ---------------- render helpers ---------------- */

  const Field = ({ label, textarea = false, name, ...rest }: any) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {textarea ? (
        <Textarea id={name} name={name} {...rest} />
      ) : (
        <Input id={name} name={name} {...rest} />
      )}
    </div>
  );

  const Checkbox = ({ label, name, value }: any) => (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" name={name} value={value} className="h-4 w-4" />
      {label}
    </label>
  );

  const Radio = ({ label, name, value }: any) => (
    <label className="flex items-center gap-2 text-sm">
      <input type="radio" name={name} value={value} className="h-4 w-4" />
      {label}
    </label>
  );

  const YesNo = ({ label, name }: { label: string; name: string }) => (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="flex gap-6">
        <Radio label="Yes" name={name} value="yes" />
        <Radio label="No" name={name} value="no" />
      </div>
    </div>
  );

  const RadioGroup = ({ label, name, options }: any) => (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="flex flex-col gap-2">
        {options.map((o: string) => (
          <Radio key={o} label={o} name={name} value={o} />
        ))}
      </div>
    </div>
  );

  /* ---------------- step content ---------------- */

  const DatePickerInline = (pickerLabel: string) => (
    <div className="space-y-2">
      <RacDatePicker className="*:not-first:mt-2">
        <RacLabel className="text-foreground text-sm font-medium">
          {pickerLabel}
        </RacLabel>
        <div className="flex">
          <Group className="w-full">
            <DateInput className="pe-9" />
          </Group>
          <RacButton className="text-muted-foreground/80 hover:text-foreground z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md">
            <CalendarIcon size={16} />
          </RacButton>
        </div>
        <Popover
          className="bg-background text-popover-foreground z-50 rounded-lg border shadow-lg"
          offset={4}
        >
          <RacDialog className="max-h-[inherit] overflow-auto p-2">
            <Calendar />
          </RacDialog>
        </Popover>
      </RacDatePicker>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ScrollArea className="h-[22rem] overflow-auto px-5 ">
            <h3 className="font-semibold mb-3">SECTION 1: Personal Information</h3>
            <Field label="Full Name" name="fullName" className="mb-3" />
            <Field label="Phone Number (WhatsApp Preferred)" name="phone" className="mb-3" />
            <Field label="Email Address" name="email" type="email" className="mb-3" />
            {DatePickerInline("Date of Birth")}
            <div className="space-y-2 mt-3 mb-3">
              <Label>Gender</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Field label="Residential Address" name="address" textarea className="mb-3 resize-none" />
            <Field label="State" name="state" className="mb-3" />
            <Field label="Local Government Area" name="lga" className="mb-3" />
          </ScrollArea>
        );
      case 2:
        return (
          <ScrollArea className="h-auto overflow-auto px-5">
            <h3 className="font-semibold mb-3">SECTION 2: Professional Information</h3>
            <Field label="Occupation / Current Role" name="occupation" />
            <div className="space-y-2">
               <Label>Have you sold or distributed educational or game products before?</Label>
               <Select>
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select option" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="yes">Yes</SelectItem>
                   <SelectItem value="no">No</SelectItem>
                 </SelectContent>
               </Select>
             </div>
            <div className="space-y-2 mt-4">
               <Label>Target Market You Intend to Serve</Label>
               {(() => {
                 const marketOptions: Option[] = [
                   { value: "Schools", label: "Schools" },
                   { value: "Families", label: "Families" },
                   { value: "Churches/Mosques", label: "Churches/Mosques" },
                   { value: "Community Groups", label: "Community Groups" },
                   { value: "Bookstores / Supermarket", label: "Bookstores / Supermarket" },
                   { value: "All of the above", label: "All of the above" },
                   { value: "Others", label: "Others" },
                 ];
                 return (
                   <MultipleSelector
                     defaultOptions={marketOptions}
                     placeholder="Select markets"
                     hidePlaceholderWhenSelected
                   />
                 );
               })()}
             </div>
          </ScrollArea>
        );
      case 3:
        return (
          <ScrollArea className="h-auto overflow-auto px-5 ">
            <h3 className="font-semibold mb-3">SECTION 3: Distribution Capacity & Commitment</h3>
            <Field
              label="How many game units can you start with? (Minimum of 5 Boxes)"
              name="units"
              type="number"
            />
            <div className="space-y-2 mt-4">
               <Label>How soon can you begin distribution if selected?</Label>
               <Select>
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select timeframe" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="Immediately">Immediately</SelectItem>
                   <SelectItem value="Within 7 days">Within 7 days</SelectItem>
                   <SelectItem value="Within 30 days">Within 30 days</SelectItem>
                 </SelectContent>
               </Select>
             </div>
            <div className="space-y-2 mt-4 mb-4">
               <Label>Do you belong to any network, association, or community that could support sales?</Label>
               <Select>
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select option" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="yes">Yes</SelectItem>
                   <SelectItem value="no">No</SelectItem>
                 </SelectContent>
               </Select>
             </div>
            <Field label="If yes, specify" name="networkDetails" />
          </ScrollArea>
        );
      case 4:
        return (
          <ScrollArea className="h-auto overflow-auto px-5">
            <h3 className="font-semibold mb-3">SECTION 4: Digital Engagement & Declaration</h3>
            {/* Digital engagement */}
            <div className="space-y-2 mb-6">
              <Label>Platforms you are active on</Label>
              {(() => {
                const platformOptions: Option[] = [
                  { value: "WhatsApp", label: "WhatsApp" },
                  { value: "Facebook", label: "Facebook" },
                  { value: "Instagram", label: "Instagram" },
                  { value: "Twitter/X", label: "Twitter/X" },
                  { value: "TikTok", label: "TikTok" },
                  { value: "LinkedIn", label: "LinkedIn" },
                ];
                return (
                  <MultipleSelector
                    defaultOptions={platformOptions}
                    placeholder="Select platforms"
                    hidePlaceholderWhenSelected
                  />
                );
              })()}
            </div>

            {/* Declaration */}
            <h3 className="font-semibold mb-3">DECLARATION</h3>
            <p className="text-sm mb-4">
              I hereby declare that the information provided above is true and
              complete to the best of my knowledge. I understand that being a
              Macro Agent involves responsible representation of the National
              Cake brand and that misconduct may result in deactivation.
            </p>
            <Field label="Signature (type your full name)" name="signature" />
            {/* {DatePickerInline("Date")} */}
          </ScrollArea>
        );
      default:
        return null;
    }
  };

  /* ---------------- footer & UI ---------------- */

  const footerContent = (
    <>
      {currentStep > 1 && (
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
      )}
      <Button className="bg-orange-500 text-white" onClick={handleNext}>
        {currentStep === totalSteps ? "Submit" : "Continue"}
      </Button>
    </>
  );

  return (
    <>
      <DialogContainer
        open={open && !showSuccessAlert}
        onOpenChange={onOpenChange}
        title={`Agent Form: ${stepTitles[currentStep - 1]}`}
        description={stepDescriptions[currentStep - 1]}
        footerContent={footerContent}
        stepIndicators={
          <StepperBar
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            totalSteps={totalSteps}
          />
        }
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </DialogContainer>

      {/* success dialog */}
      <SuccessAlertDialog
        open={showSuccessAlert}
        onOpenChange={setShowSuccessAlert}
        onConfirm={handleCloseSuccess}
      />
    </>
  );
}

/* -------------------- Step Indicators -------------------- */

function StepperBar({ currentStep, setCurrentStep, totalSteps }: any) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="w-full">
      <Stepper value={currentStep} onValueChange={setCurrentStep}>
        {steps.map((step) => (
          <StepperItem key={step} step={step} className="not-last:flex-1">
            <StepperTrigger asChild>
              <StepperIndicator />
            </StepperTrigger>
            {step < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}

/* -------------------- Success Dialog -------------------- */

function SuccessAlertDialog({ open, onOpenChange, onConfirm }: any) {
  return (
    <DialogContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Success!"
      description="Application submitted successfully"
      showFooter
      footerContent={
        <Button className="bg-green-600 text-white" onClick={onConfirm}>
          Continue
        </Button>
      }
    >
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="w-16 h-16 mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-center">
          Application Submitted!
        </h3>
        <p className="text-sm text-gray-500 text-center px-8">
          Thank you for applying to become a Macro Agent. We will review your
          submission and get back to you shortly.
        </p>
      </div>
    </DialogContainer>
  );
}

export default AgentStepperDialog;
