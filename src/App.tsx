import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { ProblemSection } from './components/ProblemSection';
import { VisionSection } from './components/VisionSection';
import { FeaturesSection } from './components/FeaturesSection';
import { DashboardPreview } from './components/DashboardPreview';
import { ManifestoSection } from './components/ManifestoSection';
import { HowItWorks } from './components/HowItWorks';
import { EarlyAccessCta } from './components/EarlyAccessCta';
import { Footer } from './components/Footer';
import { AchievementCardModal } from './components/AchievementCardModal';
import { WaitlistDrawer } from './components/WaitlistDrawer';
import { CampaignData } from './types';
import { CAMPAIGNS } from './data/mockData';

export function App() {
  const [waitlistAdminOpen, setWaitlistAdminOpen] = useState(false);
  const [achievementModalOpen, setAchievementModalOpen] = useState(false);
  const [selectedCampaignForCard, setSelectedCampaignForCard] = useState<CampaignData | null>(CAMPAIGNS[0]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSignupSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenAchievementModalWithCampaign = (campaign: CampaignData) => {
    setSelectedCampaignForCard(campaign);
    setAchievementModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-background font-sans">
      {/* Fixed Navigation Header */}
      <Header
        onOpenWaitlistAdmin={() => setWaitlistAdminOpen(true)}
        onOpenAchievementModal={() => {
          setSelectedCampaignForCard(CAMPAIGNS[0]);
          setAchievementModalOpen(true);
        }}
      />

      {/* Main Page Flow following PRD 6.3 */}
      <main className="flex-grow">
        {/* 1. Hero with full-bleed night-training photography gradient, copy & capture form */}
        <Hero onSignupSuccess={handleSignupSuccess} />

        {/* 2. Scrolling brand ticker strip */}
        <Ticker />

        {/* 3. Problem Section ("You train for months. You race for one day.") */}
        <ProblemSection />

        {/* 4. Vision Section ("What if every training day felt like a small finish line?") */}
        <VisionSection />

        {/* 5. Platform Features (The 4 Pillars: Performance, Goals, Fuel, Achievements) */}
        <FeaturesSection />

        {/* 6. Realistic SaaS Dashboard Mock with interactive campaigns & timeline */}
        <DashboardPreview
          onOpenAchievementModalWithCampaign={handleOpenAchievementModalWithCampaign}
        />

        {/* 7. Emotional Section ("Don't wait for race day to feel like you've won.") */}
        <ManifestoSection />

        {/* 8. How It Works (3 Steps) */}
        <HowItWorks />

        {/* 9. High-impact Acid Lime Early Access CTA Block */}
        <EarlyAccessCta onSignupSuccess={handleSignupSuccess} />
      </main>

      {/* 10. Footer with brand, tagline, back-to-top */}
      <Footer onOpenWaitlistAdmin={() => setWaitlistAdminOpen(true)} />

      {/* Interactive Modals */}
      <AchievementCardModal
        isOpen={achievementModalOpen}
        onClose={() => setAchievementModalOpen(false)}
        campaign={selectedCampaignForCard}
      />

      <WaitlistDrawer
        isOpen={waitlistAdminOpen}
        onClose={() => setWaitlistAdminOpen(false)}
        triggerRefresh={refreshTrigger}
      />
    </div>
  );
}

export default App;
