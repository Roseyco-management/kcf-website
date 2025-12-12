"use client";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function LevelUpPage() {
  const [formData, setFormData] = useState({
    question1: "",
    question2: "",
    question3: "",
    email: "",
    fullName: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/level-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again or contact us directly.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="pt-32 pb-16">
      <SectionWrapper background="white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              WE SPECIALIZE IN ASSISTING YOU
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              with securing the best financing options, maximize the sale price of your home,
              shop for a new one and get the best deal possible ensuring you have a seamless transition.
            </p>
            <p className="text-xl text-gray-800 mb-8">
              Is your family struggling to find the time to plan, organize and shop for a larger home,
              even though you have completely outgrown your existing home?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-8">
              Together we'll take your family to the NEXT LEVEL
            </h2>
          </div>

          {/* Form Section */}
          <div className="bg-cream rounded-2xl p-8 md:p-12 shadow-lg">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                <p className="text-lg text-gray-700">
                  We've received your information and one of our representatives will be in contact with you soon.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <p className="text-lg text-gray-700 mb-2">
                    Answer these three easy questions and one of our representatives will be in contact with you.
                  </p>
                  <h3 className="text-2xl font-bold text-primary">Let's get in touch.</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
              {/* Question 1 */}
              <div>
                <label className="block text-lg font-semibold text-primary mb-3">
                  1. What is holding you back the most right now with buying your next home?
                </label>
                <p className="text-sm text-gray-600 mb-2">Explain it in details...</p>
                <textarea
                  name="question1"
                  value={formData.question1}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  placeholder="Please share your concerns..."
                  required
                />
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-lg font-semibold text-primary mb-3">
                  2. On a scale of 1-10 how urgent are you to solve this problem today?
                </label>
                <p className="text-sm text-gray-600 mb-2">Explain it in details...</p>
                <textarea
                  name="question2"
                  value={formData.question2}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  placeholder="Tell us about your urgency level..."
                  required
                />
              </div>

              {/* Question 3 */}
              <div>
                <label className="block text-lg font-semibold text-primary mb-3">
                  3. How soon would you like to LEVEL UP and be in your next home? In the next 3 months, 6 months, a year, a year plus?
                </label>
                <p className="text-sm text-gray-600 mb-2">Explain it in details...</p>
                <textarea
                  name="question3"
                  value={formData.question3}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  placeholder="Share your timeline..."
                  required
                />
              </div>

              {/* Contact Fields */}
              <div className="space-y-4 pt-4 border-t border-gray-300">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="test@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Mitchell"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="+123 456 789 00"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-primary font-bold py-4 rounded-lg transition-colors text-lg shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
              </>
            )}
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-primary text-white rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-semibold text-accent mb-2">EMAIL ADDRESS</h4>
                <a
                  href="mailto:admin@kcfhomes.com"
                  className="text-white hover:text-accent transition-colors"
                >
                  admin@kcfhomes.com
                </a>
              </div>

              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-semibold text-accent mb-2">PHONE NUMBER</h4>
                <a
                  href="tel:+18166163072"
                  className="text-white hover:text-accent transition-colors"
                >
                  +1 (816) 575 7763
                </a>
              </div>

              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-semibold text-accent mb-2">LOCATION</h4>
                <span className="text-white">Kansas City, MO</span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
