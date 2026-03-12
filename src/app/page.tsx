"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useResume } from "@/store/resumeStore";
import StepNav from "@/components/builder/StepNav";
import PersonalInfoForm from "@/components/builder/PersonalInfoForm";
import SummaryForm from "@/components/builder/SummaryForm";
import ExperienceForm from "@/components/builder/ExperienceForm";
import EducationForm from "@/components/builder/EducationForm";
import SkillsForm from "@/components/builder/SkillsForm";
import CertificationsForm from "@/components/builder/CertificationsForm";
import ProjectsForm from "@/components/builder/ProjectsForm";
import ResumePreview from "@/components/preview/ResumePreview";
import Button from "@/components/ui/Button";
import {
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  Menu,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { FormStep } from "@/types/resume";

const DownloadButton = dynamic(
  () => import("@/components/pdf/DownloadButton"),
  { ssr: false }
);

const stepOrder: FormStep[] = [
  "personal",
  "summary",
  "experience",
  "education",
  "skills",
  "certifications",
  "projects",
  "preview",
];

const stepLabels: Record<FormStep, string> = {
  personal: "Personal Info",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  certifications: "Certifications",
  projects: "Projects",
  preview: "Preview & Export",
};

// A4 at 96dpi
const A4_WIDTH = 794;

// ── Mobile Preview Modal ────────────────────────────────
function PreviewModal({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [zoom, setZoom] = useState(0.9);

  useEffect(() => {
    // lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      // modal content width minus padding
      const w = ((containerRef.current.offsetWidth - 32) * 0.9);
      setContainerWidth(w);
    }
  }, []);

  const baseScale = containerWidth / A4_WIDTH;
  const finalScale = baseScale * zoom;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.75)",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        style={{
          margin: "auto",
          width: "calc(100vw - 24px)",
          maxWidth: "860px",
          maxHeight: "calc(100vh - 80px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid #f1f5f9",
            flexShrink: 0,
            backgroundColor: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#0F172A",
              }}
            >
              Resume Preview — A4
            </span>
          </div>

          {/* Zoom controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              style={{
                padding: "6px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ZoomOut size={15} color="#64748b" />
            </button>
            <span
              style={{
                fontSize: "12px",
                color: "#64748b",
                minWidth: "40px",
                textAlign: "center",
              }}
            >
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
              style={{
                padding: "6px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ZoomIn size={15} color="#64748b" />
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "6px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                marginLeft: "4px",
              }}
            >
              <X size={15} color="#64748b" />
            </button>
          </div>
        </div>

        {/* Scrollable preview area */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "auto",
            padding: "16px",
            backgroundColor: "#e2e8f0",
          }}
        >
          {containerWidth > 0 && (
            <div
              style={{
                width: `${A4_WIDTH * finalScale}px`,
                minHeight: `${1123 * finalScale}px`,
                margin: "0 auto",
                boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  transform: `scale(${finalScale})`,
                  transformOrigin: "top left",
                  width: `${A4_WIDTH}px`,
                }}
              >
                <ResumePreview />
              </div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
            backgroundColor: "#fff",
          }}
        >
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>
            Pinch or use zoom controls to resize
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { currentStep, setCurrentStep } = useResume();
  const [showPreview, setShowPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const previewPanelRef = useRef<HTMLDivElement>(null);

  const currentIndex = stepOrder.indexOf(currentStep);
  const canGoBack = currentIndex > 0;
  const canGoNext = currentIndex < stepOrder.length - 1;

  const goNext = () => {
    if (canGoNext) {
      setCurrentStep(stepOrder[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    if (canGoBack) {
      setCurrentStep(stepOrder[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepSelect = (step: FormStep) => {
    setCurrentStep(step);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStep = () => {
    switch (currentStep) {
      case "personal":
        return <PersonalInfoForm />;
      case "summary":
        return <SummaryForm />;
      case "experience":
        return <ExperienceForm />;
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillsForm />;
      case "certifications":
        return <CertificationsForm />;
      case "projects":
        return <ProjectsForm />;
      case "preview":
        return (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #f1f5f9",
            }}
          >
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "18px",
                fontWeight: "600",
                color: "#0F172A",
                margin: "0 0 4px 0",
              }}
            >
              🎉 Your Resume is Ready!
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                margin: "0 0 20px 0",
              }}
            >
              Review the preview, then download your ATS-optimized PDF.
            </p>

            {/* Preview button for mobile */}
            <button
              className="lg:hidden"
              onClick={() => setShowModal(true)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #3B82F6",
                backgroundColor: "rgba(59,130,246,0.05)",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                color: "#3B82F6",
                marginBottom: "16px",
              }}
            >
              <Eye size={16} /> View Resume Preview
            </button>

            {/* Download CTA */}
            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                backgroundColor: "#0F172A",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
                className="sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    Ready to apply?
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      margin: "2px 0 0 0",
                    }}
                  >
                    Your PDF is ATS-safe and ready to send
                  </p>
                </div>
                <DownloadButton />
              </div>
            </div>

            {/* ATS Checklist */}
            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                backgroundColor: "rgba(16,185,129,0.05)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#10B981",
                  margin: "0 0 10px 0",
                }}
              >
                ✅ ATS Compliance Checklist
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "6px",
                }}
              >
                {[
                  "Single-column layout",
                  "Standard fonts only",
                  "No images or graphics",
                  "Clear section headings",
                  "Consistent date format",
                  "Action verb bullet points",
                  "Keywords-rich content",
                  "Clean PDF output",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ color: "#10B981" }}>✓</span>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC" }}>
      {/* ── Mobile Preview Modal ── */}
      {showModal && <PreviewModal onClose={() => setShowModal(false)} />}

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile Sidebar Drawer ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "260px",
          backgroundColor: "#fff",
          zIndex: 50,
          boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: "700",
              fontSize: "15px",
              color: "#0F172A",
            }}
          >
            Resume Sections
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              padding: "6px",
              borderRadius: "8px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            <X size={18} color="#64748b" />
          </button>
        </div>
        <div
          style={{
            padding: "12px",
            overflowY: "auto",
            height: "calc(100% - 60px)",
          }}
        >
          <StepNav onStepClick={handleStepSelect} />
        </div>
      </div>

      {/* ── Header ── */}
      <header
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #f1f5f9",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            <Menu size={20} color="#0F172A" />
          </button>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                backgroundColor: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "11px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                PP
              </span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: "700",
                  fontSize: "16px",
                  color: "#0F172A",
                  lineHeight: 1,
                }}
              >
                ProfilPro
              </div>
              <div
                className="hidden sm:block"
                style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}
              >
                Professional profiles, professionally built
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Desktop preview toggle */}
          <button
            className="hidden lg:flex"
            onClick={() => setShowPreview((v) => !v)}
            style={{
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
              color: "#334155",
            }}
          >
            {showPreview ? <EyeOff size={15} /> : <Eye size={15} />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>

          {/* Mobile preview button */}
          <button
            className="lg:hidden"
            onClick={() => setShowModal(true)}
            style={{
              alignItems: "center",
              gap: "6px",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
              color: "#334155",
            }}
          >
            <Eye size={15} />
            <span className="hidden lg:inline">Preview</span>
          </button>

          <DownloadButton />
        </div>
      </header>

      {/* ── Page Body ── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "24px 16px",
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        {/* Desktop Sidebar */}
        <aside
          className="hidden lg:block"
          style={{
            width: "208px",
            flexShrink: 0,
            backgroundColor: "#fff",
            borderRadius: "16px",
            padding: "16px",
            border: "1px solid #f1f5f9",
            position: "sticky",
            top: "72px",
          }}
        >
          <StepNav onStepClick={handleStepSelect} />
        </aside>

        {/* Center: form */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Mobile step indicator */}
          <div
            className="lg:hidden"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "1px solid #f1f5f9",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                Step {currentIndex + 1} of {stepOrder.length}
              </span>
              <span
                style={{
                  padding: "2px 10px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(59,130,246,0.08)",
                  color: "#3B82F6",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {stepLabels[currentStep]}
              </span>
            </div>
          </div>

          {/* Mobile progress bar */}
          <div
            className="lg:hidden"
            style={{
              width: "100%",
              height: "6px",
              borderRadius: "999px",
              backgroundColor: "#f1f5f9",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: "999px",
                backgroundColor: "#3B82F6",
                width: `${((currentIndex + 1) / stepOrder.length) * 100}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>

          {/* Form content */}
          {renderStep()}

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "32px",
              paddingTop: "4px",
            }}
          >
            <Button variant="secondary" onClick={goBack} disabled={!canGoBack}>
              <ChevronLeft size={16} /> Back
            </Button>
            <Button onClick={goNext} disabled={!canGoNext}>
              Next <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        {/* Desktop live preview panel */}
        {showPreview && (
          <div
            ref={previewPanelRef}
            className="hidden lg:block"
            style={{
              width: "420px",
              flexShrink: 0,
              position: "sticky",
              top: "72px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#10B981",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Live Preview — A4
                </span>
              </div>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#3B82F6",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <ZoomIn size={13} /> Full view
              </button>
            </div>

            {/* Scaled to fit 420px panel */}
            <div
              style={{
                backgroundColor: "#e2e8f0",
                borderRadius: "12px",
                padding: "12px",
                overflowY: "auto",
                maxHeight: "calc(100vh - 120px)",
              }}
            >
              <div
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  width: `${420 - 24}px`,
                  height: `${1123 * ((420 - 24) / A4_WIDTH)}px`,
                }}
              >
                <div
                  style={{
                    transform: `scale(${(420 - 24) / A4_WIDTH})`,
                    transformOrigin: "top left",
                    width: `${A4_WIDTH}px`,
                  }}
                >
                  <ResumePreview />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
