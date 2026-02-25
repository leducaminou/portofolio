"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/types";

interface FooterProps {
  dict: Dictionary;
}

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="py-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-lg font-bold gradient-text"
          >
            {"<JD />"}
          </motion.div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} John Doe. {dict.footer.rights}
            </p>
            <p className="text-xs text-muted/60 mt-1">
              {dict.footer.built_with}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-surface-light border border-border flex items-center justify-center text-muted hover:text-accent-light hover:border-accent/30 transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
