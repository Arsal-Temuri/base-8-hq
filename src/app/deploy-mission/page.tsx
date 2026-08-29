"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const COUNTRY_OPTIONS = ["Pakistan", "United States", "UK", "Australia", "Europe"] as const;

type CountryOption = (typeof COUNTRY_OPTIONS)[number];

const COUNTRY_CURRENCY_MAP: Record<CountryOption, { code: string; locale: string }> = {
  Pakistan: { code: "PKR", locale: "en-PK" },
  "United States": { code: "USD", locale: "en-US" },
  UK: { code: "GBP", locale: "en-GB" },
  Australia: { code: "AUD", locale: "en-AU" },
  Europe: { code: "EUR", locale: "en-IE" },
};

const phoneRegex = /^\+?[\d().\s-]{7,20}$/;

// 1. Define the Zod schema for validation
const formSchema = z
  .object({
    name: z.string().min(2, { message: "Operative name must be at least 2 characters." }),
    company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z
      .string()
      .trim()
      .min(7, { message: "Phone number must be at least 7 characters." })
      .max(20, { message: "Phone number must be 20 characters or fewer." })
      .regex(phoneRegex, { message: "Please enter a valid phone number." }),
    country: z.enum(COUNTRY_OPTIONS, { required_error: "Please select your country." }),
    project_type: z.string().min(1, { message: "Please select a mission type." }),
    budget: z.string().min(1, { message: "Please select a budget range." }),
    timeline: z.string().optional(),
    custom_timeline: z.string().optional(),
    description: z.string().min(20, { message: "Brief must be at least 20 characters." }),
  })
  .superRefine((data, context) => {
    // If timeline is Custom, require custom_timeline
    if (data.timeline === "Custom") {
      if (!data.custom_timeline || data.custom_timeline.trim().length === 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["custom_timeline"],
          message: "Please provide a custom timeline.",
        });
      }
    }
  });

type DeployFormData = z.infer<typeof formSchema>;

const DeployMissionPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 2. Set up React Hook Form with the Zod schema
  const form = useForm<DeployFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "Pakistan",
      project_type: "",
      budget: "",
      timeline: "",
      custom_timeline: "",
      description: "",
    },
  });

  const selectedCountry = useWatch({ control: form.control, name: "country" }) as keyof typeof COUNTRY_CURRENCY_MAP;
  const selectedTimeline = useWatch({ control: form.control, name: "timeline" });

  // 3. Handle form submission with validated data
  const onSubmit = async (data: DeployFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const { custom_timeline, ...rest } = data;
      const payload = {
        ...rest,
        budget_currency: COUNTRY_CURRENCY_MAP[data.country].code,
        timeline: data.timeline === "Custom" ? custom_timeline : data.timeline,
      };

      const response = await fetch(process.env.NEXT_PUBLIC_DEPLOY_FORM_URL ?? "", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (error) {
      console.error("Deploy mission form error:", error);
      setSubmitError((error as Error)?.message ?? "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 max-w-2xl">
          <SectionHeader
            tag="Deploy"
            title="Deploy a Mission"
            subtitle="Brief us on your operation. We'll assemble the right team and strategy."
          />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass rounded-sm p-10 text-center"
            >
              <h3 className="font-heading text-lg text-primary mb-3">Mission Received</h3>
              <p className="text-muted-foreground">Our command center has been briefed. Expect contact within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card-glass rounded-sm p-6 md:p-10"
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
                        <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Operative Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors" autoComplete="name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Company</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors" autoComplete="organization" />
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
                          <Input {...field} type="email" className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors" autoComplete="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors"
                            autoComplete="tel"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRY_OPTIONS.map((country) => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="project_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors">
                              <SelectValue placeholder="Select mission type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Brand Identity">Brand Identity</SelectItem>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                            <SelectItem value="Video Production">Video Production</SelectItem>
                            <SelectItem value="Full Campaign">Full Campaign</SelectItem>
                            <SelectItem value="Strategy Consulting">Strategy Consulting</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Timeline</FormLabel>
                          <Select
                            onValueChange={(v) => {
                              field.onChange(v);
                              if (v !== "Custom") {
                                form.setValue("custom_timeline", "", { shouldValidate: true });
                              }
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors">
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1 - 2 Weeks">1 - 2 Weeks</SelectItem>
                              <SelectItem value="1 Month">1 Month</SelectItem>
                              <SelectItem value="2 - 3 Months">2 - 3 Months</SelectItem>
                              <SelectItem value="Ongoing">Ongoing</SelectItem>
                              <SelectItem value="Custom">Custom timeline</SelectItem>
                            </SelectContent>
                          </Select>
                          {selectedTimeline === "Custom" && (
                            <FormField
                              control={form.control}
                              name="custom_timeline"
                              render={({ field: customField }) => (
                                <FormItem className="pt-3">
                                  <FormControl>
                                    <Input
                                      {...customField}
                                      placeholder="Enter custom timeline (e.g., 6 weeks)"
                                      className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">
                            Budget Range ({COUNTRY_CURRENCY_MAP[selectedCountry]?.code})
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Under 20k">Under 20k</SelectItem>
                              <SelectItem value="20k - 40k">20k - 40k</SelectItem>
                              <SelectItem value="40k - 60k">40k - 60k</SelectItem>
                              <SelectItem value="60k - 80k">60k - 80k</SelectItem>
                              <SelectItem value="80k - 100k">80k - 100k</SelectItem>
                              <SelectItem value="100k+">100k+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Mission Brief</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors resize-none"
                            placeholder="Describe your project objectives, targets, and desired outcomes..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="btn-glow-filled rounded-sm w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Deploying..." : "Deploy Mission"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default DeployMissionPage;
