"use client";

import { motion } from "framer-motion";
import {
  Home,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Heart,
  CheckCircle,
  Award,
  Handshake,
  Phone,
  Search,
  FileText,
  Camera,
  Key,
  ClipboardCheck,
  MessageSquare,
  Calendar,
  DollarSign,
  ShieldCheck,
  Target,
  Lightbulb,
  LucideIcon,
} from "lucide-react";

// Map of icon names to components
const iconMap: Record<string, LucideIcon> = {
  home: Home,
  users: Users,
  trendingUp: TrendingUp,
  shield: Shield,
  clock: Clock,
  heart: Heart,
  checkCircle: CheckCircle,
  award: Award,
  handshake: Handshake,
  phone: Phone,
  search: Search,
  fileText: FileText,
  camera: Camera,
  key: Key,
  clipboardCheck: ClipboardCheck,
  messageSquare: MessageSquare,
  calendar: Calendar,
  dollarSign: DollarSign,
  shieldCheck: ShieldCheck,
  target: Target,
  lightbulb: Lightbulb,
};

interface IconFeatureCardProps {
  iconName: string;
  title: string;
  description: string;
  index?: number;
}

export function IconFeatureCard({
  iconName,
  title,
  description,
  index = 0,
}: IconFeatureCardProps) {
  const Icon = iconMap[iconName] || Home;

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

interface IconFeatureListItemProps {
  iconName: string;
  title: string;
  description: string;
  index?: number;
}

export function IconFeatureListItem({
  iconName,
  title,
  description,
  index = 0,
}: IconFeatureListItemProps) {
  const Icon = iconMap[iconName] || Home;

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

interface FeatureGridProps {
  features: Array<{
    iconName: string;
    title: string;
    description: string;
  }>;
}

export function IconFeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {features.map((feature, index) => (
        <IconFeatureCard
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
