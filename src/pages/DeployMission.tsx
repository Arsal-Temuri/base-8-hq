import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
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

const COUNTRY_BUDGET_MAP: Record<CountryOption, { max: number; step: number; rangeLabel: string }> = {
  Pakistan: { max: 1000000, step: 10000, rangeLabel: "0 - 10 Lac" },
  "United States": { max: 50000, step: 5000, rangeLabel: "0 - 50,000" },
  UK: { max: 50000, step: 5000, rangeLabel: "0 - 50,000" },
  Australia: { max: 50000, step: 5000, rangeLabel: "0 - 50,000" },
  Europe: { max: 50000, step: 5000, rangeLabel: "0 - 50,000" },
};

const formatBudget = (value: number, country: CountryOption) => {
  const currency = COUNTRY_CURRENCY_MAP[country];
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
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
    budget: z
      .number({ required_error: "Please set your budget range." })
      .min(0, { message: "Budget cannot be below 0." })
      .max(1000000, { message: "Budget cannot exceed 1,000,000." }),
    timeline: z.string().optional(),
    custom_timeline: z.string().optional(),
    description: z.string().min(20, { message: "Brief must be at least 20 characters." }),
  })
  .superRefine((data, context) => {
    const budgetRules = COUNTRY_BUDGET_MAP[data.country];

    if (data.budget > budgetRules.max) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["budget"],
        message: `Budget cannot exceed ${budgetRules.max.toLocaleString()} for ${data.country}.`,
      });
    }
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

const DeployMission = () => {
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
      budget: 0,
      timeline: "",
      custom_timeline: "",
      description: "",
    },
  });

  const selectedCountry = form.watch("country");
  const selectedBudgetRules = COUNTRY_BUDGET_MAP[selectedCountry];
  const selectedTimeline = form.watch("timeline");

  useEffect(() => {
    const currentBudget = form.getValues("budget");
    if (currentBudget > selectedBudgetRules.max) {
      form.setValue("budget", selectedBudgetRules.max, { shouldValidate: true });
    }
  }, [form, selectedBudgetRules.max]);

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

      const response = await fetch(import.meta.env.VITE_DEPLOY_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
                          <Input {...field} className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors" />
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
                          <Input {...field} className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors" />
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
                          <Input {...field} type="email" className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors" />
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
                            Budget Range ({selectedBudgetRules.rangeLabel})
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-3 pt-2">
                              <Slider
                                min={0}
                                max={selectedBudgetRules.max}
                                step={selectedBudgetRules.step}
                                value={[field.value ?? 0]}
                                onValueChange={(value) => field.onChange(value[0] ?? 0)}
                              />
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{formatBudget(0, selectedCountry)}</span>
                                <span>{formatBudget(selectedBudgetRules.max, selectedCountry)}</span>
                              </div>
                              <p className="font-heading text-[0.62rem] tracking-[0.15em] text-primary">
                                Selected: {formatBudget(field.value ?? 0, selectedCountry)}
                              </p>
                            </div>
                          </FormControl>
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

export default DeployMission;