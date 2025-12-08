"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  columns?: 1 | 2;
}

export function FAQSection({ items, columns = 1 }: FAQSectionProps) {
  if (columns === 2) {
    const midpoint = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, midpoint);
    const rightItems = items.slice(midpoint);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {leftItems.map((item, index) => (
              <FAQAccordionItem key={index} item={item} index={index} />
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {rightItems.map((item, index) => (
              <FAQAccordionItem key={index + midpoint} item={item} index={index + midpoint} />
            ))}
          </Accordion>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <Accordion type="single" collapsible className="space-y-4">
        {items.map((item, index) => (
          <FAQAccordionItem key={index} item={item} index={index} />
        ))}
      </Accordion>
    </motion.div>
  );
}

interface FAQAccordionItemProps {
  item: FAQItem;
  index: number;
}

function FAQAccordionItem({ item, index }: FAQAccordionItemProps) {
  return (
    <AccordionItem
      value={`item-${index}`}
      className="bg-white rounded-xl px-6 card-shadow border-none data-[state=open]:ring-2 data-[state=open]:ring-accent/20"
    >
      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-base lg:text-lg [&[data-state=open]>svg]:text-accent">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-base lg:text-lg">
        {item.answer}
      </AccordionContent>
    </AccordionItem>
  );
}

interface FAQCardProps {
  question: string;
  answer: string;
  index?: number;
}

export function FAQCard({ question, answer, index = 0 }: FAQCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-xl p-6 card-shadow"
    >
      <h4 className="font-semibold mb-3">{question}</h4>
      <p className="text-muted-foreground leading-relaxed">{answer}</p>
    </motion.div>
  );
}
