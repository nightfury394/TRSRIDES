"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import type { RootState } from "@/store/store";
import { contactUsTranslations } from "../translations/contact-us";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const language = useSelector((state: RootState) => state.language.current);
  const t = contactUsTranslations[language];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t.toastTitle,
        description: t.toastDescription,
      });
      form.reset();
    }, 2000);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {t.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                {t.formDescription}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button
                  onClick={() =>
                    document
                      .getElementById("contact-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  size="lg"
                  className="group"
                >
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16" id="contact-form">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-8">{t.getInTouch}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-gray-900 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.address}</h3>
                  <p className="text-gray-600">{t.addressValue}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-gray-900 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.phone}</h3>
                  <p className="text-gray-600">{t.phoneValue}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-gray-900 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.email}</h3>
                  <p className="text-gray-600">{t.emailValue}</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 rounded-xl bg-gray-900 p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Need immediate assistance?
              </h3>
              <p className="text-gray-300 mb-6">
                Our support team is available 24/7 to help you with any
                questions.
              </p>
              <a href="mailto:info@trsrides.com?subject=Inquiry&body=Hello, I would like to know more about your services.">
                <Button
                  variant="outline"
                  className="bg-white hover:bg-gray-100"
                >
                  Chat with us
                </Button>
              </a>
            </div>
          </div>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.name}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.form.namePlaceholder}
                          {...field}
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
                      <FormLabel>{t.form.email}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.form.emailPlaceholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.subject}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.form.subjectPlaceholder}
                          {...field}
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
                      <FormLabel>{t.form.message}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t.form.messagePlaceholder}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? t.form.sending : t.form.send}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
