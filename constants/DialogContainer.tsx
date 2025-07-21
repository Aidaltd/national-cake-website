"use client";

import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface DialogContainerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  stepIndicators?: React.ReactNode; // New prop for step indicators
}

export default function DialogContainer({
  children,
  open,
  onOpenChange,
  title,
  description,
  showFooter = true,
  footerContent,
  stepIndicators, // Accept step indicators as prop
}: DialogContainerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg p-0 overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="border-b text-base text-start pt-2 pb-1 px-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-gray-600">
              {description}
            </DialogDescription>
          )}
          {/* Render step indicators if provided */}
          {stepIndicators && <div className="flex justify-start w-full items-start">{stepIndicators}</div>}
        </DialogHeader>

        <div className="flex-1">{children}</div>

        {showFooter && (
          <DialogFooter className="flex justify-end gap-2 px-6 py-3 border-t">
            {footerContent}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
