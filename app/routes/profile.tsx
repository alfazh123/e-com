import { useEffect, useState } from "react";
import { useFormat } from "~/func/useFormat";
import type { UserProps } from "~/type";

export default function Profile() {
	const [user, setUser] = useState<UserProps | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const userLocal = JSON.parse(
				localStorage.getItem("user") || "null",
			) as UserProps | null;
			try {
				const response = await fetch(
					`http://localhost:3000/users/${userLocal?.id}`,
				);
				const userData = await response.json();
				localStorage.setItem("user", JSON.stringify(userData));
				setUser(userData);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchUser();

		return () => {
			setUser(null);
		};
	}, []);

	const initial = user?.name
		? user.name
				.split(" ")
				.map((part) => part.charAt(0).toUpperCase())
				.join("")
		: "U";

	return (
		<div className="flex flex-col min-h-[50vh] mt-30 max-w-6xl mx-auto md:px-8 px-4 gap-5">
			<div>
				<div className="flex items-center gap-4">
					<span className="grid h-20 w-20 text-2xl m-0 place-items-center rounded-full bg-linear-to-br from-sky-400 to-indigo-500 font-bold text-slate-100 shadow-lg transition-transform group-hover:scale-105">
						{initial}
					</span>
					<div className="">
						<h1 className="text-2xl font-bold">{user?.name}</h1>
						<p className="text-gray-600">{user?.phoneNumber}</p>
					</div>
				</div>

				<div className="mt-6">
					<h2 className="text-xl font-semibold mb-4">Status Layanan</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="p-4 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between">
							<div>
								<h3 className="font-semibold text-gray-800">Pulsa</h3>
								<p className="text-sm text-gray-600 mt-2">
									<span className="font-semibold text-2xl">
										{user?.langgananAktif.pulsa || 0}
									</span>
								</p>
							</div>
							<a href="/products" className="text-3xl font-semibold">
								+
							</a>
						</div>
						<div className="p-4 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between">
							<div>
								<h3 className="font-semibold text-gray-800">Data</h3>
								<p className="text-sm text-gray-600 mt-2">
									<span className="font-semibold text-2xl">
										{user?.langgananAktif.data || 0}MB
									</span>
								</p>
							</div>
							<a href="/products" className="text-3xl font-semibold">
								+
							</a>
						</div>
						<div className="p-4 md:col-span-2 col-span-1 border border-gray-300 rounded-lg bg-gray-50 justify-between flex items-center">
							<h3 className="font-semibold text-gray-800 text-2xl">
								Masa Aktif
							</h3>
							<p className="text-sm text-gray-600 mt-2">
								<span className="font-semibold text-2xl">
									{new Date(
										user?.langgananAktif.masaAktif || "",
									).toLocaleDateString("id-ID", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
