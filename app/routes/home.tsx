import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import PromoList from "~/components/promoList";
import ProductGroup from "~/components/productGroup";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return (
		<div className="flex flex-col max-w-6xl mx-auto pt-10">
			<PromoList />
			<ProductGroup />
			<div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
				{/* <h1 className="text-4xl font-bold tracking-tight text-slate-900">
					Welcome to E-Commerce
				</h1>
				<p className="text-lg text-slate-700">
					Discover a world of products at your fingertips. Shop now and
					experience the best online shopping experience!
				</p> */}
			</div>
			<footer className="py-4 text-center text-sm text-slate-500">
				&copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
			</footer>
		</div>
	);
}
