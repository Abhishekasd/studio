import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary md:text-6xl">
            About MorningMuse3D
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Your daily sanctuary for AI-powered inspiration, art, and positivity, delivered in a beautiful 3D experience.
          </p>
        </header>

        <Separator className="my-8 sm:my-12 bg-border/50" />

        <section className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed text-foreground/90 text-justify">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center">Our Mission</h2>
          <p>
            At MorningMuse3D, we believe that the first few moments of your day can define your entire outlook. A single positive thought, a moment of peaceful reflection, or a simple laugh can set the stage for a more productive, joyful, and fulfilling day. Our mission is to provide that spark. We aim to be a global source of daily inspiration, making positivity accessible to everyone, everywhere, in their own language.
          </p>
          <p>
            We've combined the power of advanced artificial intelligence with a passion for beautiful design to create an experience that is not just a utility, but a ritual. MorningMuse3D is more than just a quote generator; it's a digital sanctuary where technology and art converge to uplift the human spirit. Our platform is designed for anyone seeking a positive start to their day, whether you're a student looking for motivation, a professional seeking a moment of calm, or someone who simply enjoys the beauty of art and poetry.
          </p>
        </section>

        <Separator className="my-8 sm:my-12 bg-border/50" />

        <section className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed text-foreground/90 text-justify">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center">What We Offer</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary/90 mb-2">Multi-Category Messages</h3>
              <p>
                Life is diverse, and so is our content. Whether you seek motivation to tackle a big project, spiritual wisdom to find inner peace, the poetic elegance of Shayari, a light-hearted joke, or a festive greeting, MorningMuse3D has a category for you. Our AI ensures that every message you receive is fresh and unique. This variety ensures that you can always find a message that perfectly matches your mood and needs for the day.
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary/90 mb-2">Multilingual Support</h3>
              <p>
                Inspiration knows no borders. We proudly offer content in multiple languages including English, Hindi, Sanskrit, and Urdu. Choose your preferred language to connect with our messages on a deeper, more personal level. This feature is core to our mission of making inspiration universally accessible.
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary/90 mb-2">AI-Generated Art</h3>
              <p>
                Our most unique feature is the ability to transform words into visual art. With a single click, our AI generates a stunning, high-quality image that captures the essence of your message. For spiritual messages, the AI creates culturally relevant art—from beautiful depictions of Hindu deities to intricate Islamic calligraphy—making the experience deeply personal and visually captivating. This blend of text and art creates a multisensory experience that enhances the impact of the message.
              </p>
            </div>
             <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary/90 mb-2">Immersive 3D Environment</h3>
              <p>
                The entire experience is wrapped in a calming, interactive 3D background of floating particles. This serene digital landscape is designed to help you disconnect from the noise and focus on your moment of morning inspiration, making your visit to MorningMuse3D a truly multisensory experience that engages both your mind and your senses.
              </p>
            </div>
          </div>
        </section>

         <Separator className="my-8 sm:my-12 bg-border/50" />

        <section className="text-center text-base sm:text-lg leading-relaxed text-foreground/90">
             <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Join Our Community</h2>
             <p className="mt-4">
                Start your day with MorningMuse3D and join a growing community of individuals dedicated to finding and sharing positivity. We are constantly working to improve the experience and add new features, languages, and categories. Thank you for making us a part of your morning ritual.
             </p>
        </section>
      </div>
    </div>
  );
}

    