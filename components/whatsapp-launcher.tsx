"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { PlaneTakeoff, X, Send, User, Phone as PhoneIcon, MessageSquareText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const BUTTON_DELAY_MS = 800
const BUBBLE_DELAY_MS = 2200
const BUBBLE_AUTO_HIDE_MS = 9000
const GREETING = "👋 Need help planning your trip? Chat with us!"

const fieldClassName =
  "bg-luxvio-cream border-luxvio-teal/20 focus-visible:border-luxvio-teal rounded-xl"

const LauncherFormSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  phone: z.string().optional(),
  need: z.string().min(1, "Tell us what you need"),
})

interface WhatsAppLauncherProps {
  whatsappNumber: string
}

export function WhatsAppLauncher({ whatsappNumber }: WhatsAppLauncherProps) {
  const [showButton, setShowButton] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [bubbleDismissed, setBubbleDismissed] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const form = useForm<z.infer<typeof LauncherFormSchema>>({
    resolver: zodResolver(LauncherFormSchema),
    defaultValues: { name: "", phone: "", need: "" },
  })

  useEffect(() => {
    const buttonTimer = setTimeout(() => setShowButton(true), BUTTON_DELAY_MS)
    const bubbleTimer = setTimeout(() => setShowBubble(true), BUBBLE_DELAY_MS)
    return () => {
      clearTimeout(buttonTimer)
      clearTimeout(bubbleTimer)
    }
  }, [])

  useEffect(() => {
    if (!showBubble) return
    const hideTimer = setTimeout(() => setBubbleDismissed(true), BUBBLE_AUTO_HIDE_MS)
    return () => clearTimeout(hideTimer)
  }, [showBubble])

  if (!showButton) return null

  const bubbleVisible = showBubble && !bubbleDismissed && !showForm

  function openForm() {
    setBubbleDismissed(true)
    setShowForm(true)
  }

  function onSubmit(values: z.infer<typeof LauncherFormSchema>) {
    const lines = [
      `Hi, I'm ${values.name} and I'd like to plan a trip to Sri Lanka.`,
      ...(values.phone ? [`Phone: ${values.phone}`] : []),
      "",
      values.need,
    ]
    const chatUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`
    window.open(chatUrl, "_blank", "noopener,noreferrer")
    toast.success("Opening WhatsApp to send your message…")
    setShowForm(false)
    form.reset()
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {bubbleVisible && (
        <div className="relative max-w-[240px] animate-pop-in rounded-2xl rounded-br-sm bg-white px-4 py-3 shadow-xl border border-luxvio-gold/20">
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setBubbleDismissed(true)}
            className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors"
          >
            <X className="size-3" />
          </button>
          <button
            type="button"
            onClick={openForm}
            className="block text-left text-sm text-luxvio-charcoal leading-snug"
          >
            {GREETING}
          </button>
        </div>
      )}

      {showForm && (
        <div className="relative w-80 animate-pop-in overflow-hidden rounded-2xl rounded-br-sm bg-white shadow-2xl border border-luxvio-gold/20">
          {/* Brand accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-luxvio-teal via-luxvio-gold to-luxvio-teal" />

          <div className="relative p-5">
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-luxvio-gold/10 rounded-full blur-2xl pointer-events-none" />

            <button
              type="button"
              aria-label="Close"
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-full text-luxvio-charcoal/40 hover:bg-luxvio-cream hover:text-luxvio-charcoal transition-colors"
            >
              <X className="size-4" />
            </button>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-luxvio-teal">
                <PlaneTakeoff className="size-5 text-luxvio-gold" />
              </div>
              <div>
                <p className="font-serif text-base font-bold text-luxvio-teal">Let&apos;s Plan Your Trip</p>
                <p className="text-xs text-luxvio-charcoal/50">We usually reply within minutes</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-xs font-medium text-luxvio-charcoal/70">
                        <User className="size-3" /> Your Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className={fieldClassName} {...field} />
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
                      <FormLabel className="flex items-center gap-1.5 text-xs font-medium text-luxvio-charcoal/70">
                        <PhoneIcon className="size-3" /> Phone (optional)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" className={fieldClassName} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="need"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-xs font-medium text-luxvio-charcoal/70">
                        <MessageSquareText className="size-3" /> What do you need?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="I'm looking for a 5-day cultural tour..."
                          className={cn(fieldClassName, "min-h-[70px] resize-none")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-luxvio-teal hover:bg-luxvio-gold text-white rounded-xl transition-colors"
                >
                  Send Message <Send className="size-4 ml-1" />
                </Button>
                <p className="text-center text-[11px] text-luxvio-charcoal/40">
                  Opens WhatsApp with your message ready to send
                </p>
              </form>
            </Form>
          </div>
        </div>
      )}

      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-luxvio-teal animate-pulse-ring" />
        <button
          type="button"
          onClick={() => (showForm ? setShowForm(false) : openForm())}
          aria-label="Plan your trip with us"
          className={cn(
            "relative flex size-14 items-center justify-center rounded-full bg-luxvio-teal text-luxvio-gold shadow-lg",
            "transition-all hover:scale-110 hover:bg-luxvio-gold hover:text-luxvio-teal animate-pop-in",
          )}
        >
          {showForm ? <X className="size-6" /> : <PlaneTakeoff className="size-7" />}
        </button>
      </div>
    </div>
  )
}
