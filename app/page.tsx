import Image from "next/image";
import AdvantagesSection from "@/components/advantages-section";
import FAQSection from "@/components/faq-section";
import FooterSection from "@/components/footer-section";
import GuaranteeSection from "@/components/guarantee-section";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ObjectionsSection from "@/components/objections-section";
import PricingSection from "@/components/pricing-section";
import RecipesSection from "@/components/recipes-section";
import SocialSection from "@/components/social-section";
import WhatYouWillFindSection from "@/components/what-you-will-find-section";

export default async function Page() {
	return (
		<div className="min-h-screen font-sans bg-muted/5 relative w-full">
			<Image
				src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
				alt="ReceitAI"
				width={1920}
				height={1080}
				className="w-full h-full object-cover absolute top-0 left-0 z-[-1] opacity-5"
			/>
			<Header />

			<HeroSection />

			<RecipesSection />

			<WhatYouWillFindSection />

			<AdvantagesSection />

			<SocialSection />

			<PricingSection />

			<ObjectionsSection />

			<GuaranteeSection />

			<FAQSection />

			<FooterSection />
		</div>
	);
}
