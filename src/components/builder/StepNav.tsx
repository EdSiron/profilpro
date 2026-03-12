"use client";
import { useResume } from "@/store/resumeStore";
import { FormStep } from "@/types/resume";
import { cn } from "@/lib/utils";
import {
  User, FileText, Briefcase, GraduationCap,
  Wrench, Award, FolderOpen, Eye
} from "lucide-react";

const steps: { id: FormStep; label: string; icon: React.ReactNode }[] = [
  { id: "personal",       label: "Personal Info",    icon: <User size={16} /> },
  { id: "summary",        label: "Summary",          icon: <FileText size={16} /> },
  { id: "experience",     label: "Experience",       icon: <Briefcase size={16} /> },
  { id: "education",      label: "Education",        icon: <GraduationCap size={16} /> },
  { id: "skills",         label: "Skills",           icon: <Wrench size={16} /> },
  { id: "certifications", label: "Certifications",   icon: <Award size={16} /> },
  { id: "projects",       label: "Projects",         icon: <FolderOpen size={16} /> },
  { id: "preview",        label: "Preview & Export", icon: <Eye size={16} /> },
];

interface StepNavProps {
  onStepClick?: (step: FormStep) => void;
}

export default function StepNav({ onStepClick }: StepNavProps) {
  const { currentStep, setCurrentStep } = useResume();

  const handleClick = (stepId: FormStep) => {
    setCurrentStep(stepId);
    onStepClick?.(stepId);
  };

  return (
    <nav className="flex flex-col gap-1">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isPast =
          steps.findIndex((s) => s.id === currentStep) > index;

        return (
          <button
            key={step.id}
            onClick={() => handleClick(step.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left w-full",
              isActive
                ? "text-white shadow-sm"
                : isPast
                ? "text-green-700 bg-green-50 hover:bg-green-100"
                : "text-slate-500 hover:bg-slate-100"
            )}
            style={isActive ? { backgroundColor: "#0F172A" } : {}}
          >
            <span
              className={cn(
                isActive
                  ? "text-blue-400"
                  : isPast
                  ? "text-green-500"
                  : "text-slate-400"
              )}
            >
              {isPast ? "✓" : step.icon}
            </span>
            {step.label}
          </button>
        );
      })}
    </nav>
  );
}