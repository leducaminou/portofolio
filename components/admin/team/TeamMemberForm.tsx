"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberSchema, TeamMemberInput } from "@/lib/validations";
import { createTeamMember, updateTeamMember } from "@/lib/actions/team";
import { useModal } from "@/components/modals/ModalContext";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import TagInput from "@/components/ui/TagInput";
import ImageUploader from "@/components/ui/ImageUploader";

const emptyMember: TeamMemberInput = {
  name: "",
  role: "",
  bioEn: "",
  bioFr: "",
  image: null,
  skills: [],
  githubUrl: "",
  linkedinUrl: "",
  twitterUrl: "",
  published: true,
  sortOrder: 0,
};

export default function TeamMemberForm() {
  const { data, closeModal } = useModal();
  const member = data?.member as (TeamMemberInput & { id: string }) | undefined;
  const isEditing = !!member;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TeamMemberInput>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: member
      ? {
          ...emptyMember,
          ...member,
          githubUrl: member.githubUrl ?? "",
          linkedinUrl: member.linkedinUrl ?? "",
          twitterUrl: member.twitterUrl ?? "",
        }
      : emptyMember,
  });

  const image = watch("image") ?? null;
  const skills = watch("skills");

  const onSubmit = async (formData: TeamMemberInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = isEditing
        ? await updateTeamMember(member.id, formData)
        : await createTeamMember(formData);
      if (result.success) closeModal();
      else setSubmitError(result.error);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div
          role="alert"
          className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-sm"
        >
          {submitError}
        </div>
      )}

      <ImageUploader
        label="Photo"
        aspect="aspect-[4/5]"
        maxWidth="w-full max-w-[240px]"
        value={image}
        onChange={(url) => setValue("image", url, { shouldDirty: true })}
        onError={setSubmitError}
      />

      <Input label="Full name" {...register("name")} error={errors.name?.message} />

      <Input
        label="Role (displayed in English on every language)"
        placeholder="Full-stack Developer"
        {...register("role")}
        error={errors.role?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Textarea label="Bio (English)" {...register("bioEn")} />
        <Textarea label="Bio (français)" {...register("bioFr")} />
      </div>

      <TagInput
        label="Skills"
        placeholder="Python, FastAPI, Next.js..."
        value={skills}
        onChange={(next) => setValue("skills", next, { shouldDirty: true })}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="GitHub"
          placeholder="https://github.com/..."
          {...register("githubUrl")}
          error={errors.githubUrl?.message}
        />
        <Input
          label="LinkedIn"
          placeholder="https://linkedin.com/in/..."
          {...register("linkedinUrl")}
          error={errors.linkedinUrl?.message}
        />
        <Input
          label="Twitter / X"
          placeholder="https://x.com/..."
          {...register("twitterUrl")}
          error={errors.twitterUrl?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
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
          Visible on the public site
        </label>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting} className="min-w-[120px]">
          {isEditing ? "Save changes" : "Add member"}
        </Button>
      </div>
    </form>
  );
}
