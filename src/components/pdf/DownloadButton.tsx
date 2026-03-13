"use client";
import { useState } from "react";
import { useResume } from "@/store/resumeStore";
import { Download, Loader2 } from "lucide-react";

export default function DownloadButton() {
  const { resumeData } = useResume();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const [{ pdf }, { default: ResumePDF }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ResumePDF"),
      ]);

      const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();

      const fileName = resumeData.personalInfo.fullName
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`
        : "ProfilPro_Resume.pdf";

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#0F172A" }}
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            <span className="hidden sm:inline">Generating...</span>
            <span className="sm:hidden">...</span>
          </>
        ) : (
          <>
            <Download size={14} />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </>
        )}
      </button>

      <span
        className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
        style={{
          backgroundColor: "rgba(16,185,129,0.08)",
          color: "#065f46",
          border: "1px solid rgba(16,185,129,0.2)",
        }}
      >
        ✓ ATS Optimized
      </span>
    </div>
  );
}
