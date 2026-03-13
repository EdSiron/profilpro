import { ResumeData } from "@/types/resume";

function genId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    github: "",
    website: "",
  },
  summary: "",
  experience: [
    {
      id: genId(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      bullets: [""],
    },
  ],
  education: [
    {
      id: genId(),
      degree: "",
      fieldOfStudy: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
    },
  ],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  certifications: [],
  projects: [],
};
