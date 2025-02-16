"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import type { RootState } from "@/store/store"
import { contactUsTranslations } from "../translations/contact-us"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const language = useSelector((state: RootState) => state.language.current)
  const t = contactUsTranslations[language]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: t.toastTitle,
        description: t.toastDescription,
      })
      form.reset()
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">{t.getInTouch}</h2>
          <p className="mb-4">{t.formDescription}</p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{t.address}</h3>
              <p>{t.addressValue}</p>
            </div>
            <div>
              <h3 className="font-semibold">{t.phone}</h3>
              <p>{t.phoneValue}</p>
            </div>
            <div>
              <h3 className="font-semibold">{t.email}</h3>
              <p>{t.emailValue}</p>
            </div>
          </div>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.form.name}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.form.namePlaceholder} {...field} />
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
                      <Input placeholder={t.form.emailPlaceholder} {...field} />
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
                      <Input placeholder={t.form.subjectPlaceholder} {...field} />
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
                      <Textarea placeholder={t.form.messagePlaceholder} className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t.form.sending : t.form.send}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

