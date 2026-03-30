import { useEffect } from "react";
import HistoryCard from "~/components/historyCard";
import { useFormat } from "~/func/useFormat";
import { useUser } from "~/func/useUser";

export default function History() {
	const user = useUser();
	const formatter = useFormat();

	useEffect(() => {
		const id = JSON.parse(localStorage.getItem("user") || "null")?.id;
		user.fetchUserData(id);
	}, []);

	return (
		<div className="flex flex-col min-h-[50vh] mt-30 max-w-6xl mx-auto md:px-8 px-4 gap-5">
			<h1 className="text-2xl font-bold mb-4">History Page</h1>

			{user.user?.history && user.user.history.length > 0 ? (
				<div className="flex flex-col gap-4">
					{user.user.history.map((item, index) => (
						<HistoryCard key={index} item={item} formatter={formatter} />
					))}
				</div>
			) : (
				<p>No purchase history available.</p>
			)}
		</div>
	);
}
