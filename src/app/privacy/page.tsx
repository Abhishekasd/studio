import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how we handle your data.
          </p>
        </header>

        <Separator className="my-8 sm:my-12 bg-border/50" />

        <div className="prose prose-lg mx-auto text-foreground/90 leading-relaxed space-y-6 text-justify text-base sm:text-lg">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Introduction</h2>
          <p>
            Welcome to MorningMuse3D. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. We respect your privacy and are committed to protecting it. By using our service, you agree to the collection and use of information in accordance with this policy. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Information We Collect</h2>
          <p>
            MorningMuse3D is designed to be used without requiring you to create an account or provide personally identifiable information (PII). We do not collect personal data such as your name, email address, physical address, or phone number.
          </p>
          <p>
            The information we collect is limited to non-personal data related to your interaction with our site:
          </p>
          <ul className="space-y-2 pl-5">
            <li><strong>Usage Data:</strong> We may automatically collect certain information when you access the site, such as your device's IP address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data. This data is used for analytical purposes to improve our service and is not linked to any personal identifiers.</li>
            <li><strong>User Preferences:</strong> Your selected language and category are stored locally in your browser's state to enhance your user experience but are not stored on our servers or tracked by us. These settings are forgotten once you close your browser tab unless your browser is configured to retain them.</li>
             <li><strong>Generated Content:</strong> We do not store the text or images you generate. Each message and image is created on-demand and is not saved on our servers.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-secondary">How We Use Your Information</h2>
          <p>
            Having accurate information permits us to offer a smooth, efficient, and customized experience. Specifically, we use the non-personal information collected via the site to:
          </p>
          <ul className="space-y-2 pl-5">
            <li>Provide, maintain, and improve our service.</li>
            <li>Monitor the usage of our service and analyze trends to enhance functionality and user experience.</li>
            <li>Generate unique messages and images based on your selected category and language for the current session.</li>
            <li>Serve and manage advertising through our third-party partners.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Third-Party Services (Google AdSense)</h2>
          <p>
            We use Google AdSense to display advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads based on a user's prior visits to our website or other websites on the Internet. The DoubleClick DART cookie is used by Google in the ads served on the websites of its partners, such as websites displaying AdSense ads or participating in Google certified ad networks.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutads.info/choices</a>.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Data Storage and Security</h2>
          <p>
            We do not store any personal information on our servers. Any preferences, like your chosen language, are stored temporarily in your browser and are not linked to you personally. We use administrative, technical, and physical security measures to help protect the information we do process. While we have taken reasonable steps to secure the non-personal information we handle, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Contact Us</h2>
          <p>
            If you have any questions or comments about this Privacy Policy, please contact us via the information provided on our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}

    