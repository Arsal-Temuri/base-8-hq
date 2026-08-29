"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const primaryFields = [
  "Brand Strategy", "Graphic Design", "Brand Identity Design", "UI / UX Design", 
  "Web Development", "Software Development", "App Development", "3D Design & Visualisation", 
  "Architecture / CAD", "Photography", "Videography", "Film Production", "Video Editing", 
  "Motion Graphics", "Animation", "Audio Production", "Music Production", "Voice-over", 
  "Copywriting", "Content Writing", "Social Media", "Digital Marketing", "Performance Marketing", 
  "SEO", "Research & Data", "AI / Automation", "Cyber Security", "Project Management", 
  "Marketing Strategy", "Business Development", "Other"
];

const experienceOptions = [
  "Less than 1 year", "1–2 years", "3–5 years", "5–8 years", "8+ years"
];

const availabilityOptions = [
  "Available Now", "Available Part-Time", "Available Evenings / Weekends", 
  "Available for Selected Projects", "Currently Busy, Contact Me for Future Missions"
];

const deploymentOptions = [
  "Remote", "On-Site", "Hybrid", "Depends on the Mission"
];

const remoteOptions = [
  "Yes", "No", "Depends on the Mission"
];

const pricingMethods = [
  "Per Project", "Per Day", "Per Hour", "Monthly Retainer", "Depends on Scope", "Open to Discussion"
];

const missionInterests = [
  "Branding & Identity", "Marketing Campaigns", "Websites & Digital Platforms", 
  "Film & Video Production", "Social Media & Content", "Advertising", "Corporate Projects", 
  "Startups", "Product Launches", "Strategy & Research", "Technology & Development", 
  "3D / Visualisation", "AI & Automation", "Other"
];

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  displayName: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(1, "Contact number is required"),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  
  primaryField: z.string().min(1, "Please select a primary field"),
  secondarySkills: z.array(z.string()).optional(),
  otherSpecialisation: z.string().optional(),
  
  experienceYears: z.string().min(1, "Please select years of experience"),
  expertiseDescription: z.string().min(1, "Please describe your expertise"),
  project1: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  project2: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  project3: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tools: z.string().optional(),
  
  availability: z.string().min(1, "Please select your current availability"),
  deploymentPreference: z.string().min(1, "Please select your deployment preference"),
  remoteAvailable: z.string().min(1, "Please indicate remote availability"),
  typicalRate: z.string().optional(),
  currency: z.string().optional(),
  pricingMethod: z.string().optional(),
  
  missionInterest: z.array(z.string()).optional(),
  whyJoin: z.string().optional(),
  anythingElse: z.string().optional(),
  
  clearance1: z.literal(true),
  clearance2: z.literal(true),
  clearance3: z.literal(true),
  clearance4: z.literal(true),
  clearance5: z.literal(true),
  clearance6: z.literal(true),
});

const inputClasses = "w-full bg-background border border-primary/20 rounded-sm px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors";
const labelClasses = "font-heading text-[0.65rem] tracking-widest text-muted-foreground uppercase";
const headingClasses = "font-heading font-bold text-lg tracking-widest uppercase mb-6 text-primary border-b border-primary/10 pb-3";

