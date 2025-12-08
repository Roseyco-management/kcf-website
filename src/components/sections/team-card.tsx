"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
}

interface TeamCardProps {
  member: TeamMember;
  index?: number;
  variant?: "default" | "detailed";
}

export function TeamCard({ member, index = 0, variant = "default" }: TeamCardProps) {
  if (variant === "detailed") {
    return <DetailedTeamCard member={member} index={index} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gold accent border on hover */}
        <div className="absolute inset-0 border-4 border-transparent group-hover:border-accent/50 rounded-2xl transition-colors duration-300" />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Contact Icons */}
            <div className="flex gap-3 justify-center">
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-colors"
                  aria-label={`Call ${member.name}`}
                >
                  <Phone className="w-4 h-4" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-colors"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
        <p className="text-accent font-medium">{member.role}</p>
      </div>
    </motion.div>
  );
}

function DetailedTeamCard({ member, index = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-2xl overflow-hidden card-shadow"
    >
      {/* Image */}
      <div className="relative aspect-[4/3]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
        <p className="text-accent font-medium mb-4">{member.role}</p>

        {member.bio && (
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {member.bio}
          </p>
        )}

        {/* Contact Links */}
        <div className="flex gap-4 pt-4 border-t border-gray-100">
          {member.phone && (
            <a
              href={`tel:${member.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{member.phone}</span>
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Email</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface TeamGridProps {
  members: TeamMember[];
  variant?: "default" | "detailed";
}

export function TeamGrid({ members, variant = "default" }: TeamGridProps) {
  // For 3 members, use 3-column layout centered
  const gridCols = members.length === 3
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
    : variant === "detailed"
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid gap-8 lg:gap-10 ${gridCols}`}>
      {members.map((member, index) => (
        <TeamCard
          key={member.name}
          member={member}
          index={index}
          variant={variant}
        />
      ))}
    </div>
  );
}
