import type { Route } from "./+types/home";
import PromoList from "~/components/promoList";
import ProductGroup from "~/components/productGroup";
import HookSection from "~/components/hookSection";
import HeroSection from "~/components/hero";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "E-com" },
		{
			name: "E-com fast and reliable",
			content: "get your exclusive deals and benefits",
		},
	];
}

export default function Home() {
	return (
		<div className="flex flex-col pt-10">
			<HeroSection />
			<div
				id="hook"
				className="flex-1 flex flex-col items-center justify-center gap-4 text-center md:my-32 my-10">
				<HookSection
					title="Start now and get your benefits!"
					description="Join our community today and enjoy exclusive deals, special offers, and premium benefits that are available only to our valued members who trust us!"
				/>
				<HookSection
					title="Watch films without buffering!"
					description="Experience seamless streaming with our high-speed internet packages, designed to keep you connected and entertained without interruptions. Say goodbye to buffering and hello to endless entertainment!"
				/>
				<HookSection
					title="Enjoy your gaming without lag!"
					description="Level up your gaming experience with our high-speed internet packages, designed to keep you connected and competitive without interruptions. Say goodbye to lag and hello to seamless gaming!"
				/>
			</div>
			<PromoList />
			<ProductGroup />
		</div>
	);
}
