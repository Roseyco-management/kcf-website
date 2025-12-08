"use client";

import { motion } from "framer-motion";
import {
  Target,
  Heart,
  Shield,
  CheckCircle,
  Award,
  Handshake,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  target: Target,
  heart: Heart,
  shield: Shield,
  checkCircle: CheckCircle,
  award: Award,
  handshake: Handshake,
};

interface AboutFeatureItemProps {
  iconName: string;
  title: string;
  description: string;
  index?: number;
}

export function AboutFeatureItem({
  iconName,
  title,
  description,
  index = 0,
}: AboutFeatureItemProps) {
  const Icon = iconMap[iconName] || Target;

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

interface AboutFeaturesListProps {
  features: Array<{
    iconName: string;
    title: string;
    description: string;
  }>;
}

export function AboutFeaturesList({ features }: AboutFeaturesListProps) {
  return (
    <div className="space-y-5">
      {features.map((feature, index) => (
        <AboutFeatureItem
          key={feature.title}
          iconName={feature.iconName}
          title={feature.title}
          description={feature.description}
          index={index}
        />
      ))}
    </div>
  );
}
