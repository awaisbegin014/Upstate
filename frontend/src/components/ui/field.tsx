import { cn } from "@/lib/utils";

const control =
  "w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-60";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, "min-h-28", className)} {...props} />;
}

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, "pr-8", className)} {...props} />;
}

export function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-semibold">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function Checkbox({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2 text-sm font-medium", className)}>
      <input type="checkbox" className="h-4 w-4 rounded accent-[var(--steel-900)]" {...props} />
      {label}
    </label>
  );
}
