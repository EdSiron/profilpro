import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

// ── Disable hyphenation globally ──
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 44,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    lineHeight: 1.35,
  },

  // ── Header ──
  header: {
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 26,
    letterSpacing: 0.5,
    color: "#000000",
    marginBottom: 18,
    textAlign: "center",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    fontSize: 9.5,
    color: "#000000",
  },
  contactItem: {
    fontSize: 9.5,
    color: "#000000",
    fontFamily: "Times-Roman",
    textDecoration: "none",
  },
  contactSep: {
    color: "#666666",
    fontSize: 9.5,
    fontFamily: "Times-Roman",
    marginHorizontal: 3,
  },

  // ── Section ──
  section: {
    marginBottom: 8,
    width: "100%",
  },
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 1,
    marginBottom: 4,
    color: "#000000",
    width: "100%",
  },

  // ── Summary ──
  summaryText: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    textAlign: "justify",
    color: "#000000",
    width: "100%",
    lineHeight: 1.35,
  },

  // ── Experience ──
  entryBlock: {
    marginBottom: 6,
    width: "100%",
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 0,
  },
  entryTitle: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
    color: "#000000",
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 8,
  },
  entryDate: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    color: "#444444",
    textAlign: "right",
    flexShrink: 0,
  },
  entrySubRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 1,
  },
  entrySubtitle: {
    fontFamily: "Times-Italic",
    fontSize: 10,
    color: "#333333",
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 8,
  },
  entryGpa: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    color: "#444444",
    flexShrink: 0,
  },

  // ── Bullets ──
  bulletList: {
    marginLeft: 12,
    marginTop: 2,
    width: "97%",
  },
  bullet: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    marginBottom: 1,
    color: "#000000",
    flexWrap: "wrap",
    textAlign: "justify",
  },

  // ── Skills ──
  skillRow: {
    flexDirection: "row",
    marginBottom: 2,
    width: "100%",
    flexWrap: "wrap",
  },
  skillLabel: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
    flexShrink: 0,
  },
  skillValue: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    flex: 1,
    flexWrap: "wrap",
  },

  // ── Certifications ──
  certRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
    width: "100%",
  },
  certLeft: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 8,
  },
  certName: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
  },
  certIssuer: {
    fontFamily: "Times-Italic",
    fontSize: 10.5,
    color: "#333333",
  },
  certDate: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    color: "#444444",
    flexShrink: 0,
    textAlign: "right",
  },

  // ── Projects ──
  projectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 0,
  },
  projectName: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 8,
  },
  projectLink: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    color: "#555555",
    flexShrink: 0,
    textDecoration: "none",
  },
  projectTech: {
    fontFamily: "Times-Italic",
    fontSize: 9.5,
    color: "#444444",
    marginBottom: 1,
    flexWrap: "wrap",
    width: "100%",
  },
  projectDesc: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    color: "#000000",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 1,
    textAlign: "justify",
  },
});

// ── Section wrapper ──
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

