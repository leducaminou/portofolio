"use client";

import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import Button from "@/components/ui/Button";

interface ImageUploaderProps {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  onError?: (message: string) => void;
  /** Tailwind aspect class for the preview, e.g. "aspect-video" or "aspect-square" */
  aspect?: string;
  /** Tailwind width classes for the preview */
  maxWidth?: string;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  onError,
  aspect = "aspect-video",
  maxWidth = "w-full max-w-md",
}: ImageUploaderProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted">{label}</label>
      {value ? (
        <div
          className={`relative ${aspect} ${maxWidth} rounded-2xl overflow-hidden border border-border group`}
        >
          <Image src={value} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => onChange(null)}
              className="bg-background/20 backdrop-blur-md border-white/20 text-white"
            >
              Change image
            </Button>
          </div>
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res?.[0]) onChange(res[0].ufsUrl);
          }}
          onUploadError={(error: Error) => onError?.(error.message)}
          className="ut-label:text-accent-light ut-button:bg-accent ut-button:ut-readying:bg-accent/50 border-dashed border-2 border-border rounded-2xl bg-surface/50 p-8 transition-colors hover:border-accent/40"
        />
      )}
    </div>
  );
}
