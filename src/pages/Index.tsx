import { Header } from "@/components/Header";
import { FeaturedStory } from "@/components/FeaturedStory";
import { StartupGrid } from "@/components/StartupGrid";
import { PolicySection } from "@/components/PolicySection";
import { CountrySpotlight } from "@/components/CountrySpotlight";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FeaturedStory />
        <StartupGrid />
        <PolicySection />
        <CountrySpotlight />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
