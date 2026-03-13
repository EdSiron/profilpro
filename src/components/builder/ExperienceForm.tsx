"use client";
import { useResume } from "@/store/resumeStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SectionCard from "@/components/ui/SectionCard";
import { Plus, Trash2, GripVertical } from "lucide-react";

export default function ExperienceForm() {
  const {
    resumeData,
    addExperience,
    updateExperience,
    removeExperience,
    addBullet,
    updateBullet,
    removeBullet,
  } = useResume();

  return (
    <div className="flex flex-col gap-4">
      {resumeData.experience.map((exp, expIndex) => (
        <SectionCard
          key={exp.id}
          title={`Experience ${expIndex + 1}`}
          description={exp.company || "Fill in your work experience"}
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Job Title"
                placeholder="e.g. Senior Software Engineer"
                required
                value={exp.jobTitle}
                onChange={(e) =>
                  updateExperience(exp.id, { jobTitle: e.target.value })
                }
              />
              <Input
                label="Company"
                placeholder="e.g. Acme Corp"
                required
                value={exp.company}
                onChange={(e) =>
                  updateExperience(exp.id, { company: e.target.value })
                }
              />
            </div>

            <Input
              label="Location"
              placeholder="e.g. Makati, Philippines / Remote"
              value={exp.location}
              onChange={(e) =>
                updateExperience(exp.id, { location: e.target.value })
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="month"
                value={exp.startDate}
                onChange={(e) =>
                  updateExperience(exp.id, { startDate: e.target.value })
                }
              />
              <div className="flex flex-col gap-1.5">
                <Input
                  label="End Date"
                  type="month"
                  value={exp.endDate}
                  disabled={exp.isCurrent}
                  onChange={(e) =>
                    updateExperience(exp.id, { endDate: e.target.value })
                  }
                />
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={exp.isCurrent}
                    onChange={(e) =>
                      updateExperience(exp.id, {
                        isCurrent: e.target.checked,
                        endDate: "",
                      })
                    }
                    className="w-4 h-4 accent-blue-500"
                  />
                  <span className="text-xs" style={{ color: "#64748b" }}>
                    I currently work here
                  </span>
                </label>
              </div>
            </div>

            {/* Bullet Points */}
            <div>
              <label
                className="text-sm font-medium mb-2 block"
                style={{ color: "#0F172A" }}
              >
                Key Achievements / Responsibilities
              </label>
              <div className="flex flex-col gap-2">
                {exp.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex items-center gap-2">
                    <GripVertical
                      size={16}
                      className="text-slate-300 shrink-0 hidden sm:block"
                    />
                    <input
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                      placeholder='e.g. "Increased performance by 40%..."'
                      value={bullet}
                      onChange={(e) =>
                        updateBullet(exp.id, bulletIndex, e.target.value)
                      }
                    />
                    {exp.bullets.length > 1 && (
                      <button
                        onClick={() => removeBullet(exp.id, bulletIndex)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => addBullet(exp.id)}
              >
                <Plus size={14} /> Add bullet point
              </Button>
              <p className="text-xs mt-2" style={{ color: "#94a3b8" }}>
                💡 Start with an action verb:{" "}
                <em>Led, Built, Improved, Reduced, Launched...</em>
              </p>
            </div>

            {resumeData.experience.length > 1 && (
              <div className="flex justify-end pt-2 border-t border-slate-100">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 size={14} /> Remove Experience
                </Button>
              </div>
            )}
          </div>
        </SectionCard>
      ))}

      <Button variant="secondary" onClick={addExperience}>
        <Plus size={16} /> Add Another Experience
      </Button>
    </div>
  );
}
