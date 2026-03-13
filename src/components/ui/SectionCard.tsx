import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionCard({
  title,
  description,
  children,
  className,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100",
        className,
      )}
    >
      <div className="mb-4 sm:mb-5">
        <h2
          className="text-base sm:text-lg font-semibold"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#0F172A" }}
        >
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm mt-1" style={{ color: "#64748b" }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
