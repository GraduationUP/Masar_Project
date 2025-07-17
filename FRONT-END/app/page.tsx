import HeroSection from "@/components/main_page/heroSection"
import ServiceCategoriesSection from "@/components/main_page/servicCategoriesSection"
import FeaturedStoresSection from "@/components/main_page/featuredStoresSection"
import HowItWorksSection from "@/components/main_page/howItWorksSection"
import CTASection from "@/components/main_page/CTASection"

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
