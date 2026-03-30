export default function HeroSection() {
    return (
			<section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 w-full max-w-6xl mx-auto">
				<div className="container mx-auto px-6 lg:px-12">
					<div className="flex flex-col lg:flex-row justify-center md:h-full h-screen items-center gap-12">
						<div className="w-full lg:w-1/2 text-center lg:text-left">
							<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
								Get your new
								<span className="text-orange-500"> Standard</span> <br /> with
								<span className="text-orange-500"> E-com</span>
							</h1>
							<p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
								Temukan kemudahan dalam mengisi pulsa, beli paket internet,
								hingga akses hiburan favoritmu hanya dalam satu aplikasi.
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<a
									href="#shop"
									className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
									Belanja Sekarang
								</a>
								<a
									href="#hook"
									className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-colors">
									Pelajari Fitur
								</a>
							</div>
						</div>

						<img
							src="/logo.png"
							alt="Hero Image"
							className="w-full lg:w-1/2 h-auto object-cover md:flex hidden"
						/>
						{/* <div className="md:block hidden w-full lg:w-1/2 relative bg-slate-200 aspect-square"></div> */}
					</div>
				</div>
			</section>
		);
}