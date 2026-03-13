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
  { ssr: false },
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
const A4_WIDTH = 595;

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
      const w = (containerRef.current.offsetWidth - 32) * 0.9;
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
                minHeight: `${842 * finalScale}px`,
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
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 665 607"
              >
                <g>
                  <path
                    d="M 373.50 543.01 C331.15,542.73 295.94,542.14 295.25,541.69 C293.15,540.33 293.83,537.75 297.80,532.00 C299.90,528.97 302.60,524.44 303.81,521.92 C305.03,519.39 307.18,516.24 308.61,514.92 C310.03,513.59 312.11,510.70 313.22,508.50 C314.33,506.30 316.70,502.70 318.48,500.50 C320.26,498.30 322.04,495.48 322.43,494.22 C322.83,492.97 324.92,489.90 327.09,487.40 C329.26,484.89 331.76,481.42 332.65,479.67 C333.55,477.93 335.56,475.02 337.14,473.22 C338.71,471.41 340.00,469.44 340.00,468.83 C340.00,468.23 341.65,465.44 343.67,462.63 C345.69,459.82 348.62,454.94 350.19,451.77 C351.76,448.60 354.16,445.28 355.52,444.39 C356.89,443.50 358.00,442.28 358.00,441.68 C358.00,440.53 366.25,426.96 373.62,415.99 C376.03,412.40 378.00,409.11 378.00,408.67 C378.00,408.22 379.75,405.75 381.89,403.18 C384.03,400.61 386.55,396.92 387.50,395.00 C388.45,393.08 390.47,390.15 392.00,388.50 C393.53,386.85 396.18,382.80 397.89,379.50 C399.59,376.20 403.23,370.35 405.96,366.50 C408.69,362.65 412.18,357.31 413.71,354.63 C415.25,351.95 418.02,347.71 419.87,345.21 C421.72,342.71 423.87,339.15 424.65,337.30 C425.42,335.46 427.21,332.94 428.62,331.72 C430.04,330.50 432.25,327.44 433.53,324.91 C434.82,322.39 437.47,318.22 439.43,315.65 C441.40,313.08 443.00,310.55 443.00,310.03 C443.00,309.50 444.27,307.59 445.83,305.78 C447.38,303.98 450.16,299.80 452.00,296.50 C455.98,289.38 463.34,278.60 466.86,274.75 C470.02,271.30 471.98,271.30 477.18,274.75 C479.46,276.26 482.33,278.17 483.56,279.00 C486.15,280.73 490.07,283.83 496.86,289.50 C502.48,294.20 512.04,301.60 530.83,315.78 C540.17,322.83 540.82,323.19 542.84,322.55 C545.58,321.68 545.97,319.35 546.01,303.50 C546.03,295.80 546.49,277.80 547.03,263.50 C547.57,249.20 548.43,221.07 548.95,201.00 C549.78,168.93 551.48,133.86 553.79,101.50 C554.48,91.79 554.57,91.50 556.92,91.50 C559.67,91.50 565.80,99.26 571.13,109.50 C572.85,112.80 574.54,115.72 574.88,116.00 C576.58,117.37 579.80,123.04 581.41,127.50 C582.40,130.25 584.50,135.03 586.07,138.13 C587.63,141.22 590.32,148.65 592.03,154.63 C593.75,160.61 596.29,169.32 597.67,174.00 C599.89,181.46 600.21,184.52 600.33,199.00 C600.44,212.03 600.12,216.55 598.80,220.50 C595.77,229.56 594.84,236.32 595.94,241.23 C597.08,246.33 602.50,258.58 604.04,259.52 C604.59,259.86 606.16,262.25 607.53,264.82 C610.72,270.81 611.88,272.67 615.25,277.14 C616.76,279.15 618.00,281.24 618.00,281.78 C618.00,282.33 620.00,285.49 622.44,288.81 C624.88,292.13 627.81,296.66 628.94,298.89 C630.08,301.12 632.36,304.32 634.01,306.01 C636.70,308.76 637.00,309.71 637.00,315.49 C637.00,319.02 636.51,322.94 635.92,324.20 C634.29,327.66 629.11,330.52 621.94,331.93 C612.12,333.86 608.25,336.51 604.55,343.82 C602.93,347.04 602.97,347.43 605.94,356.82 C607.63,362.14 609.00,368.60 609.00,371.18 C609.00,376.15 608.01,377.40 601.10,381.20 C597.09,383.41 597.19,385.35 601.50,389.13 C605.31,392.48 606.18,396.77 603.50,399.00 C602.67,399.68 602.00,400.87 602.00,401.63 C602.00,402.39 600.23,404.25 598.08,405.76 C592.00,410.00 591.79,411.02 592.58,432.00 C593.18,448.14 593.05,451.34 591.58,455.77 C589.45,462.16 582.68,468.41 575.57,470.53 C569.57,472.32 547.74,472.51 536.32,470.88 C532.02,470.26 523.55,469.70 517.50,469.63 C495.96,469.38 487.66,475.03 476.58,497.47 C471.40,507.96 470.62,510.34 469.87,517.92 C468.64,530.42 467.03,540.37 466.07,541.33 C464.80,542.60 457.91,543.98 454.00,543.74 C452.08,543.62 415.85,543.29 373.50,543.01 ZM 19.25 542.34 C17.37,541.58 17.74,539.47 20.32,536.33 C21.59,534.77 23.20,532.09 23.89,530.37 C24.58,528.64 26.51,525.94 28.17,524.37 C29.84,522.79 32.21,519.25 33.44,516.50 C34.68,513.75 36.79,510.15 38.14,508.50 C39.49,506.85 42.13,503.02 44.00,500.00 C45.87,496.98 50.41,490.23 54.08,485.00 C57.75,479.77 61.51,474.00 62.44,472.17 C63.37,470.34 65.64,466.86 67.49,464.44 C69.34,462.02 71.14,459.12 71.50,457.99 C71.86,456.87 73.69,454.27 75.58,452.22 C77.46,450.18 79.29,447.60 79.65,446.50 C80.00,445.40 84.43,438.20 89.50,430.50 C94.56,422.80 99.29,415.38 100.01,414.00 C100.73,412.62 102.54,409.92 104.03,408.00 C105.53,406.08 107.59,402.95 108.62,401.04 C109.66,399.14 112.19,395.32 114.25,392.54 C116.31,389.77 117.99,386.98 118.00,386.34 C118.00,385.70 119.80,382.90 122.00,380.12 C124.20,377.33 126.88,373.50 127.95,371.59 C129.02,369.69 131.27,366.24 132.95,363.92 C134.63,361.60 136.00,359.17 136.00,358.52 C136.00,357.88 137.17,356.26 138.60,354.92 C140.03,353.59 142.55,349.83 144.21,346.56 C145.86,343.30 148.92,338.35 151.00,335.56 C153.07,332.78 155.68,328.70 156.78,326.50 C157.88,324.30 159.78,321.60 161.00,320.50 C162.22,319.40 164.13,316.70 165.25,314.50 C166.36,312.30 170.41,305.79 174.23,300.03 C178.06,294.27 182.09,287.75 183.20,285.53 C184.31,283.31 186.35,280.30 187.72,278.83 C190.21,276.17 193.13,271.76 201.00,258.75 C203.25,255.04 205.63,252.00 206.30,252.00 C208.07,252.00 216.50,260.13 218.27,263.55 C219.11,265.17 221.42,267.97 223.40,269.77 C225.38,271.58 227.00,273.42 227.00,273.88 C227.00,274.34 228.46,276.28 230.25,278.20 C233.86,282.05 243.70,293.83 251.75,303.92 C257.77,311.47 260.98,315.28 267.81,323.00 C270.48,326.02 274.09,330.60 275.83,333.18 C282.73,343.38 285.30,343.69 290.74,334.93 C292.81,331.60 296.19,326.66 298.25,323.96 C300.31,321.27 302.00,318.85 302.00,318.60 C302.00,317.66 309.84,306.38 311.39,305.09 C312.28,304.36 313.00,303.18 313.00,302.47 C313.00,301.77 315.19,297.88 317.86,293.84 C320.53,289.80 324.05,284.48 325.67,282.00 C327.29,279.52 330.70,274.54 333.23,270.92 C337.39,264.98 340.23,260.39 343.41,254.46 C344.01,253.34 345.55,251.09 346.82,249.46 C348.10,247.83 350.58,244.29 352.32,241.59 C354.07,238.89 357.75,233.20 360.50,228.94 C363.25,224.68 367.61,218.04 370.19,214.18 C372.78,210.31 375.99,204.98 377.35,202.33 C378.70,199.67 380.94,196.44 382.32,195.15 C383.71,193.86 385.38,191.51 386.03,189.92 C388.10,184.92 386.75,182.81 379.29,179.38 C367.98,174.18 365.35,173.16 361.59,172.45 C359.60,172.08 357.73,171.37 357.43,170.89 C357.13,170.40 356.01,170.00 354.94,170.00 C353.87,170.00 352.04,169.04 350.87,167.87 C349.70,166.70 346.21,165.08 343.12,164.28 C337.01,162.69 327.39,158.44 326.46,156.93 C325.37,155.18 326.98,152.52 330.49,150.25 C332.41,149.01 334.55,148.00 335.26,148.00 C335.97,148.00 340.14,145.96 344.52,143.46 C348.90,140.96 353.62,138.65 355.00,138.33 C356.37,138.01 359.86,136.20 362.75,134.32 C365.63,132.44 375.08,127.28 383.75,122.85 C392.41,118.43 399.95,114.44 400.50,113.99 C401.05,113.53 403.94,112.21 406.92,111.03 C409.90,109.86 413.69,107.75 415.36,106.35 C418.53,103.69 428.26,99.00 430.62,99.00 C431.38,99.00 432.01,98.66 432.03,98.25 C432.06,97.36 437.06,94.29 446.00,89.67 C458.10,83.43 468.49,77.75 471.00,76.02 C472.38,75.07 474.62,74.02 476.00,73.68 C477.38,73.34 480.98,71.43 484.00,69.42 C487.02,67.42 491.82,64.92 494.66,63.86 C497.49,62.79 501.32,60.84 503.16,59.51 C505.00,58.18 508.52,56.17 511.00,55.04 C513.47,53.90 517.16,52.08 519.20,50.99 C523.76,48.53 526.63,48.45 527.20,50.75 C527.62,52.47 527.30,69.91 525.08,164.00 C523.83,217.36 521.36,267.47 519.84,270.29 C518.97,271.93 518.63,271.99 517.17,270.75 C516.25,269.97 514.02,268.74 512.22,268.03 C510.41,267.31 508.16,265.75 507.22,264.55 C506.27,263.36 503.02,260.78 500.00,258.83 C496.98,256.89 493.60,254.28 492.50,253.04 C491.40,251.81 489.28,250.16 487.78,249.39 C486.29,248.62 480.98,244.39 475.99,239.99 C467.38,232.41 464.88,231.08 462.44,232.77 C461.86,233.17 459.71,236.20 457.66,239.50 C455.62,242.80 453.12,246.62 452.11,248.00 C447.50,254.24 433.25,276.83 432.05,279.79 C431.32,281.60 429.85,283.55 428.78,284.12 C427.71,284.69 426.15,286.79 425.32,288.77 C424.49,290.76 421.94,295.06 419.66,298.32 C417.37,301.59 415.05,304.98 414.50,305.86 C409.08,314.54 399.68,329.01 398.18,331.00 C397.14,332.38 395.58,334.85 394.71,336.50 C393.84,338.15 392.05,340.64 390.73,342.03 C389.41,343.42 387.09,347.02 385.59,350.03 C384.08,353.04 381.89,356.53 380.72,357.79 C379.54,359.04 377.44,362.02 376.04,364.40 C372.54,370.35 358.79,391.64 353.36,399.50 C348.50,406.55 341.28,417.41 338.50,421.86 C325.83,442.15 317.67,454.44 316.29,455.30 C315.58,455.74 315.00,456.66 315.00,457.34 C315.00,458.03 312.18,462.84 308.73,468.04 C305.28,473.25 301.94,478.69 301.30,480.15 C299.71,483.76 293.57,488.32 291.27,487.59 C289.30,486.96 280.50,477.34 277.48,472.50 C276.45,470.85 273.44,467.16 270.80,464.31 C268.16,461.46 266.00,458.68 266.00,458.14 C266.00,457.60 264.31,455.37 262.25,453.17 C260.19,450.97 256.48,446.61 254.00,443.47 C237.63,422.71 228.97,412.23 223.98,407.11 C222.04,405.12 219.83,402.27 219.07,400.77 C217.12,396.92 214.36,396.32 211.41,399.08 C210.09,400.33 209.00,401.71 209.00,402.15 C209.00,402.59 205.91,407.80 202.13,413.72 C198.35,419.65 194.18,426.21 192.88,428.29 C191.57,430.38 188.65,434.65 186.39,437.79 C184.13,440.93 181.50,445.17 180.55,447.20 C179.60,449.24 177.67,452.15 176.26,453.67 C174.85,455.19 172.86,458.25 171.83,460.46 C170.80,462.68 167.94,467.20 165.48,470.50 C163.02,473.80 160.66,477.19 160.25,478.04 C159.84,478.89 158.26,481.37 156.73,483.54 C148.52,495.29 146.84,497.84 144.91,501.50 C143.74,503.70 140.81,508.05 138.40,511.17 C135.98,514.28 134.00,517.21 134.00,517.67 C133.99,518.12 132.31,520.77 130.25,523.55 C128.19,526.32 125.38,530.75 124.00,533.39 C122.62,536.03 120.23,539.28 118.67,540.60 L 115.85 543.00 L 68.17 542.92 C41.95,542.88 19.94,542.62 19.25,542.34 Z"
                    fill="rgba(0,0,0,1)"
                  />
                </g>
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#0F172A",
                  lineHeight: 1,
                }}
                className="hidden sm:block"
              >
                <span className="font-extrabold">Profil</span>Pro
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
