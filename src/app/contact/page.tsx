import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary md:text-6xl">
            Contact Us
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question, feedback, or a feature suggestion, please feel free to reach out.
          </p>
        </header>

        <Separator className="my-8 sm:my-12 bg-border/50" />

        <div className="max-w-xl mx-auto">
            <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed text-foreground/90 text-justify">
                <p>
                    Your feedback is invaluable to us as we continue to improve and grow MorningMuse3D. We are passionate about creating a positive and inspiring experience, and your thoughts help us achieve that goal. If you've encountered an issue, have an idea for a new language or category, or simply want to share how our app has impacted your day, please use the contact information below.
                </p>
                <p>
                    For all inquiries, partnership opportunities, or support questions, please email us directly. We are a small team, but we are dedicated to our community and will do our best to respond to every message.
                </p>
                <p className="text-center">
                    <a href="mailto:support@morningmuse3d.com" className="text-lg sm:text-xl font-bold text-primary hover:underline">
                        support@morningmuse3d.com
                    </a>
                </p>
                 <p>
                    We aim to respond to all messages within 48 business hours. Please note that at this time, we can only provide support in English. We appreciate your patience and understanding as we work to expand our support capabilities. You can also follow our journey on social media, though we do not actively have a presence yet, we plan to in the future.
                </p>
                 <p>
                    Thank you for being a part of our community and for helping us make mornings more inspirational for everyone. Your participation and feedback are what make this project special.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
