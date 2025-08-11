import { MorningMuseClient } from "@/components/morning-muse-client";
import ThreeBackground from "@/components/three-background";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-24">
        <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 w-full">
          <MorningMuseClient />
        </main>
        <div className="w-full max-w-4xl p-8 text-foreground/80 space-y-12">
           <Separator className="my-8 bg-border/50" />
          <section>
            <h2 className="text-3xl font-bold text-center text-primary mb-6">Welcome to MorningMuse3D</h2>
            <p className="text-lg leading-relaxed text-center">
              Your daily sanctuary for inspiration and positivity. We believe that a great day starts with a great mindset. Our platform delivers unique, AI-powered messages across a variety of categories including motivating quotes, spiritual wisdom, delightful shayari, and light-hearted jokes. Each message is crafted to bring a moment of peace, a spark of motivation, or a smile to your face.
            </p>
             <p className="text-lg leading-relaxed text-center mt-4">
              Available in multiple languages like <span className="font-semibold text-primary/90">English, Hindi, Sanskrit, and Urdu</span>, our goal is to offer a moment of peace and inspiration to people across the globe. 
            </p>
          </section>

          <Separator className="my-8 bg-border/50" />
          
           <section>
            <h2 className="text-3xl font-bold text-center text-primary mb-6">Why MorningMuse3D Exists</h2>
            <p className="text-lg leading-relaxed text-justify">
             In a fast-paced world, finding a moment of peace and personal reflection can be challenging. MorningMuse3D was created to be a digital sanctuary—a place where technology and art converge to serve a single purpose: to uplift the human spirit. We harness the power of advanced AI to deliver fresh, unique, and culturally relevant content that resonates with you, no matter where you are or what language you speak. Our mission is to make inspiration accessible, personal, and beautiful. From generating a serene image of a deity that matches a spiritual quote to providing a timely greeting for a festival, every feature is designed to create a meaningful and positive start to your day.
            </p>
             <p className="text-lg leading-relaxed text-justify mt-4">
             We use state-of-the-art generative AI models to create both the textual messages and the visual art. This ensures that you never see the same message twice in a session and that the generated art is always a unique reflection of the message's essence. This commitment to variety and quality is what makes MorningMuse3D a truly unique experience.
            </p>
          </section>

          <Separator className="my-8 bg-border/50" />

          <section>
            <h2 className="text-3xl font-bold text-center text-primary mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-card/30 p-6 rounded-lg border border-border/50">
                <h3 className="text-xl font-semibold text-secondary mb-2">1. Select Your Mood</h3>
                <p>Choose a category that fits your morning vibe—from spiritual to funny.</p>
              </div>
              <div className="bg-card/30 p-6 rounded-lg border border-border/50">
                <h3 className="text-xl font-semibold text-secondary mb-2">2. Get Your Message</h3>
                <p>Receive a unique, AI-generated message in your chosen language.</p>
              </div>
              <div className="bg-card/30 p-6 rounded-lg border border-border/50">
                <h3 className="text-xl font-semibold text-secondary mb-2">3. Generate AI Art</h3>
                <p>Bring your message to life by creating a beautiful, matching image with a single click.</p>
              </div>
            </div>
          </section>
          
          <Separator className="my-8 bg-border/50" />

          <section>
            <h2 className="text-3xl font-bold text-center text-primary mb-6">Explore Our Categories</h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p><strong className="text-secondary">💪 Motivational:</strong> Kickstart your day with powerful quotes that fuel your ambition and drive. These messages are designed to give you that extra push to tackle challenges and pursue your goals with renewed vigor.</p>
              <p><strong className="text-secondary">🧘 Spiritual:</strong> Find your center with profound wisdom and messages of peace and serenity. In English, Hindi, and Sanskrit, this category generates divine art of Hindu deities, while in Urdu, it creates beautiful Islamic art, ensuring a culturally respectful experience.</p>
              <p><strong className="text-secondary">📜 Shayari:</strong> Immerse yourself in the poetic beauty of couplets that touch the heart and soul. This category is perfect for those who appreciate the elegance of words and the depth of emotional expression.</p>
              <p><strong className="text-secondary">😂 Joke:</strong> Start your morning with a laugh! Get a light-hearted, family-friendly joke to brighten your day and put a smile on your face.</p>
              <p><strong className="text-secondary">🎉 Festival:</strong> Celebrate the world's festivals with special, timely greetings. Our AI identifies the festival of the day and generates a relevant message to help you join in the celebration.</p>
            </div>
          </section>

          <Separator className="my-8 bg-border/50" />
           <section>
            <h2 className="text-3xl font-bold text-center text-primary mb-6">A Unique Experience Every Time</h2>
            <p className="text-lg leading-relaxed text-center">
             With our advanced AI, every message is unique, ensuring you get a fresh dose of inspiration every time you visit. And with the "Generate Image" feature, you can create a unique visual masterpiece to accompany your quote, making your daily ritual even more special. Start your morning with us and set the tone for a beautiful day ahead.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
