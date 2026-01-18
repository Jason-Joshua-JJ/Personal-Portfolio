// src/components/Contact.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Contact form wired to Formspree
 * Endpoint: https://formspree.io/f/mnnlwlkj
 *
 * Added:
 * - Honeypot field ("website") to reduce spam
 * - startedAt timestamp (hidden) for optional future checks
 * - If honeypot is filled, the submission is ignored and a subtle toast shown
 */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnnlwlkj";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // honeypot value (hidden field)
  const [website, setWebsite] = useState("");
  // timestamp when user opened the form (ms)
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // set startedAt on mount
  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If honeypot has any value, treat as spam and do not submit.
    if (website.trim().length > 0) {
      // show a subtle toast so you know a bot was caught; change to silent if you prefer.
      toast({
        title: "Spam detected",
        description: "Submission ignored.",
        variant: "destructive",
      });
      return;
    }

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        // Add anti-spam metadata (Formspree will store these fields too)
        website: website,
        startedAt: startedAt ?? undefined,
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setIsSuccess(true);
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        });

        // clear form after a short delay so user sees success state
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setIsSuccess(false);
        }, 2000);
      } else {
        // Formspree returns helpful error details in `data`
        const errMsg =
          (data && (data.error || data.message)) ||
          (data && data.errors && data.errors.map((x: any) => x.message).join(", ")) ||
          "Failed to send message. Please try again later.";
        toast({
          title: "Send failed",
          description: errMsg,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Network error",
        description: "Could not send message. Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("jasonjoshua4444@gmail.com");
    toast({
      title: "Email Copied!",
      description: "Email address copied to clipboard",
    });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={copyEmail}
                className="flex items-center gap-4 p-4 glass rounded-lg hover:bg-white/10 transition-all w-full group"
                type="button"
              >
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">jasonjoshua4444@gmail.com</p>
                </div>
              </button>

              <a
                href="https://www.linkedin.com/in/jason-joshua-w"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass rounded-lg hover:bg-white/10 transition-all group"
              >
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">jason-joshua-w</p>
                </div>
              </a>

              <a
                href="https://github.com/Jason-Joshua-JJ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass rounded-lg hover:bg-white/10 transition-all group"
              >
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">GitHub</p>
                  <p className="text-sm text-muted-foreground">Jason-Joshua-JJ</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" aria-live="polite" noValidate>
              {/* Honeypot field: visually hidden but present in DOM for bots */}
              <div style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden>
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                {/* startedAt for optional server-side checks */}
                <input id="startedAt" name="startedAt" type="hidden" value={startedAt ?? ""} readOnly />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
