import type { Metadata } from "next";
import "./globals.css";
import { ResumeProvider } from "@/store/resumeStore";

export const metadata: Metadata = {
  title: "ProfilPro — Professional profiles, professionally built",
  description:
    "Build ATS-optimized, professional resumes in minutes. ProfilPro helps you craft a resume that gets past bots and impresses humans.",
  keywords: ["resume builder", "ATS resume", "CV builder", "ProfilPro"],
  authors: [{ name: "ProfilPro" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}
