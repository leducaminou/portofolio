"use client";

import Textarea from "@/components/ui/Textarea";

interface LinesFieldProps {
  label: string;
  value: string[];
  onChange: (lines: string[]) => void;
  placeholder?: string;
  hint?: string;
}

/** Textarea where each line is one list item. Keeps the raw text so typing a newline never gets swallowed. */
export default function LinesField({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: LinesFieldProps) {
  return (
    <div className="space-y-1">
      <Textarea
        label={label}
        placeholder={placeholder}
        defaultValue={value.join("\n")}
        onChange={(e) =>
          onChange(e.target.value.split("\n").filter((l) => l.trim() !== ""))
        }
      />
      {hint && <p className="text-xs text-muted/70">{hint}</p>}
    </div>
  );
}
