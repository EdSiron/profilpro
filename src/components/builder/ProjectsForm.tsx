"use client";
import { useState } from "react";
import { useResume } from "@/store/resumeStore";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import SectionCard from "@/components/ui/SectionCard";
import { Plus, Trash2, FolderOpen, X } from "lucide-react";

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const addTech = (projectId: string, tech: string) => {
    const trimmed = tech.trim();
    if (!trimmed) return;
    const project = resumeData.projects.find((p) => p.id === projectId);
    if (!project || project.techStack.includes(trimmed)) return;
    updateProject(projectId, { techStack: [...project.techStack, trimmed] });
    setTechInputs((prev) => ({ ...prev, [projectId]: "" }));
  };

  const removeTech = (projectId: string, tech: string) => {
    const project = resumeData.projects.find((p) => p.id === projectId);
    if (!project) return;
    updateProject(projectId, {
      techStack: project.techStack.filter((t) => t !== tech),
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {resumeData.projects.length === 0 && (
        <div
          style={{
            borderRadius: "16px",
            border: "2px dashed #e2e8f0",
            padding: "40px 24px",
            textAlign: "center",
          }}
        >
          <FolderOpen
            size={32}
            style={{ color: "#94a3b8", margin: "0 auto 12px" }}
          />
          <p className="text-sm font-medium" style={{ color: "#64748b" }}>
            No projects added yet
          </p>
          <p className="text-xs mt-1 mb-4" style={{ color: "#94a3b8" }}>
            Projects demonstrate real-world skills to recruiters
          </p>
          <Button variant="secondary" onClick={addProject}>
            <Plus size={16} /> Add Project
          </Button>
        </div>
      )}

      {resumeData.projects.map((project, index) => (
        <SectionCard
          key={project.id}
          title={`Project ${index + 1}`}
          description={project.name || "Fill in your project details"}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Project name + link — stack on mobile */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "16px",
              }}
              className="sm:grid-cols-2"
            >
              <Input
                label="Project Name"
                placeholder="e.g. E-Commerce Platform"
                required
                value={project.name}
                onChange={(e) =>
                  updateProject(project.id, { name: e.target.value })
                }
              />
              <Input
                label="Project Link"
                placeholder="github.com/yourname/project"
                value={project.link}
                onChange={(e) =>
                  updateProject(project.id, { link: e.target.value })
                }
              />
            </div>

            <Textarea
              label="Description"
              placeholder="Describe what the project does, your role, and the impact..."
              rows={3}
              value={project.description}
              onChange={(e) =>
                updateProject(project.id, { description: e.target.value })
              }
            />

            {/* Tech Stack */}
            <div>
              <label
                className="text-sm font-medium mb-2 block"
                style={{ color: "#0F172A" }}
              >
                Tech Stack
              </label>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "10px",
                  minHeight: "32px",
                }}
              >
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "500",
                      backgroundColor: "rgba(16,185,129,0.08)",
                      color: "#065f46",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    {tech}
                    <button
                      onClick={() => removeTech(project.id, tech)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "inherit",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {project.techStack.length === 0 && (
                  <span className="text-xs italic" style={{ color: "#94a3b8" }}>
                    No technologies added yet
                  </span>
                )}
              </div>

              {/* Tech input */}
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
                  placeholder="e.g. React, Node.js..."
                  value={techInputs[project.id] || ""}
                  onChange={(e) =>
                    setTechInputs((prev) => ({
                      ...prev,
                      [project.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTech(project.id, techInputs[project.id] || "");
                    }
                  }}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    addTech(project.id, techInputs[project.id] || "")
                  }
                >
                  <Plus size={14} />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </div>
            </div>

            {/* Remove button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "8px",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 size={14} /> Remove Project
              </Button>
            </div>
          </div>
        </SectionCard>
      ))}

      {resumeData.projects.length > 0 && (
        <Button variant="secondary" onClick={addProject}>
          <Plus size={16} /> Add Another Project
        </Button>
      )}
    </div>
  );
}
