"use client";
import { useState } from "react";
import { useResume } from "@/store/resumeStore";
import Button from "@/components/ui/Button";
import SectionCard from "@/components/ui/SectionCard";
import { Plus, X } from "lucide-react";

type SkillCategory = "technical" | "soft" | "languages";

interface SkillInputProps {
  label: string;
  skills: string[];
  category: SkillCategory;
  placeholder: string;
}

function SkillInput({ label, skills, category, placeholder }: SkillInputProps) {
  const { updateSkills } = useResume();
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    updateSkills({ [category]: [...skills, trimmed] });
    setInput("");
  };

  const removeSkill = (skill: string) => {
    updateSkills({ [category]: skills.filter((s) => s !== skill) });
  };

  return (
    <div>
      <label
        className="text-sm font-medium mb-2 block"
        style={{ color: "#0F172A" }}
      >
        {label}
      </label>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "12px",
          minHeight: "36px",
        }}
      >
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "500",
              backgroundColor: "rgba(59,130,246,0.08)",
              color: "#1e3a6e",
              border: "1px solid rgba(59,130,246,0.2)",
              maxWidth: "100%",
              wordBreak: "break-word",
            }}
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "inherit",
                padding: 0,
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        {skills.length === 0 && (
          <span className="text-xs italic" style={{ color: "#94a3b8" }}>
            No {label.toLowerCase()} added yet
          </span>
        )}
      </div>

      {/* Input row */}
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          style={{
            flex: 1,
            minWidth: 0,
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "14px",
            outline: "none",
            color: "#1e293b",
            backgroundColor: "#fff",
          }}
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
        />
        <Button variant="secondary" size="sm" onClick={addSkill}>
          <Plus size={14} />
          <span className="hidden sm:inline">Add</span>
        </Button>
      </div>
      <p className="text-xs mt-1.5" style={{ color: "#94a3b8" }}>
        Press Enter or click Add
      </p>
    </div>
  );
}

export default function SkillsForm() {
  const { resumeData } = useResume();

  return (
    <SectionCard
      title="Skills"
      description="Add skills that match the job description — ATS scans for exact keyword matches."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <SkillInput
          label="Technical Skills"
          skills={resumeData.skills.technical}
          category="technical"
          placeholder="e.g. React, TypeScript..."
        />
        <div style={{ borderTop: "1px solid #f1f5f9" }} />
        <SkillInput
          label="Soft Skills"
          skills={resumeData.skills.soft}
          category="soft"
          placeholder="e.g. Leadership..."
        />
        <div style={{ borderTop: "1px solid #f1f5f9" }} />
        <SkillInput
          label="Languages"
          skills={resumeData.skills.languages}
          category="languages"
          placeholder="e.g. English (Fluent)..."
        />
      </div>
    </SectionCard>
  );
}
