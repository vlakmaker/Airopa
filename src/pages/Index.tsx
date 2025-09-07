import { Navigation } from "@/components/Navigation";
import { Header } from "@/components/Header";
import { FeaturedStory } from "@/components/FeaturedStory";
import { StartupGrid } from "@/components/StartupGrid";
import { PolicySection } from "@/components/PolicySection";
import { CountrySpotlight } from "@/components/CountrySpotlight";
import { PreFooterNewsletter } from "@/components/PreFooterNewsletter";
import { Footer } from "@/components/Footer";

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
