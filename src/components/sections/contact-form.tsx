"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
  variant?: "default" | "minimal" | "card";
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactForm({ onSubmit, variant = "default" }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior - can be connected to n8n later
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-12 ${
          variant === "card" ? "bg-white rounded-2xl card-shadow p-8" : ""
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  const inputClasses =
    "h-12 rounded-xl border-gray-200 focus:border-accent focus:ring-accent/20 bg-white";
  const labelClasses = "block text-sm font-medium mb-2";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={variant === "card" ? "bg-white rounded-2xl card-shadow p-8" : ""}
    >
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Smith"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(816) 555-0123"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClasses}>
            Your Message *
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your real estate needs..."
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="rounded-xl border-gray-200 focus:border-accent focus:ring-accent/20 bg-white resize-none"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-full font-medium"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}

interface NewsletterFormProps {
  onSubmit?: (email: string) => Promise<void>;
}

export function NewsletterForm({ onSubmit }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <p className="text-green-600 font-medium">
        Thanks for subscribing! Check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 h-12 rounded-full border-gray-200 focus:border-accent focus:ring-accent/20"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 px-6 bg-primary hover:bg-primary/90 text-white rounded-full"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
