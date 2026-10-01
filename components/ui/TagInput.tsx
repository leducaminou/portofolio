"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

/** Chips input: Enter or comma adds a tag, Backspace on empty input removes the last one. */
export default function TagInput({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter",
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  const add = (raw: string) => {
    const tag = raw.trim();
    if (!tag || value.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...value, tag]);
    setDraft("");
  };

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && <label className="text-sm font-medium text-muted">{label}</label>}
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-surface-light border border-border rounded-xl focus-within:border-accent-light focus-within:ring-2 focus-within:ring-accent-light/20 transition-all">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent-light border border-accent/20"
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => onChange(value.filter((t) => t !== tag))}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => {
            if (e.target.value.includes(",")) {
              e.target.value.split(",").forEach(add);
            } else {
              setDraft(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add(draft);
            } else if (e.key === "Backspace" && !draft && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          onBlur={() => add(draft)}
          placeholder={value.length ? "" : placeholder}
          className="flex-1 min-w-[120px] bg-transparent text-white placeholder:text-muted/50 focus:outline-none text-sm py-1"
        />
      </div>
    </div>
  );
}
