import { CountrySpotlight } from "@/components/CountrySpotlight";
import { FeaturedStory } from "@/components/FeaturedStory";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { PolicySection } from "@/components/PolicySection";
import { PreFooterNewsletter } from "@/components/PreFooterNewsletter";
import { StartupGrid } from "@/components/StartupGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <main>
        <FeaturedStory />
        <StartupGrid />
        <PolicySection />
        <CountrySpotlight />
      </main>
      <PreFooterNewsletter />
      <Footer />
    </div>
  );
};

export default Index;
