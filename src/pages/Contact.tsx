import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin, Instagram, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// 1. Define the Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof formSchema>;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 2. Set up React Hook Form with the Zod schema
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 3. Handle form submission with validated data
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (error) {
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Contact" title="Contact Point" subtitle="Establish a secure communication channel with BASE8HQ." />

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {[
                { icon: Mail, label: "Email", value: "ops@base8hq.com" },
                { icon: MapPin, label: "Location", value: "HQ District, Innovation Tower, Floor 8" },
                { icon: Phone, label: "Comms Line", value: "+1 (555) 808-BASE" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card-glass rounded-sm p-5 flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-primary/30 rounded-sm text-primary">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="font-heading text-[0.65rem] tracking-widest text-primary mb-1">{label}</p>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {[
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Twitter, label: "Twitter" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    title={label}
                    className="w-10 h-10 flex items-center justify-center border border-primary/30 rounded-sm text-muted-foreground hover:text-primary hover:border-primary/60 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-glass rounded-sm p-10 flex items-center justify-center text-center">
                <div>
                  <h3 className="font-heading text-lg text-primary mb-3">Transmission Sent</h3>
                  <p className="text-muted-foreground text-sm">We'll respond within 24 hours.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="card-glass rounded-sm p-6 md:p-8"
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {submitError && (
                      <p className="text-sm text-destructive">{submitError}</p>
                    )}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors resize-none"
                              placeholder="Your message..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="btn-glow-filled rounded-sm w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Transmission"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;