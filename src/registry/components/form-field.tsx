"use client";

import { cn } from "cn";
import type { ComponentProps } from "react";
import { useId } from "react";
import { Input } from "@/components/ui/input";

export type FormFieldProps = ComponentProps<typeof Input> & {
  label: string;
  description?: string;
  error?: string;
};

/** Label, help text and errors always stay connected to their input. */
export function FormField({
  label,
  description,
  error,
  id: providedId,
  required,
  className,
  ...props
}: FormFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const describedBy =
    [
      props["aria-describedby"],
      description && `${id}-description`,
      error && `${id}-error`,
    ]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <div className={cn("@container/field w-full space-y-2", className)}>
      <label
        htmlFor={id}
        className="flex flex-wrap items-center gap-2 text-sm font-medium"
      >
        {label}
        {required && (
          <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] text-accent-foreground">
            必須
          </span>
        )}
      </label>
      <Input
        {...props}
        id={id}
        required={required}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={describedBy}
        className="min-h-11 text-base @sm/field:text-sm"
      />
      {description && (
        <p
          id={`${id}-description`}
          className="text-xs leading-6 text-muted-foreground"
        >
          {description}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs leading-6 text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
