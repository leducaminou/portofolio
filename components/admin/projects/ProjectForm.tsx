"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LayoutDashboard,
  Globe,
  Github,
  Info,
  Camera,
  Loader2,
} from "lucide-react";
import { projectSchema, ProjectInput } from "@/lib/validations";
import { createProject, updateProject } from "@/lib/actions/projects";
import { useModal } from "@/components/modals/ModalContext";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";

export default function ProjectForm() {
  const { data, closeModal } = useModal();
  const project = data?.project;
  const isEditing = !!project;

  const [imageUrl, setImageUrl] = useState<string | null>(
    project?.image || null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          ...project,
          liveUrl: project.liveUrl || "",
          githubUrl: project.githubUrl || "",
        }
      : {
          title: "",
          slug: "",
          description: "",
          liveUrl: "",
          githubUrl: "",
          published: false,
          performanceScore: 0,
          seoScore: 0,
          uptimeScore: 0,
          implementations: [],
        },
  });

  const onSubmit = async (formData: ProjectInput) => {
    setIsSubmitting(true);
    const finalData = { ...formData, image: imageUrl };

    try {
      const result = isEditing
        ? await updateProject(project.id, finalData)
        : await createProject(finalData);

      if (result.success) {
        closeModal();
        reset();
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80 ml-1">
          Project Image
        </label>
        {imageUrl ? (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border group">
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => setImageUrl(null)}
                className="bg-background/20 backdrop-blur-md border-white/20 text-white"
              >
                Change Image
              </Button>
            </div>
          </div>
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]) {
                setImageUrl(res[0].ufsUrl);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            className="ut-label:text-accent-light ut-button:bg-accent ut-button:ut-readying:bg-accent/50 borded-dashed border-2 border-border rounded-2xl bg-surface/50 p-8 transition-colors hover:border-accent/40"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Title"
          placeholder="My Amazing Project"
          {...register("title")}
          error={errors.title?.message}
        />
        <Input
          label="Slug"
          placeholder="my-amazing-project"
          {...register("slug")}
          error={errors.slug?.message}
        />
      </div>

      <Textarea
        label="Description"
        placeholder="Brief description of the project..."
        {...register("description")}
        error={errors.description?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Live Preview URL"
          placeholder="https://..."
          {...register("liveUrl")}
          error={errors.liveUrl?.message}
        />
        <Input
          label="Github Repository"
          placeholder="https://github.com/..."
          {...register("githubUrl")}
          error={errors.githubUrl?.message}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Input
          label="Performance"
          type="number"
          {...register("performanceScore", { valueAsNumber: true })}
          error={errors.performanceScore?.message}
        />
        <Input
          label="SEO"
          type="number"
          {...register("seoScore", { valueAsNumber: true })}
          error={errors.seoScore?.message}
        />
        <Input
          label="Uptime"
          type="number"
          step="0.1"
          {...register("uptimeScore", { valueAsNumber: true })}
          error={errors.uptimeScore?.message}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">
          Implementations / Tech Stack (comma separated)
        </label>
        <Input
          placeholder="Next.js, Tailwind, Prisma..."
          defaultValue={project?.implementations?.join(", ")}
          onChange={(e) => {
            const tags = e.target.value
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);
            setValue("implementations" as any, tags);
          }}
        />
      </div>

      <div className="flex items-center gap-2 p-1">
        <input
          type="checkbox"
          id="published"
          className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
          {...register("published")}
        />
        <label
          htmlFor="published"
          className="text-sm font-medium text-foreground/80 cursor-pointer"
        >
          Publish this project
        </label>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="min-w-[120px]"
        >
          {isEditing ? "Save Changes" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
