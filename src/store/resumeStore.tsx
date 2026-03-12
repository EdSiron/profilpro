"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { ResumeData, FormStep, Experience, Education, Certification, Project } from "@/types/resume";
import { defaultResumeData } from "@/lib/defaults";
import { generateId } from "@/lib/utils";

// ── Context Shape ──────────────────────────────────────
interface ResumeContextType {
  resumeData: ResumeData;
  currentStep: FormStep;
  setCurrentStep: (step: FormStep) => void;

  // Personal & Summary
  updatePersonalInfo: (data: Partial<ResumeData["personalInfo"]>) => void;
  updateSummary: (summary: string) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addBullet: (experienceId: string) => void;
  updateBullet: (experienceId: string, index: number, value: string) => void;
  removeBullet: (experienceId: string, index: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Skills
  updateSkills: (data: Partial<ResumeData["skills"]>) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Reset
  resetResume: () => void;
}

// ── Create Context ─────────────────────────────────────
const ResumeContext = createContext<ResumeContextType | null>(null);

// ── Provider ───────────────────────────────────────────
export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [currentStep, setCurrentStep] = useState<FormStep>("personal");

  // Personal Info
  const updatePersonalInfo = useCallback(
    (data: Partial<ResumeData["personalInfo"]>) => {
      setResumeData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, ...data },
      }));
    },
    []
  );

  // Summary
  const updateSummary = useCallback((summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  }, []);

  // Experience
  const addExperience = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: generateId(),
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          bullets: [""],
        },
      ],
    }));
  }, []);

  const updateExperience = useCallback(
    (id: string, data: Partial<Experience>) => {
      setResumeData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) =>
          exp.id === id ? { ...exp, ...data } : exp
        ),
      }));
    },
    []
  );

  const removeExperience = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  }, []);

  const addBullet = useCallback((experienceId: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === experienceId
          ? { ...exp, bullets: [...exp.bullets, ""] }
          : exp
      ),
    }));
  }, []);

  const updateBullet = useCallback(
    (experienceId: string, index: number, value: string) => {
      setResumeData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) => {
          if (exp.id !== experienceId) return exp;
          const bullets = [...exp.bullets];
          bullets[index] = value;
          return { ...exp, bullets };
        }),
      }));
    },
    []
  );

  const removeBullet = useCallback(
    (experienceId: string, index: number) => {
      setResumeData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) => {
          if (exp.id !== experienceId) return exp;
          const bullets = exp.bullets.filter((_, i) => i !== index);
          return { ...exp, bullets };
        }),
      }));
    },
    []
  );

  // Education
  const addEducation = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: generateId(),
          degree: "",
          fieldOfStudy: "",
          institution: "",
          location: "",
          graduationDate: "",
          gpa: "",
        },
      ],
    }));
  }, []);

  const updateEducation = useCallback(
    (id: string, data: Partial<Education>) => {
      setResumeData((prev) => ({
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === id ? { ...edu, ...data } : edu
        ),
      }));
    },
    []
  );

  const removeEducation = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  }, []);

  // Skills
  const updateSkills = useCallback(
    (data: Partial<ResumeData["skills"]>) => {
      setResumeData((prev) => ({
        ...prev,
        skills: { ...prev.skills, ...data },
      }));
    },
    []
  );

  // Certifications
  const addCertification = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { id: generateId(), name: "", issuer: "", dateObtained: "" },
      ],
    }));
  }, []);

  const updateCertification = useCallback(
    (id: string, data: Partial<Certification>) => {
      setResumeData((prev) => ({
        ...prev,
        certifications: prev.certifications.map((cert) =>
          cert.id === id ? { ...cert, ...data } : cert
        ),
      }));
    },
    []
  );

  const removeCertification = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  }, []);

  // Projects
  const addProject = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: generateId(),
          name: "",
          description: "",
          techStack: [],
          link: "",
        },
      ],
    }));
  }, []);

  const updateProject = useCallback(
    (id: string, data: Partial<Project>) => {
      setResumeData((prev) => ({
        ...prev,
        projects: prev.projects.map((proj) =>
          proj.id === id ? { ...proj, ...data } : proj
        ),
      }));
    },
    []
  );

  const removeProject = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  }, []);

  // Reset
  const resetResume = useCallback(() => {
    setResumeData(defaultResumeData);
    setCurrentStep("personal");
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        currentStep,
        setCurrentStep,
        updatePersonalInfo,
        updateSummary,
        addExperience,
        updateExperience,
        removeExperience,
        addBullet,
        updateBullet,
        removeBullet,
        addEducation,
        updateEducation,
        removeEducation,
        updateSkills,
        addCertification,
        updateCertification,
        removeCertification,
        addProject,
        updateProject,
        removeProject,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

// ── Custom Hook ────────────────────────────────────────
export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used inside <ResumeProvider>");
  }
  return context;
}