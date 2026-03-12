"use client";
import { useResume } from "@/store/resumeStore";
import { formatDate } from "@/lib/utils";

// A4 dimensions in px at 96dpi: 794 x 1123
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export default function ResumePreview() {
  const { resumeData } = useResume();
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    certifications,
    projects,
  } = resumeData;

  return (
    <div
      id="resume-preview"
      style={{
        width: `${A4_WIDTH}px`,
        minHeight: `${A4_HEIGHT}px`,
        backgroundColor: "#fff",
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "11px",
        lineHeight: "1.5",
        color: "#000",
        padding: "40px 48px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "700",
            fontFamily: "Arial, Helvetica, sans-serif",
            letterSpacing: "0.5px",
            color: "#000",
            margin: "0 0 6px 0",
          }}
        >
          {personalInfo.fullName || "Your Full Name"}
        </h1>

        {/* Contact Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "4px 0",
            fontSize: "10px",
            color: "#333",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {buildContactItems(personalInfo).map((item, index) => (
            <span key={index} style={{ display: "inline-flex", alignItems: "center" }}>
              {index > 0 && (
                <span style={{ color: "#999", margin: "0 6px" }}>|</span>
              )}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Summary ── */}
      {summary && (
        <Section title="PROFESSIONAL SUMMARY">
          <p style={{ margin: 0, textAlign: "justify", width: "100%" }}>{summary}</p>
        </Section>
      )}

      {/* ── Experience ── */}
      {experience.some((e) => e.jobTitle || e.company) && (
        <Section title="WORK EXPERIENCE">
          {experience.map((exp) => {
            if (!exp.jobTitle && !exp.company) return null;
            return (
              <div key={exp.id} style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "700",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "11px",
                    }}
                  >
                    {exp.jobTitle}
                  </span>
                  <span style={{ fontSize: "10px", color: "#444", flexShrink: 0, marginLeft: "8px" }}>
                    {formatDate(exp.startDate)}
                    {" - "}
                    {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "#333",
                      fontSize: "10.5px",
                    }}
                  >
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </span>
                </div>
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                    {exp.bullets.filter(Boolean).map((bullet, i) => (
                      <li key={i} style={{ marginBottom: "2px" }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </Section>
      )}

      {/* ── Education ── */}
      {education.some((e) => e.institution || e.degree) && (
        <Section title="EDUCATION">
          {education.map((edu) => {
            if (!edu.institution && !edu.degree) return null;
            return (
              <div key={edu.id} style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "700",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "11px",
                    }}
                  >
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </span>
                  <span style={{ fontSize: "10px", color: "#444", flexShrink: 0, marginLeft: "8px" }}>
                    {formatDate(edu.graduationDate)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "#333",
                      fontSize: "10.5px",
                    }}
                  >
                    {edu.institution}
                    {edu.location ? ` · ${edu.location}` : ""}
                  </span>
                  {edu.gpa && (
                    <span style={{ fontSize: "10px", color: "#444" }}>
                      GPA: {edu.gpa}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </Section>
      )}

      {/* ── Skills ── */}
      {(skills.technical.length > 0 ||
        skills.soft.length > 0 ||
        skills.languages.length > 0) && (
        <Section title="SKILLS">
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
            {skills.technical.length > 0 && (
              <div>
                <span style={{ fontWeight: "700", fontFamily: "Arial, sans-serif" }}>
                  Technical:{" "}
                </span>
                {skills.technical.join(", ")}
              </div>
            )}
            {skills.soft.length > 0 && (
              <div>
                <span style={{ fontWeight: "700", fontFamily: "Arial, sans-serif" }}>
                  Soft Skills:{" "}
                </span>
                {skills.soft.join(", ")}
              </div>
            )}
            {skills.languages.length > 0 && (
              <div>
                <span style={{ fontWeight: "700", fontFamily: "Arial, sans-serif" }}>
                  Languages:{" "}
                </span>
                {skills.languages.join(", ")}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ── Certifications ── */}
      {certifications.length > 0 && (
        <Section title="CERTIFICATIONS">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <span>
                <span style={{ fontWeight: "700", fontFamily: "Arial, sans-serif" }}>
                  {cert.name}
                </span>
                {cert.issuer && (
                  <span style={{ color: "#333", fontStyle: "italic" }}>
                    {" "}· {cert.issuer}
                  </span>
                )}
              </span>
              {cert.dateObtained && (
                <span style={{ fontSize: "10px", color: "#444", flexShrink: 0, marginLeft: "8px" }}>
                  {formatDate(cert.dateObtained)}
                </span>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── Projects ── */}
      {projects.length > 0 && (
        <Section title="PROJECTS">
          {projects.map((project) => (
            <div key={project.id} style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "11px",
                  }}
                >
                  {project.name}
                </span>
                {project.link && (
                  <span style={{ fontSize: "10px", color: "#555", flexShrink: 0, marginLeft: "8px" }}>
                    {project.link}
                  </span>
                )}
              </div>
              {project.techStack.length > 0 && (
                <span
                  style={{
                    fontSize: "10px",
                    fontStyle: "italic",
                    color: "#444",
                  }}
                >
                  {project.techStack.join(", ")}
                </span>
              )}
              {project.description && (
                <p style={{ margin: "3px 0 0 0" }}>{project.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

// ── Helper: build contact items array ──
function buildContactItems(
  personalInfo: ReturnType<typeof useResume>["resumeData"]["personalInfo"]
): string[] {
  const items: string[] = [];
  if (personalInfo.email) items.push(personalInfo.email);
  if (personalInfo.phone) items.push(personalInfo.phone);
  if (personalInfo.location) items.push(personalInfo.location);
  if (personalInfo.linkedIn) items.push(personalInfo.linkedIn);
  if (personalInfo.github) items.push(personalInfo.github);
  if (personalInfo.website) items.push(personalInfo.website);
  return items;
}

// ── Section component ──
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "14px", width: "100%" }}>
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "11px",
          fontWeight: "700",
          letterSpacing: "1px",
          textTransform: "uppercase",
          borderBottom: "1.5px solid #000",
          paddingBottom: "2px",
          marginBottom: "6px",
          color: "#000",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}