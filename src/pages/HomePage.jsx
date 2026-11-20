import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import PlanCards from '../components/PlanCards';
import WhyAvyuktaSection from '../components/WhyAvyuktaSection';
import DynamicPricingSection from '../components/DynamicPricingSection';
import DualMarquee from '../components/DualMarquee';
import AutomationShowcase from '../components/AutomationShowcase';
import IndustriesSection from '../components/IndustriesSection';
import CallSafetySection from '../components/CallSafetySection';
import FaqSection from '../components/FaqSection';
import { BottomCta } from '../components/StudioParts';

export default function HomePage({ navigateTo }) {
  const nav = (event, path) => {
    event.preventDefault();
    if (navigateTo) navigateTo(path);
  };

  return (
    <div className="studio-page studio-home conversion-home">
      
      {/* 1. LARGE HIGH-CONVERSION AI SAAS HERO SECTION */}
      <HeroSection navigateTo={navigateTo} />

      {/* 2. TRANSPARENT AI PRICING PLANS (Silver, Gold & Diamond) */}
      <PlanCards navigateTo={navigateTo} />

      {/* 2.5 THE AVYUKTA ADVANTAGE (Why Avyukta - Lower Cost, 17+ Yrs, 700+ Clients, Full Telephony & AI) */}
      <WhyAvyuktaSection navigateTo={navigateTo} />

      {/* 3. DYNAMIC AI PRICING & PLATFORM WORKSPACE (BPA | CRM | Command Center | Sales) */}
      <DynamicPricingSection navigateTo={navigateTo} />

      {/* 3.5 OUR CLIENTS & OUR AFFILIATES SECTIONS (Continuous Marquees) */}
      <DualMarquee />

      {/* 4. WHAT DO YOU WANT TO AUTOMATE? (Interactive 12-Category Workflow Engine) */}
      <AutomationShowcase navigateTo={navigateTo} />

      {/* 5. INDUSTRIES WE SERVE */}
      <IndustriesSection navigateTo={navigateTo} />

      {/* 6. ZERO RUNAWAY BILL GUARANTEE & CALL SAFETY (Auto-Disconnect, 10-Min Ceiling, 15s Silence VAD) */}
      <CallSafetySection navigateTo={navigateTo} />

      {/* 7. FREQUENTLY ASKED QUESTIONS */}

      <section id="faq" className="homepage-faq-wrap">
        <FaqSection />
      </section>

      <div id="conversion" className="product-conversion-anchor">
        <BottomCta 
          navigateTo={navigateTo} 
          heading="Ready to elevate your business calling?" 
          text="Bring your use case and preferred language. Our team will configure your voice assistant, dialer, and CRM integration." 
        />
      </div>

    </div>
  );
}