// ── Contact items builder ──
function buildContactItems(personalInfo: ResumeData["personalInfo"]) {
  const items: { value: string; href?: string }[] = [];
  if (personalInfo.email)
    items.push({
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    });
  if (personalInfo.phone) items.push({ value: personalInfo.phone });
  if (personalInfo.location) items.push({ value: personalInfo.location });
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

export default function ResumePDF({ data }: { data: ResumeData }) {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    certifications,
    projects,
  } = data;

  const hasSkills =
    skills.technical.length > 0 ||
    skills.soft.length > 0 ||
    skills.languages.length > 0;

  const contactItems = buildContactItems(personalInfo);

  return (
    <Document
      title={`${personalInfo.fullName || "Resume"} - Resume`}
      author={personalInfo.fullName}
      subject="Professional Resume"
      keywords="resume, cv, professional"
      creator="ProfilPro"
    >
      <Page size="A4" style={styles.page}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.fullName || "Your Full Name"}
          </Text>
          <View style={styles.contactRow}>
            {/* Split contacts into 2 rows of 3 */}
            {[contactItems.slice(0, 3), contactItems.slice(3)].map(
              (rowItems, rowIndex) =>
                rowItems.length > 0 && (
                  <View
                    key={rowIndex}
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: 1,
                    }}
                  >
                    {rowItems.map((item, index) => (
                      <View
                        key={index}
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {index > 0 && <Text style={styles.contactSep}>|</Text>}
                        {item.href ? (
                          <Link src={item.href} style={styles.contactItem}>
                            {item.value}
                          </Link>
                        ) : (
                          <Text style={styles.contactItem}>{item.value}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                ),
            )}
          </View>
        </View>

        {/* ── Summary ── */}
        {summary && (
          <Section title="PROFESSIONAL SUMMARY">
            <View style={{ width: "100%", flexDirection: "column" }}>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          </Section>
        )}

        {/* ── Experience ── */}
        {experience.some((e) => e.jobTitle || e.company) && (
          <Section title="WORK EXPERIENCE">
            {experience.map((exp) => {
              if (!exp.jobTitle && !exp.company) return null;
              return (
                <View key={exp.id} style={styles.entryBlock}>
                  <View style={styles.entryRow}>
                    <Text style={styles.entryTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.entryDate}>
                      {formatDate(exp.startDate)}
                      {" - "}
                      {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  <View style={styles.entrySubRow}>
                    <Text style={styles.entrySubtitle}>
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </Text>
                  </View>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <View style={styles.bulletList}>
                      {exp.bullets.filter(Boolean).map((bullet, i) => (
                        <Text key={i} style={styles.bullet}>
                          {"• "}
                          {bullet}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
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
                <View key={edu.id} style={styles.entryBlock}>
                  <View style={styles.entryRow}>
                    <Text style={styles.entryTitle}>
                      {edu.degree}
                      {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                    </Text>
                    <Text style={styles.entryDate}>
                      {formatDate(edu.graduationDate)}
                    </Text>
                  </View>
                  <View style={styles.entrySubRow}>
                    <Text style={styles.entrySubtitle}>
                      {edu.institution}
                      {edu.location ? ` · ${edu.location}` : ""}
                    </Text>
                    {edu.gpa && (
                      <Text style={styles.entryGpa}>GPA: {edu.gpa}</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </Section>
        )}

        {/* ── Skills ── */}
        {hasSkills && (
          <Section title="SKILLS">
            {skills.technical.length > 0 && (
              <View style={styles.skillRow}>
                <Text style={styles.skillLabel}>Technical: </Text>
                <Text style={styles.skillValue}>
                  {skills.technical.join(", ")}
                </Text>
              </View>
            )}
            {skills.soft.length > 0 && (
              <View style={styles.skillRow}>
                <Text style={styles.skillLabel}>Soft Skills: </Text>
                <Text style={styles.skillValue}>{skills.soft.join(", ")}</Text>
              </View>
            )}
            {skills.languages.length > 0 && (
              <View style={styles.skillRow}>
                <Text style={styles.skillLabel}>Languages: </Text>
                <Text style={styles.skillValue}>
                  {skills.languages.join(", ")}
                </Text>
              </View>
            )}
          </Section>
        )}

        {/* ── Certifications ── */}
        {certifications.length > 0 && (
          <Section title="CERTIFICATIONS">
            {certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <View style={styles.certLeft}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {cert.issuer && (
                    <Text style={styles.certIssuer}> · {cert.issuer}</Text>
                  )}
                </View>
                {cert.dateObtained && (
                  <Text style={styles.certDate}>
                    {formatDate(cert.dateObtained)}
                  </Text>
                )}
              </View>
            ))}
          </Section>
        )}

        {/* ── Projects ── */}
        {projects.length > 0 && (
          <Section title="PROJECTS">
            {projects.map((project) => (
              <View key={project.id} style={styles.entryBlock}>
                <View style={styles.projectRow}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  {project.link && (
                    <Link
                      src={`https://${project.link.replace(
                        /^https?:\/\//,
                        "",
                      )}`}
                      style={styles.projectLink}
                    >
                      {project.link}
                    </Link>
                  )}
                </View>
                {project.techStack.length > 0 && (
                  <Text style={styles.projectTech}>
                    {project.techStack.join(", ")}
                  </Text>
                )}
                {project.description && (
                  <View style={styles.bulletList}>
                    {project.description
                      .split(/\n+/)
                      .filter(Boolean)
                      .map((line, i) => (
                        <Text key={i} style={styles.bullet}>
                          {"• "}
                          {line.trim()}
                        </Text>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </Section>
        )}
      </Page>
    </Document>
  );
}
