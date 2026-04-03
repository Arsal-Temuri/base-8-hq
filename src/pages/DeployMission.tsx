import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// 1. Define the Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Operative name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  project_type: z.string().min(1, { message: "Please select a mission type." }),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(20, { message: "Brief must be at least 20 characters." }),
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
      project_type: "",
      budget: "",
      timeline: "",
      description: "",
    },
  });

  // 3. Handle form submission with validated data
  const onSubmit = async (data: DeployFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(import.meta.env.VITE_DEPLOY_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (error) {
      console.error("Deploy mission form error:", error);
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
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Budget Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors">
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="$5K - $10K">$5K - $10K</SelectItem>
                              <SelectItem value="$10K - $25K">$10K - $25K</SelectItem>
                              <SelectItem value="$25K - $50K">$25K - $50K</SelectItem>
                              <SelectItem value="$50K+">$50K+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading text-[0.65rem] tracking-widest text-muted-foreground">Timeline</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
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

export default DeployMission;