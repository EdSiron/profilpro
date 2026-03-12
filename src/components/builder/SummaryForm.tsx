"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useResume } from "@/store/resumeStore";
import Textarea from "@/components/ui/Textarea";
import SectionCard from "@/components/ui/SectionCard";

export default function SummaryForm() {
  const { resumeData, updateSummary } = useResume();
  const { register, watch } = useForm({
    defaultValues: { summary: resumeData.summary },
  });

  const value = watch("summary");

  useEffect(() => {
    updateSummary(value);
  }, [value]);

  return (
    <SectionCard
      title="Professional Summary"
      description="2-4 sentences about your background, skills, and career goals. Use keywords from the job posting."
    >
      <Textarea
        label="Summary"
        placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud platforms."
        rows={5}
        hint={`${value?.length ?? 0} characters — aim for 300-600`}
        {...register("summary")}
      />

      {/* ATS Tips */}
      <div
        className="mt-4 p-3 sm:p-4 rounded-xl border"
        style={{
          backgroundColor: "rgba(59,130,246,0.04)",
          borderColor: "rgba(59,130,246,0.15)",
        }}
      >
        <p
          className="text-xs font-semibold mb-2"
          style={{ color: "#3B82F6" }}
        >
          💡 ATS Tips for your Summary
        </p>
        <ul className="text-xs space-y-1.5" style={{ color: "#64748b" }}>
          <li>• Mirror keywords directly from the job description</li>
          <li>• Include your job title and years of experience</li>
          <li>• Mention 2-3 core technical skills</li>
          <li>• Avoid pronouns like "I" or "my"</li>
        </ul>
      </div>
    </SectionCard>
  );
}