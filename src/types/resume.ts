// ── Personal Info ──────────────────────────────────────
export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    github: string;
    website: string;
  }
  
  // ── Work Experience ────────────────────────────────────
  export interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    bullets: string[]; // e.g. "Increased sales by 30% using..."
  }
  
  // ── Education ──────────────────────────────────────────
  export interface Education {
    id: string;
    degree: string;
    fieldOfStudy: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa: string;
  }
  
  // ── Certifications ─────────────────────────────────────
  export interface Certification {
    id: string;
    name: string;
    issuer: string;
    dateObtained: string;
  }
  
  // ── Projects ───────────────────────────────────────────
  export interface Project {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    link: string;
  }
  
  // ── Skills ─────────────────────────────────────────────
  export interface Skills {
    technical: string[];   // e.g. ["React", "TypeScript", "Node.js"]
    soft: string[];        // e.g. ["Leadership", "Communication"]
    languages: string[];   // e.g. ["English (Fluent)", "Spanish (Basic)"]
  }
  
  // ── Full Resume ────────────────────────────────────────
  export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: Skills;
    certifications: Certification[];
    projects: Project[];
  }
  
  // ── Form Steps ─────────────────────────────────────────
  export type FormStep =
    | "personal"
    | "summary"
    | "experience"
    | "education"
    | "skills"
    | "certifications"
    | "projects"
    | "preview";