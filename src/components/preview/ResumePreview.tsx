"use client";
import { useResume } from "@/store/resumeStore";
import { formatDate } from "@/lib/utils";

const A4_WIDTH = 595;
const A4_HEIGHT = 842;

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

  const contactItems = buildContactItems(personalInfo);
  const hasSkills =
    skills.technical.length > 0 ||
    skills.soft.length > 0 ||
    skills.languages.length > 0;

  return (
    <div
      id="resume-preview"
      style={{
        width: `${A4_WIDTH}px`,
        minHeight: `${A4_HEIGHT}px`,
        backgroundColor: "#fff",
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: "10.5px",
        lineHeight: "1.35",
        color: "#000000",
        paddingTop: "32px",
        paddingBottom: "32px",
        paddingLeft: "44px",
        paddingRight: "44px",
        boxSizing: "border-box",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        {/* Name */}
        <div
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontWeight: "700",
            fontSize: "20px",
            letterSpacing: "0.5px",
            color: "#000000",
            marginBottom: "4px",
          }}
        >
          {personalInfo.fullName || "Your Full Name"}
        </div>

        {/* Contact — row 1: first 3 items */}
        {[contactItems.slice(0, 3), contactItems.slice(3)].map(
          (rowItems, rowIndex) =>
            rowItems.length > 0 && (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "9.5px",
                  color: "#000000",
                  marginBottom: "1px",
                  fontFamily: "'Times New Roman', Times, serif",
                }}
              >
                {rowItems.map((item, index) => (
                  <span
                    key={index}
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    {index > 0 && (
                      <span
                        style={{
                          color: "#666666",
                          marginLeft: "3px",
                          marginRight: "3px",
                        }}
                      >
                        |
                      </span>
                    )}
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#000000",
                          textDecoration: "none",
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </span>
                ))}
              </div>
            )
        )}
      </div>

      {/* ── Summary ── */}
      {summary && (
        <Section title="PROFESSIONAL SUMMARY">
          <p
            style={{
              margin: 0,
              textAlign: "justify",
              width: "100%",
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "10.5px",
              lineHeight: "1.35",
              color: "#000000",
            }}
          >
            {summary}
          </p>
        </Section>
      )}

      {/* ── Experience ── */}
      {experience.some((e) => e.jobTitle || e.company) && (
        <Section title="WORK EXPERIENCE">
          {experience.map((exp) => {
            if (!exp.jobTitle && !exp.company) return null;
            return (
              <div key={exp.id} style={{ marginBottom: "6px", width: "100%" }}>
                {/* Title + Date */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "700",
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "10.5px",
                      flex: 1,
                      paddingRight: "8px",
                    }}
                  >
                    {exp.jobTitle}
                  </span>
                  <span
                    style={{
                      fontSize: "9.5px",
                      color: "#444444",
                      flexShrink: 0,
                    }}
                  >
                    {formatDate(exp.startDate)}
                    {" - "}
                    {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>

                {/* Company + Location */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1px",
                  }}
                >
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "#333333",
                      fontSize: "10px",
                      flex: 1,
                      paddingRight: "8px",
                    }}
                  >
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </span>
                </div>

                {/* Bullets */}
                {exp.bullets.filter(Boolean).length > 0 && (
                  <div
                    style={{
                      marginLeft: "12px",
                      marginTop: "2px",
                      width: "97%",
                    }}
                  >
                    {exp.bullets.filter(Boolean).map((bullet, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: "10.5px",
                          marginBottom: "1px",
                          color: "#000000",
                          textAlign: "justify",
                          fontFamily: "'Times New Roman', Times, serif",
                        }}
                      >
                        {"• "}{bullet}
                      </div>
                    ))}
                  </div>
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
              <div key={edu.id} style={{ marginBottom: "6px", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "700",
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "10.5px",
                      flex: 1,
                      paddingRight: "8px",
                    }}
                  >
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </span>
                  <span
                    style={{
                      fontSize: "9.5px",
                      color: "#444444",
                      flexShrink: 0,
                    }}
                  >
                    {formatDate(edu.graduationDate)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1px",
                  }}
                >
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "#333333",
                      fontSize: "10px",
                      flex: 1,
                      paddingRight: "8px",
                    }}
                  >
                    {edu.institution}
                    {edu.location ? ` · ${edu.location}` : ""}
                  </span>
                  {edu.gpa && (
                    <span
                      style={{ fontSize: "9.5px", color: "#444444", flexShrink: 0 }}
                    >
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
      {hasSkills && (
        <Section title="SKILLS">
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%" }}>
            {skills.technical.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontWeight: "700",
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "10.5px",
                    flexShrink: 0,
                  }}
                >
                  Technical:{" "}
                </span>
                <span style={{ fontSize: "10.5px" }}>
                  {skills.technical.join(", ")}
                </span>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontWeight: "700",
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "10.5px",
                    flexShrink: 0,
                  }}
                >
                  Soft Skills:{" "}
                </span>
                <span style={{ fontSize: "10.5px" }}>
                  {skills.soft.join(", ")}
                </span>
              </div>
            )}
            {skills.languages.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontWeight: "700",
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "10.5px",
                    flexShrink: 0,
                  }}
                >
                  Languages:{" "}
                </span>
                <span style={{ fontSize: "10.5px" }}>
                  {skills.languages.join(", ")}
                </span>
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
                alignItems: "flex-start",
                marginBottom: "2px",
                width: "100%",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  paddingRight: "8px",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "10.5px",
                  }}
                >
                  {cert.name}
                </span>
                {cert.issuer && (
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "#333333",
                      fontSize: "10.5px",
                    }}
                  >
                    {" "}· {cert.issuer}
                  </span>
                )}
              </div>
              {cert.dateObtained && (
                <span
                  style={{
                    fontSize: "9.5px",
                    color: "#444444",
                    flexShrink: 0,
                    textAlign: "right",
                  }}
                >
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
            <div key={project.id} style={{ marginBottom: "6px", width: "100%" }}>
              {/* Name + Link */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "10.5px",
                    flex: 1,
                    paddingRight: "8px",
                  }}
                >
                  {project.name}
                </span>
                {project.link && (
                  <a
                    href={`https://${project.link.replace(/^https?:\/\//, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "9.5px",
                      color: "#555555",
                      flexShrink: 0,
                      textDecoration: "none",
                    }}
                  >
                    {project.link}
                  </a>
                )}
              </div>

              {/* Tech Stack */}
              {project.techStack.length > 0 && (
                <div
                  style={{
                    fontStyle: "italic",
                    fontSize: "9.5px",
                    color: "#444444",
                    marginBottom: "1px",
                  }}
                >
                  {project.techStack.join(", ")}
                </div>
              )}

              {/* Description as bullets — split by newline */}
              {project.description && (
                <div
                  style={{
                    marginLeft: "12px",
                    marginTop: "2px",
                    width: "97%",
                  }}
                >
                  {project.description
                    .split(/\n+/)
                    .filter(Boolean)
                    .map((line, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: "10.5px",
                          marginBottom: "1px",
                          color: "#000000",
                          textAlign: "justify",
                          fontFamily: "'Times New Roman', Times, serif",
                        }}
                      >
                        {"• "}{line.trim()}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

// ── Contact items builder ──
function buildContactItems(
  personalInfo: ReturnType<typeof useResume>["resumeData"]["personalInfo"]
): { value: string; href?: string }[] {
  const items: { value: string; href?: string }[] = [];
  if (personalInfo.email)
    items.push({ value: personalInfo.email, href: `mailto:${personalInfo.email}` });
  if (personalInfo.phone)
    items.push({ value: personalInfo.phone });
  if (personalInfo.location)
    items.push({ value: personalInfo.location });
  if (personalInfo.linkedIn)
    items.push({
      value: personalInfo.linkedIn,
      href: `https://${personalInfo.linkedIn.replace(/^https?:\/\//, "")}`,
    });
  if (personalInfo.github)
    items.push({
      value: personalInfo.github,
      href: `https://${personalInfo.github.replace(/^https?:\/\//, "")}`,
    });
  if (personalInfo.website)
    items.push({
      value: personalInfo.website,
      href: `https://${personalInfo.website.replace(/^https?:\/\//, "")}`,
    });
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
    <div style={{ marginBottom: "8px", width: "100%" }}>
      <div
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "10.5px",
          fontWeight: "700",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          borderBottom: "1px solid #000000",
          paddingBottom: "1px",
          marginBottom: "4px",
          color: "#000000",
          width: "100%",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}