export default function ShadowOperativePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", displayName: "", location: "", email: "", contactNumber: "", 
      linkedin: "", portfolio: "", primaryField: "", secondarySkills: [], otherSpecialisation: "",
      experienceYears: "", expertiseDescription: "", project1: "", project2: "", project3: "", 
      tools: "", availability: "", deploymentPreference: "", remoteAvailable: "", 
      typicalRate: "", currency: "", pricingMethod: "", missionInterest: [], 
      whyJoin: "", anythingElse: "",
    },
  });

  const watchClearance = form.watch([
    "clearance1", "clearance2", "clearance3", 
    "clearance4", "clearance5", "clearance6"
  ]);
  
  const allClearanceChecked = watchClearance.every(Boolean);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SHADOW_FORM_URL ?? "", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Submission failed");
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Shadow Operative form error:", error);
      setSubmitError((error as Error)?.message ?? "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <PageWrapper>
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass border border-primary/40 p-12 rounded-sm"
            >
              <h2 className="font-heading font-bold text-3xl tracking-widest text-primary mb-6 uppercase">Profile Received</h2>
              <div className="space-y-6 text-muted-foreground font-mono text-sm leading-relaxed">
                <p>Your profile has been transmitted to BASE8HQ.</p>
                <p>Submission does not represent an active deployment.</p>
                <p>If your capabilities align with a future mission, Headquarters may establish contact.</p>
                <p className="mt-8">Until then:</p>
                <p className="text-xl text-primary font-bold mt-2 tracking-widest">STANDBY FOR DEPLOYMENT.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 max-w-3xl">
          
          <div className="text-center mb-16 space-y-6">
            <p className="text-primary tracking-widest text-sm font-semibold uppercase font-heading">Classified Access</p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-wider">Shadow Operative Application</h1>
            <h2 className="text-xl md:text-2xl font-heading text-muted-foreground uppercase tracking-widest">Join The Shadow Network</h2>
            
            <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground mt-8 text-left text-sm md:text-base leading-relaxed">
              <p>BASE8HQ maintains a network of independent specialists, freelancers and creative professionals who may be deployed when a mission requires their expertise.</p>
              <p>This is not an application for a fixed vacancy or permanent employment.</p>
              <p>Submit your profile to enter the BASE8HQ Shadow Operative Network. If a future mission matches your skills, availability and experience, Headquarters may contact you for mission-based collaboration.</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card-glass rounded-sm p-6 md:p-10"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                
                {/* OPERATIVE IDENTIFICATION */}
                <div className="space-y-6">
                  <h3 className={headingClasses}>Operative Identification</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Full Name *</FormLabel>
                        <FormControl><Input placeholder="[Enter your full name]" {...field} className={inputClasses} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="displayName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Professional / Display Name</FormLabel>
                        <FormControl><Input placeholder="[Optional]" {...field} className={inputClasses} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>City / Country *</FormLabel>
                        <FormControl><Input placeholder="[Enter your location]" {...field} className={inputClasses} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="contactNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>WhatsApp / Contact Number *</FormLabel>
                        <FormControl><Input placeholder="[Enter your contact number]" {...field} className={inputClasses} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Email Address *</FormLabel>
                      <FormControl><Input type="email" placeholder="[Enter your email]" {...field} className={inputClasses} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField control={form.control} name="linkedin" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>LinkedIn Profile</FormLabel>
                        <FormControl><Input placeholder="[Paste LinkedIn URL]" {...field} className={inputClasses} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="portfolio" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Personal Website / Portfolio</FormLabel>
                        <FormControl><Input placeholder="[Paste portfolio URL]" {...field} className={inputClasses} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>

                {/* SPECIALIST CLASSIFICATION */}
                <div className="space-y-6">
                  <h3 className={headingClasses}>Specialist Classification</h3>
                  
                  <FormField control={form.control} name="primaryField" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Primary Field of Expertise *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClasses}>
                            <SelectValue placeholder="Select primary field" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {primaryFields.map((pf) => (
                            <SelectItem key={pf} value={pf}>{pf}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="secondarySkills" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Secondary Skills</FormLabel>
                      <p className="text-xs text-muted-foreground mb-4">Select all that apply.</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {primaryFields.map((pf) => (
                          <label key={`sec-${pf}`} className="flex items-center space-x-3 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={field.value?.includes(pf)} 
                              onChange={(e) => {
                                const checked = e.target.checked;
                                field.onChange(checked ? [...(field.value || []), pf] : (field.value || []).filter(v => v !== pf));
                              }} 
                              className="w-4 h-4 accent-primary rounded-sm bg-background border-primary/20" 
                            />
                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{pf}</span>
                          </label>
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="otherSpecialisation" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Other Specialisation</FormLabel>
                      <p className="text-xs text-muted-foreground mb-2">If your field is not listed, tell us what you do.</p>
                      <FormControl><Input placeholder="[Your other specialisation]" {...field} className={inputClasses} /></FormControl>
                    </FormItem>
                  )} />
                </div>

                {/* OPERATIVE PROFILE */}
                <div className="space-y-6">
                  <h3 className={headingClasses}>Operative Profile</h3>
                  
                  <FormField control={form.control} name="experienceYears" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Years of Professional Experience *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClasses}>
                            <SelectValue placeholder="Select years of experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {experienceOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="expertiseDescription" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Tell us what you do *</FormLabel>
                      <p className="text-xs text-muted-foreground mb-2">Briefly describe your expertise, strongest capabilities and the type of work you are best at.</p>
                      <FormControl><Textarea className={`min-h-[100px] resize-none ${inputClasses}`} placeholder="[Type here...]" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="space-y-4">
                    <FormLabel className={labelClasses}>Selected Work / Project Links</FormLabel>
                    <p className="text-xs text-muted-foreground mb-2">Share up to 3 examples of your strongest work.</p>
                    
                    <FormField control={form.control} name="project1" render={({ field }) => (
                      <FormItem>
                        <FormControl><Input placeholder="PROJECT 01 [URL]" {...field} className={inputClasses} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="project2" render={({ field }) => (
                      <FormItem>
                        <FormControl><Input placeholder="PROJECT 02 [URL]" {...field} className={inputClasses} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="project3" render={({ field }) => (
                      <FormItem>
                        <FormControl><Input placeholder="PROJECT 03 [URL]" {...field} className={inputClasses} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="tools" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Tools / Software / Platforms</FormLabel>
                      <p className="text-xs text-muted-foreground mb-2">List the primary tools, software or platforms you work with.</p>
                      <FormControl><Textarea className={`min-h-[80px] resize-none ${inputClasses}`} placeholder="[Type here...]" {...field} /></FormControl>
                    </FormItem>
                  )} />
                </div>

                {/* MISSION READINESS */}
                <div className="space-y-6">
                  <h3 className={headingClasses}>Mission Readiness</h3>

                  <FormField control={form.control} name="availability" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Current Availability *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClasses}>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availabilityOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField control={form.control} name="deploymentPreference" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Deployment Preference *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={inputClasses}>
                              <SelectValue placeholder="Select preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {deploymentOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="remoteAvailable" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Available for Remote? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={inputClasses}>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {remoteOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField control={form.control} name="typicalRate" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Typical Rate</FormLabel>
                        <FormControl><Input placeholder="[Amount/Range]" {...field} className={inputClasses} /></FormControl>
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="currency" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Currency</FormLabel>
                        <FormControl><Input placeholder="[PKR/USD/EUR...]" {...field} className={inputClasses} /></FormControl>
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="pricingMethod" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Pricing Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClasses}>
                            <SelectValue placeholder="Select pricing method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pricingMethods.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                </div>

                {/* MISSION INTEREST */}
                <div className="space-y-6">
                  <h3 className={headingClasses}>Mission Interest</h3>
                  
                  <FormField control={form.control} name="missionInterest" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>What types of missions would you like to work on?</FormLabel>
                      <p className="text-xs text-muted-foreground mb-4">Select all that apply.</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {missionInterests.map((opt) => (
                          <label key={`interest-${opt}`} className="flex items-center space-x-3 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={field.value?.includes(opt)} 
                              onChange={(e) => {
                                const checked = e.target.checked;
                                field.onChange(checked ? [...(field.value || []), opt] : (field.value || []).filter(v => v !== opt));
                              }} 
                              className="w-4 h-4 accent-primary rounded-sm bg-background border-primary/20" 
                            />
                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="whyJoin" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Why do you want to join the network?</FormLabel>
                      <FormControl><Textarea className={`min-h-[100px] resize-none ${inputClasses}`} placeholder="[Optional]" {...field} /></FormControl>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="anythingElse" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Anything Headquarters should know?</FormLabel>
                      <FormControl><Textarea className={`min-h-[80px] resize-none ${inputClasses}`} placeholder="[Optional]" {...field} /></FormControl>
                    </FormItem>
                  )} />
                </div>

                {/* PROTOCOLS */}
                <div className="space-y-12 bg-background/30 p-6 md:p-8 rounded-sm border border-primary/10">
                  <div className="space-y-4">
                    <h3 className={headingClasses}>Shadow Operative Protocol</h3>
                    <div className="text-xs text-muted-foreground space-y-3 leading-relaxed">
                      <p>The BASE8HQ Shadow Operative Network is a mission-based collaboration network.</p>
                      <p>Submitting this profile does not create an employment relationship, guarantee work, guarantee payment, guarantee a minimum number of missions, or create a permanent position within BASE8HQ.</p>
                      <p>Shadow Operatives remain independent professionals unless a separate written agreement for a specific mission states otherwise.</p>
                      <p>When a suitable mission becomes available, BASE8HQ may contact selected operatives based on expertise, availability, project requirements, experience and other mission-specific considerations.</p>
                      <p>Scope of work, deadlines, compensation, payment terms, responsibilities and deliverables will be agreed separately for each mission before deployment.</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-border/20"></div>

                  <div className="space-y-4">
                    <h3 className={headingClasses}>Shared Portfolio Protocol</h3>
                    <div className="text-xs text-muted-foreground space-y-3 leading-relaxed">
                      <p>Work created by a Shadow Operative while participating in a BASE8HQ mission may form part of a shared professional portfolio.</p>
                      <p>BASE8HQ may showcase completed work within its Mission Archive, website, social media platforms, presentations, case studies and other portfolio materials.</p>
                      <p>The participating Shadow Operative may also showcase the same completed work within their personal portfolio, website, social media or professional platforms.</p>
                      <p>Portfolio publication remains subject to any client confidentiality, non-disclosure agreement, embargo, release restriction or other condition attached to the specific mission.</p>
                      <p>Where a client requires work to remain private, neither BASE8HQ nor the Shadow Operative may publicly showcase that work until permission is granted.</p>
                      <p>Shared portfolio rights do not automatically change ownership or intellectual property rights. Ownership, licensing, usage rights and transfer of intellectual property for deliverables will be determined according to the requirements and agreement of each individual mission.</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-border/20"></div>

                  <div className="space-y-4">
                    <h3 className={headingClasses}>Confidentiality Protocol</h3>
                    <div className="text-xs text-muted-foreground space-y-3 leading-relaxed">
                      <p>Shadow Operatives may receive access to confidential client information, campaign plans, designs, strategies, documents, credentials or internal BASE8HQ information during a mission.</p>
                      <p>Any information identified as confidential, private or unreleased must not be shared, published, distributed or used outside the authorised mission.</p>
                      <p>Additional confidentiality or non-disclosure agreements may be required before deployment on certain missions.</p>
                    </div>
                  </div>
                </div>

                {/* FINAL CLEARANCE */}
                <div className="space-y-6">
                  <h3 className={headingClasses}>Final Clearance</h3>
                  <div className="space-y-4">
                    <FormField control={form.control} name="clearance1" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><input type="checkbox" checked={field.value === true} onChange={e => field.onChange(e.target.checked)} className="mt-1 w-4 h-4 accent-primary cursor-pointer flex-shrink-0" /></FormControl>
                        <FormLabel className="text-xs leading-snug font-normal text-muted-foreground cursor-pointer">I understand that submitting my profile does not guarantee employment, a contract or future missions.</FormLabel>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="clearance2" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><input type="checkbox" checked={field.value === true} onChange={e => field.onChange(e.target.checked)} className="mt-1 w-4 h-4 accent-primary cursor-pointer flex-shrink-0" /></FormControl>
                        <FormLabel className="text-xs leading-snug font-normal text-muted-foreground cursor-pointer">I understand that Shadow Operative assignments are offered on a mission-by-mission basis.</FormLabel>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="clearance3" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><input type="checkbox" checked={field.value === true} onChange={e => field.onChange(e.target.checked)} className="mt-1 w-4 h-4 accent-primary cursor-pointer flex-shrink-0" /></FormControl>
                        <FormLabel className="text-xs leading-snug font-normal text-muted-foreground cursor-pointer">I understand that scope, compensation and responsibilities will be confirmed separately before I accept any mission.</FormLabel>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="clearance4" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><input type="checkbox" checked={field.value === true} onChange={e => field.onChange(e.target.checked)} className="mt-1 w-4 h-4 accent-primary cursor-pointer flex-shrink-0" /></FormControl>
                        <FormLabel className="text-xs leading-snug font-normal text-muted-foreground cursor-pointer">I understand and accept the Shared Portfolio Protocol, including that completed work may be showcased by both BASE8HQ and myself where permitted by the client and mission terms.</FormLabel>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="clearance5" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><input type="checkbox" checked={field.value === true} onChange={e => field.onChange(e.target.checked)} className="mt-1 w-4 h-4 accent-primary cursor-pointer flex-shrink-0" /></FormControl>
                        <FormLabel className="text-xs leading-snug font-normal text-muted-foreground cursor-pointer">I understand that confidential or restricted work cannot be publicly shared without appropriate permission.</FormLabel>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="clearance6" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><input type="checkbox" checked={field.value === true} onChange={e => field.onChange(e.target.checked)} className="mt-1 w-4 h-4 accent-primary cursor-pointer flex-shrink-0" /></FormControl>
                        <FormLabel className="text-xs leading-snug font-normal text-muted-foreground cursor-pointer">I confirm that the information and portfolio material submitted in this application accurately represents my own skills, experience and authorised work.</FormLabel>
                      </FormItem>
                    )} />
                  </div>
                </div>
                
                <div className="pt-4">
                  {submitError && <p className="text-sm text-destructive mb-4 text-center">{submitError}</p>}
                  <Button 
                    type="submit" 
                    disabled={!allClearanceChecked || isSubmitting}
                    className="btn-glow-filled rounded-sm w-full"
                  >
                    {isSubmitting ? "Transmitting..." : "Submit Operative Profile"}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
