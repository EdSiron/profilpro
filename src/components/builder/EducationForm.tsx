"use client";
import { useResume } from "@/store/resumeStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SectionCard from "@/components/ui/SectionCard";
import { Plus, Trash2 } from "lucide-react";

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } =
    useResume();

  return (
    <div className="flex flex-col gap-4">
      {resumeData.education.map((edu, index) => (
        <SectionCard
          key={edu.id}
          title={`Education ${index + 1}`}
          description={edu.institution || "Fill in your educational background"}
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Degree"
                placeholder="e.g. Bachelor of Science"
                required
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
              />
              <Input
                label="Field of Study"
                placeholder="e.g. Computer Science"
                required
                value={edu.fieldOfStudy}
                onChange={(e) =>
                  updateEducation(edu.id, { fieldOfStudy: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Institution"
                placeholder="e.g. University of the Philippines"
                required
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(edu.id, { institution: e.target.value })
                }
              />
              <Input
                label="Location"
                placeholder="e.g. Quezon City, Philippines"
                value={edu.location}
                onChange={(e) =>
                  updateEducation(edu.id, { location: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Graduation Date"
                type="month"
                value={edu.graduationDate}
                onChange={(e) =>
                  updateEducation(edu.id, { graduationDate: e.target.value })
                }
              />
              <Input
                label="GPA (Optional)"
                placeholder="e.g. 3.8 / 4.0"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
              />
            </div>

            {resumeData.education.length > 1 && (
              <div className="flex justify-end pt-2 border-t border-slate-100">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 size={14} /> Remove Education
                </Button>
              </div>
            )}
          </div>
        </SectionCard>
      ))}

      <Button variant="secondary" onClick={addEducation}>
        <Plus size={16} /> Add Another Education
      </Button>
    </div>
  );
}