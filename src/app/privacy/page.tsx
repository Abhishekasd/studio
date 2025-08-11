import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-xl text-foreground/80 max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how we handle your data.
          </p>
        </header>

        <Separator className="my-12 bg-border/50" />

        <div className="prose prose-lg mx-auto text-foreground/90 leading-relaxed space-y-6">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="text-3xl font-bold text-secondary">Introduction</h2>
          <p>
            Welcome to MorningMuse3D. This Privacy Policy explains how we collect, use, and protect your information when you visit our website. By using our service, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2 className="text-3xl font-bold text-secondary">Information We Collect</h2>
          <p>
            MorningMuse3D is designed to be used without requiring you to create an account or provide personally identifiable information. We do not collect personal data such as your name, email address, or phone number.
          </p>
          <p>
            The information we collect is limited to non-personal data related to your interaction with our site:
          </p>
          <ul>
            <li><strong>Usage Data:</strong> We may collect information about how you access and use the service. This includes your device's IP address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, and the time spent on those pages. This data is used for analytical purposes to improve our service.</li>
            <li><strong>User Preferences:</strong> Your selected language and category are stored locally in your browser's state to enhance your user experience but are not stored on our servers.</li>
          </ul>

          <h2 className="text-3xl font-bold text-secondary">How We Use Your Information</h2>
          <p>
            The non-personal information we collect is used solely for the following purposes:
          </p>
          <ul>
            <li>To provide, maintain, and improve our service.</li>
            <li>To monitor the usage of our service and analyze trends.</li>
            <li>To generate unique messages and images based on your selected category and language for the current session.</li>
          </ul>

          <h2 className="text-3xl font-bold text-secondary">Third-Party Services (Google AdSense)</h2>
          <p>
            We use Google AdSense to display advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>.
          </p>

          <h2 className="text-3xl font-bold text-secondary">Data Storage and Security</h2>
          <p>
            We do not store any personal information on our servers. Any preferences, like your chosen language, are stored temporarily in your browser and are not linked to you personally. While we strive to use commercially acceptable means to protect your data, remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>

          <h2 className="text-3xl font-bold text-secondary">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="text-3xl font-bold text-secondary">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via the information provided on our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
