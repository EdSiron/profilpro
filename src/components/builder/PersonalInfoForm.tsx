"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useResume } from "@/store/resumeStore";
import { PersonalInfo } from "@/types/resume";
import Input from "@/components/ui/Input";
import SectionCard from "@/components/ui/SectionCard";

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { register, watch } = useForm<PersonalInfo>({
    defaultValues: resumeData.personalInfo,
  });

  const values = watch();

  useEffect(() => {
    updatePersonalInfo(values);
  }, [JSON.stringify(values)]);

  return (
    <SectionCard
      title="Personal Information"
      description="This appears at the top of your resume. Keep it professional."
    >
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Full Name"
          placeholder="e.g. Juan dela Cruz"
          required
          {...register("fullName")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="juan@email.com"
            required
            {...register("email")}
          />
          <Input
            label="Phone Number"
            placeholder="+63 912 345 6789"
            required
            {...register("phone")}
          />
        </div>
        <Input
          label="Location"
          placeholder="e.g. Manila, Philippines"
          hint="City and country is enough — no full address needed"
          required
          {...register("location")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="LinkedIn URL"
            placeholder="linkedin.com/in/yourname"
            {...register("linkedIn")}
          />
          <Input
            label="GitHub URL"
            placeholder="github.com/yourname"
            {...register("github")}
          />
        </div>
        <Input
          label="Personal Website / Portfolio"
          placeholder="yourportfolio.com"
          {...register("website")}
        />
      </div>
    </SectionCard>
  );
}
