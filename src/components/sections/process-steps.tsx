"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Search,
  FileText,
  Home,
  Handshake,
  Camera,
  TrendingUp,
  Key,
  ClipboardCheck,
  MessageSquare,
  Calendar,
  DollarSign,
  CheckCircle,
  ShieldCheck,
  Users,
  LucideIcon,
} from "lucide-react";

// Map of icon names to components
const iconMap: Record<string, LucideIcon> = {
  phone: Phone,
  search: Search,
  fileText: FileText,
  home: Home,
  handshake: Handshake,
  camera: Camera,
  trendingUp: TrendingUp,
  key: Key,
  clipboardCheck: ClipboardCheck,
  messageSquare: MessageSquare,
  calendar: Calendar,
  dollarSign: DollarSign,
  checkCircle: CheckCircle,
  shieldCheck: ShieldCheck,
  users: Users,
};

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  iconName?: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  variant?: "horizontal" | "vertical" | "cards";
}

export function ProcessSteps({ steps, variant = "horizontal" }: ProcessStepsProps) {
  if (variant === "vertical") {
    return <VerticalProcess steps={steps} />;
  }

  if (variant === "cards") {
    return <CardProcess steps={steps} />;
  }

  return <HorizontalProcess steps={steps} />;
}

function HorizontalProcess({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative">
      {/* Connection Line - Desktop only */}
      <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-accent/20" />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative text-center"
          >
            {/* Step Number */}
            <div className="relative z-10 mx-auto w-20 h-20 rounded-full bg-accent text-primary flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
              {step.number}
            </div>

            {/* Content */}
            <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function VerticalProcess({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-accent/20" />

      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative flex gap-8 pl-4"
          >
            {/* Step Number */}
            <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-bold shadow-md">
              {step.number}
            </div>

            {/* Content */}
            <div className="pt-2">
              <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CardProcess({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step, index) => {
        const Icon = step.iconName ? iconMap[step.iconName] : null;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group bg-white rounded-2xl p-8 card-shadow card-shadow-hover relative overflow-hidden"
          >
            {/* Large Background Number */}
            <div className="absolute -top-4 -right-4 text-9xl font-bold text-accent/5 select-none">
              {step.number}
            </div>

            {/* Icon or Number Badge */}
            <div className="relative z-10">
              {Icon ? (
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold mb-6">
                  {step.number}
                </div>
              )}
            </div>

            {/* Content */}
            <h4 className="text-xl font-semibold mb-3 relative z-10">{step.title}</h4>
            <p className="text-muted-foreground leading-relaxed relative z-10">
              {step.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

interface TimelineItem {
  year?: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-accent/20 -translate-x-1/2 hidden md:block" />
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-accent/20 md:hidden" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className={`relative flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Mobile: Always left-aligned */}
            <div className="md:hidden flex gap-6 pl-4">
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-bold shadow-md">
                {item.year || index + 1}
              </div>
              <div className="pt-1">
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>

            {/* Desktop: Alternating */}
            <div className="hidden md:flex md:w-1/2 justify-end">
              <div className={`max-w-md ${index % 2 === 0 ? "text-right pr-12" : "text-left pl-12"}`}>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>

            {/* Center Dot - Desktop only */}
            <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-accent text-primary items-center justify-center font-bold shadow-md z-10">
              {item.year || index + 1}
            </div>

            <div className="hidden md:block md:w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
