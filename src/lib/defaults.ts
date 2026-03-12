import { ResumeData } from "@/types/resume";

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
      id: crypto.randomUUID(),
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
      id: crypto.randomUUID(),
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