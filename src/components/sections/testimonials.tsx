"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  location?: string;
  rating: number;
  text: string;
  image?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export function TestimonialCarousel({
  testimonials,
  autoPlayInterval = 6000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, testimonials.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative">
      {/* Main Testimonial Card - Larger and more prominent */}
      <div className="relative bg-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-xl border border-cream overflow-hidden min-h-[380px]">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

        {/* Quote Icon - More prominent */}
        <div className="absolute top-8 right-8 text-accent">
          <Quote className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="relative z-10"
          >
            {/* Stars - Larger */}
            <div className="flex gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < currentTestimonial.rating
                      ? "fill-accent text-accent"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Text - Larger typography */}
            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-medium">
              &ldquo;{currentTestimonial.text}&rdquo;
            </blockquote>

            {/* Author - More prominent */}
            <div className="flex items-center gap-4">
              {/* Avatar placeholder with initials if no image */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-accent/20 flex items-center justify-center">
                {currentTestimonial.image ? (
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold text-primary">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                )}
              </div>
              <div>
                <div className="font-semibold text-lg text-foreground">
                  {currentTestimonial.name}
                </div>
                {currentTestimonial.location && (
                  <div className="text-muted-foreground">
                    {currentTestimonial.location}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation - More prominent */}
      <div className="flex items-center justify-between mt-8">
        {/* Dots - Larger */}
        <div className="flex gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-accent w-10"
                  : "bg-primary/20 hover:bg-primary/40 w-3"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrows - Larger */}
        <div className="flex gap-3">
          <button
            onClick={goToPrevious}
            className="w-14 h-14 rounded-full bg-white shadow-lg border border-cream flex items-center justify-center text-primary hover:bg-cream transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="w-14 h-14 rounded-full bg-accent text-primary flex items-center justify-center hover:bg-accent/90 transition-colors shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Premium full-width testimonials section
interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export function TestimonialsSection({
  testimonials,
  title = "What Our Clients Say",
  subtitle = "Don't just take our word for it. Here's what families across Kansas City have to say about working with us.",
}: TestimonialsSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

      <div className="container-main relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-accent/20 text-accent border border-accent/30">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title.split(' ').map((word, i) =>
              word === 'Clients' || word === 'Say' ? (
                <span key={i} className="text-accent">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Grid - Show multiple on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/15 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "fill-accent text-accent"
                        : "text-white/30"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  {testimonial.location && (
                    <div className="text-sm text-white/60">{testimonial.location}</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            Trusted by <span className="text-accent font-semibold">500+ families</span> across Kansas City
          </p>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-cream relative"
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-accent/20">
        <Quote className="w-10 h-10" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? "fill-accent text-accent"
                : "text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-foreground mb-6 leading-relaxed text-lg">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
          {testimonial.image ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <span className="text-sm font-bold text-primary">
              {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          )}
        </div>
        <div>
          <div className="font-semibold">{testimonial.name}</div>
          {testimonial.location && (
            <div className="text-sm text-muted-foreground">{testimonial.location}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
