"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  submitContactForm,
  type ContactFormState,
} from "@/lib/actions/contact";
import type { Dictionary } from "@/lib/i18n/types";

interface ContactProps {
  dict: Dictionary;
}

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export default function Contact({ dict }: ContactProps) {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <section id="contact" className="section-padding relative">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-accent-cyan/5 blur-[100px]" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title={dict.contact.title}
          subtitle={dict.contact.subtitle}
        />

        {/* Available Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
            <Clock size={14} className="text-success" />
            <span className="text-muted">{dict.contact.available}</span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          action={formAction}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block text-sm text-muted mb-2">
              {dict.contact.name_label}
            </label>
            <input
              name="name"
              type="text"
              placeholder={dict.contact.name_placeholder}
              className="form-input"
              required
            />
            {state.errors?.name && (
              <p className="text-error text-xs mt-1">{state.errors.name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-muted mb-2">
              {dict.contact.email_label}
            </label>
            <input
              name="email"
              type="email"
              placeholder={dict.contact.email_placeholder}
              className="form-input"
              required
            />
            {state.errors?.email && (
              <p className="text-error text-xs mt-1">{state.errors.email[0]}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-muted mb-2">
              {dict.contact.message_label}
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder={dict.contact.message_placeholder}
              className="form-input resize-none"
              required
            />
            {state.errors?.message && (
              <p className="text-error text-xs mt-1">
                {state.errors.message[0]}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                {dict.contact.sending}
              </>
            ) : (
              <>
                <Send size={16} />
                {dict.contact.send}
              </>
            )}
          </motion.button>

          {/* Status Messages */}
          {state.message && !state.errors && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-2 p-4 rounded-xl text-sm ${
                state.success
                  ? "bg-success/10 text-success border border-success/20"
                  : "bg-error/10 text-error border border-error/20"
              }`}
            >
              {state.success ? (
                <CheckCircle size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
              {state.message}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
