"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({ icon: Icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white rounded-2xl p-8 card-shadow card-shadow-hover"
    >
      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
        <Icon className="w-7 h-7 text-accent" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

interface FeatureListItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export function FeatureListItem({ icon: Icon, title, description, index = 0 }: FeatureListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="flex gap-5"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

interface ValueCardProps {
  number: string;
  title: string;
  description: string;
  index?: number;
}

export function ValueCard({ number, title, description, index = 0 }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative pl-8 border-l-2 border-accent/30"
    >
      <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-accent text-primary text-sm font-bold flex items-center justify-center">
        {number}
      </span>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
