"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/i18n/types";
import type { PublicTeamMember } from "@/lib/data/queries";

interface TeamProps {
  dict: Dictionary;
  team: PublicTeamMember[];
}

export default function Team({ dict, team }: TeamProps) {
  // No members published yet: don't render an empty section.
  if (team.length === 0) return null;

  return (
    <section id="team" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.team.title} subtitle={dict.team.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => {
            const socials = [
              { icon: Github, href: member.githubUrl, label: "GitHub" },
              { icon: Linkedin, href: member.linkedinUrl, label: "LinkedIn" },
              { icon: Twitter, href: member.twitterUrl, label: "Twitter" },
            ].filter((s) => s.href);

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-4 flex flex-col items-center text-center"
              >
                {/* 4:5 photo frame; initials placeholder until a photo is uploaded from the admin */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center text-5xl font-bold text-white">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    member.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-accent-light mb-3">{member.role}</p>
                {member.bio && (
                  <p className="text-sm text-muted mb-4">{member.bio}</p>
                )}
                {member.skills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent-light border border-accent/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                {socials.length > 0 && (
                  <div className="flex items-center gap-2 mt-auto pt-2">
                    {socials.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on ${label}`}
                        className="w-9 h-9 rounded-lg bg-surface-light border border-border flex items-center justify-center text-muted hover:text-accent-light hover:border-accent/30 transition-colors"
                      >
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
