"use server";

import { z } from "zod/v4";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.email("Veuillez entrer une adresse email valide"),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères"),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return {
      success: false,
      message: "Veuillez corriger les erreurs ci-dessous.",
      errors: fieldErrors,
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Woptimozsoft Contact <contact@woptimozsoft.com>",
      to: ["leducaminou2@gmail.com", "contact@woptimozsoft.com"],
      subject: `Nouveau message de contact de ${result.data.name}`,
      text: `Nom: ${result.data.name}\nEmail: ${result.data.email}\nMessage:\n${result.data.message}\n`,
      replyTo: result.data.email,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return {
        success: false,
        message: "Une erreur s'est produite lors de l'envoi de l'email. Veuillez réessayer plus tard.",
      };
    }

    return {
      success: true,
      message: "Merci ! Votre message a été envoyé avec succès.",
    };
  } catch (error) {
    console.error("Erreur inattendue:", error);
    return {
      success: false,
      message: "Une erreur inattendue s'est produite. Veuillez réessayer.",
    };
  }
}
