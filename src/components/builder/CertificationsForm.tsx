"use client";
import { useResume } from "@/store/resumeStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SectionCard from "@/components/ui/SectionCard";
import { Plus, Trash2, Award } from "lucide-react";

export default function CertificationsForm() {
  const {
    resumeData,
    addCertification,
    updateCertification,
    removeCertification,
  } = useResume();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {resumeData.certifications.length === 0 && (
        <div
          style={{
            borderRadius: "16px",
            border: "2px dashed #e2e8f0",
            padding: "40px 24px",
            textAlign: "center",
          }}
        >
          <Award
            size={32}
            style={{ color: "#94a3b8", margin: "0 auto 12px" }}
          />
          <p
            className="text-sm font-medium"
            style={{ color: "#64748b" }}
          >
            No certifications added yet
          </p>
          <p
            className="text-xs mt-1 mb-4"
            style={{ color: "#94a3b8" }}
          >
            Certifications boost your ATS score significantly
          </p>
          <Button variant="secondary" onClick={addCertification}>
            <Plus size={16} /> Add Certification
          </Button>
        </div>
      )}

      {resumeData.certifications.map((cert, index) => (
        <SectionCard
          key={cert.id}
          title={`Certification ${index + 1}`}
          description={cert.name || "Fill in your certification details"}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Input
              label="Certification Name"
              placeholder="e.g. AWS Certified Solutions Architect"
              required
              value={cert.name}
              onChange={(e) =>
                updateCertification(cert.id, { name: e.target.value })
              }
            />

            {/* Stack on mobile, side by side on sm+ */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gap: "16px",
              }}
              className="sm:grid-cols-2"
            >
              <Input
                label="Issuing Organization"
                placeholder="e.g. Amazon Web Services"
                value={cert.issuer}
                onChange={(e) =>
                  updateCertification(cert.id, { issuer: e.target.value })
                }
              />
              <Input
                label="Date Obtained"
                type="month"
                value={cert.dateObtained}
                onChange={(e) =>
                  updateCertification(cert.id, { dateObtained: e.target.value })
                }
              />
            </div>

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
                onClick={() => removeCertification(cert.id)}
              >
                <Trash2 size={14} /> Remove
              </Button>
            </div>
          </div>
        </SectionCard>
      ))}

      {resumeData.certifications.length > 0 && (
        <Button variant="secondary" onClick={addCertification}>
          <Plus size={16} /> Add Another Certification
        </Button>
      )}
    </div>
  );
}