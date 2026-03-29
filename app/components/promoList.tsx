import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import type { PromoProps } from "~/type";

export default function PromoList() {
	const [promo, setPromo] = useState<PromoProps[]>([]);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const fetchPromo = async () => {
			try {
				const response = await fetch("http://localhost:3000/promotions");
				if (response.ok) {
					const data = await response.json();
					setPromo(data);
				} else {
					console.error("Failed to fetch promotions");
				}
			} catch (error) {
				console.error("An error occurred while fetching promotions:", error);
			}
		};

		fetchPromo();

		return () => {
			setPromo([]);
		};
	}, []);

	useEffect(() => {
		if (promo.length === 0) return;
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % promo.length);
		}, 5000);
		return () => clearInterval(timer);
	}, [promo.length]);

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % promo.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + promo.length) % promo.length);
	};

	return (
		<div id="shop">
			<div className="relative w-full max-w-4xl mx-auto sm:px-0 px-4">
				{/* Carousel Container */}
				<div className="relative bg-gray-100 rounded-lg overflow-hidden h-96">
					{promo.length > 0 ? (
						<>
							{/* Slides */}
							<div className="relative h-full">
								{promo.map((item, index) => (
									<div
										key={index}
										className={`absolute w-full h-full transition-opacity duration-500 ${
											index === currentSlide ? "opacity-100" : "opacity-0"
										}`}>
										<img
											src={item.image ? item.image : "/promo-placeholder.jpg"}
											alt={item.promoCode}
											className="w-full h-full object-cover"
										/>
										<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
											<div className="text-center text-white">
												<h2 className="text-3xl font-bold mb-2">
													{item.description}
												</h2>
												<p className="text-lg">{item.description}</p>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Previous Button */}
							<button
								onClick={prevSlide}
								className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 z-10">
								&#10094;
							</button>

							{/* Next Button */}
							<button
								onClick={nextSlide}
								className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 z-10">
								&#10095;
							</button>

							{/* Dots Navigation */}
							<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
								{promo.map((_, index) => (
									<button
										key={index}
										onClick={() => goToSlide(index)}
										className={`w-3 h-3 rounded-full transition-colors ${
											index === currentSlide
												? "bg-white"
												: "bg-gray-400 hover:bg-gray-500"
										}`}>
										:
									</button>
								))}
							</div>
						</>
					) : (
						<div className="w-full h-full flex items-center justify-center">
							<CircularProgress size={100} color="inherit" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
