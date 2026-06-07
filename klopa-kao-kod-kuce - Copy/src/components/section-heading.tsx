import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className={cn("eyebrow", light && "text-gold")}>
            <span className="h-px w-6 bg-current opacity-60" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl",
            light ? "text-cream" : "text-foreground"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed sm:text-lg",
              light ? "text-cream/80" : "text-muted-foreground",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
