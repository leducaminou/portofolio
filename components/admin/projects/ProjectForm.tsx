"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectInput } from "@/lib/validations";
import { createProject, updateProject } from "@/lib/actions/projects";
import { PROJECT_CATEGORIES, slugify } from "@/lib/config/site";
import { useModal } from "@/components/modals/ModalContext";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import TagInput from "@/components/ui/TagInput";
import LinesField from "@/components/ui/LinesField";
import ImageUploader from "@/components/ui/ImageUploader";

const CATEGORY_LABELS: Record<string, string> = {
  web: "Web application",
  mobile: "Mobile app",
  saas: "SaaS platform",
  dashboard: "Dashboard",
  other: "Other",
};

const numberOrNull = (v: unknown) =>
  v === "" || v === null || v === undefined ? null : Number(v);
const numberOrZero = (v: unknown) => (v === "" || v == null ? 0 : Number(v));

const emptyProject: ProjectInput = {
  title: "",
  description: "",
  implementations: [],
  titleFr: "",
  descriptionFr: "",
  implementationsFr: [],
  slug: "",
  image: null,
  liveUrl: "",
  githubUrl: "",
  category: "web",
  clientName: "",
  year: new Date().getFullYear(),
  tags: [],
  published: false,
  featured: false,
  sortOrder: 0,
  performanceScore: 0,
  seoScore: 0,
  uptimeScore: 0,
};

export default function ProjectForm() {
  const { data, closeModal } = useModal();
  const project = data?.project as (ProjectInput & { id: string }) | undefined;
  const isEditing = !!project;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          ...emptyProject,
          ...project,
          liveUrl: project.liveUrl ?? "",
          githubUrl: project.githubUrl ?? "",
          clientName: project.clientName ?? "",
        }
      : emptyProject,
  });

  const image = watch("image") ?? null;
  const tags = watch("tags");

  const titleField = register("title");

  const onSubmit = async (formData: ProjectInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = isEditing
        ? await updateProject(project.id, formData)
        : await createProject(formData);

      if (result.success) {
        closeModal();
      } else {
        setSubmitError(result.error);
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {submitError && (
        <div
          role="alert"
          className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-sm"
        >
          {submitError}
        </div>
      )}

      <ImageUploader
        label="Project image"
        value={image}
        onChange={(url) => setValue("image", url, { shouldDirty: true })}
        onError={setSubmitError}
      />

      {/* ═══ Main info (English, default language) ═══ */}
      <section className="space-y-6">
        <h4 className="text-sm font-semibold text-white">
          Main information (English)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Title"
            placeholder="Belair Santé"
            {...titleField}
            onChange={(e) => {
              titleField.onChange(e);
              if (!slugTouched) {
                setValue("slug", slugify(e.target.value), {
                  shouldValidate: true,
                });
              }
            }}
            error={errors.title?.message}
          />
          <Input
            label="Slug (unique)"
            placeholder="belair-sante"
            {...register("slug", { onChange: () => setSlugTouched(true) })}
            error={errors.slug?.message}
          />
        </div>

        <Textarea
          label="Description"
          placeholder="What the project does, for whom, and the result..."
          {...register("description")}
          error={errors.description?.message}
        />

        <LinesField
          label="Key features / technical implementation"
          placeholder={"One feature per line\nMulti-role architecture\nPDF export"}
          value={project?.implementations ?? []}
          onChange={(lines) => setValue("implementations", lines)}
          hint="One item per line."
        />
      </section>

      {/* ═══ French translation ═══ */}
      <section className="space-y-6">
        <h4 className="text-sm font-semibold text-white">
          Traduction française{" "}
          <span className="text-muted font-normal">
            (optional, title and description are both required to be saved)
          </span>
        </h4>
        <Input
          label="Titre"
          {...register("titleFr")}
          error={errors.titleFr?.message}
        />
        <Textarea
          label="Description"
          {...register("descriptionFr")}
          error={errors.descriptionFr?.message}
        />
        <LinesField
          label="Fonctionnalités clés"
          value={project?.implementationsFr ?? []}
          onChange={(lines) => setValue("implementationsFr", lines)}
          hint="Un élément par ligne."
        />
      </section>

      {/* ═══ Details ═══ */}
      <section className="space-y-6">
        <h4 className="text-sm font-semibold text-white">Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label="Category"
            options={PROJECT_CATEGORIES.map((c) => ({
              value: c,
              label: CATEGORY_LABELS[c],
            }))}
            {...register("category")}
            error={errors.category?.message}
          />
          <Input
            label="Client (optional)"
            {...register("clientName")}
            error={errors.clientName?.message}
          />
          <Input
            label="Year"
            type="number"
            {...register("year", { setValueAs: numberOrNull })}
            error={errors.year?.message}
          />
        </div>

        <TagInput
          label="Technologies"
          placeholder="Next.js, FastAPI, PostgreSQL..."
          value={tags}
          onChange={(next) => setValue("tags", next, { shouldDirty: true })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Live URL"
            placeholder="https://..."
            {...register("liveUrl")}
            error={errors.liveUrl?.message}
          />
          <Input
            label="GitHub repository"
            placeholder="https://github.com/..."
            {...register("githubUrl")}
            error={errors.githubUrl?.message}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Input
            label="Performance (0-100)"
            type="number"
            {...register("performanceScore", { setValueAs: numberOrZero })}
            error={errors.performanceScore?.message}
          />
          <Input
            label="SEO (0-100)"
            type="number"
            {...register("seoScore", { setValueAs: numberOrZero })}
            error={errors.seoScore?.message}
          />
          <Input
            label="Uptime % (0-100)"
            type="number"
            step="0.1"
            {...register("uptimeScore", { setValueAs: numberOrZero })}
            error={errors.uptimeScore?.message}
          />
        </div>
        <p className="text-xs text-muted/70">
          Metrics left at 0 are hidden on the public site. Only enter values
          you have measured.
        </p>
      </section>

      {/* ═══ Publication ═══ */}
      <section className="space-y-4">
        <h4 className="text-sm font-semibold text-white">Publication</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <Input
            label="Display order (lower first)"
            type="number"
            {...register("sortOrder", { valueAsNumber: true })}
            error={errors.sortOrder?.message}
          />
          <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer pb-2.5">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[var(--color-accent)]"
              {...register("published")}
            />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer pb-2.5">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[var(--color-accent)]"
              {...register("featured")}
            />
            Featured (shown first)
          </label>
        </div>
      </section>

      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="min-w-[120px]"
        >
          {isEditing ? "Save changes" : "Create project"}
        </Button>
      </div>
    </form>
  );
}
