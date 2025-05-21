import HeroSection from "@/components/heroSection"
import ServiceCategoriesSection from "@/components/servicCategoriesSection"
import FeaturedStoresSection from "@/components/featuredStoresSection"
import HowItWorksSection from "@/components/howItWorksSection"
import CTASection from "@/components/CTASection"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServiceCategoriesSection />
      <FeaturedStoresSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  )
}
