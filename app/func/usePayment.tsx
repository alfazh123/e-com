import { useNavigate } from "react-router";
import type { HistoryPurchaseProps, ProductProps, UserProps } from "~/type";

export const usePayment = () => {
    const navigate = useNavigate();

    const handleBuyPulsa = async (
			paymentMethod: string,
			user: UserProps,
			product: ProductProps,
		) => {
			if (!paymentMethod) {
				alert("Pilih metode pembayaran terlebih dahulu.");
				return;
			}

			if (!user?.id) {
				alert("Data pengguna belum siap. Coba beberapa saat lagi.");
				return;
			}

			if (!product) {
				alert("Data produk tidak ditemukan.");
				return;
			}

			try {
				const response = await fetch(`http://localhost:3000/users/${user.id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						langgananAktif: {
							...user.langgananAktif,
							pulsa:
								(user.langgananAktif?.pulsa || 0) + (product.capacity || 0),
						},
						history: [
							...(user.history || []),
							{
								itemName: product.itemName,
								itemType: product.itemType,
								price: product.itemPrice,
								date: new Date().toISOString(),
								duration: product.duration ? parseInt(product.duration) : null,
								capacity: product.capacity,
								idItem: product.id,
							} as HistoryPurchaseProps,
						],
					}),
				});

				if (response.ok) {
					navigate("/profile");
				} else {
					console.error("Gagal melakukan pembelian pulsa.");
				}
			} catch (error) {
				console.error("Error during pulsa purchase:", error);
				alert("Terjadi kesalahan saat melakukan pembelian pulsa.");
			}
		};

		const handleBuyData = async (
			paymentMethod: string,
			user: UserProps,
			product: ProductProps,
		) => {
			if (!paymentMethod) {
				alert("Pilih metode pembayaran terlebih dahulu.");
				return;
			}

			if (!user?.id) {
				alert("Data pengguna belum siap. Coba beberapa saat lagi.");
				return;
			}

			if (!product) {
				alert("Data produk tidak ditemukan.");
				return;
			}

			try {
				const response = await fetch(`http://localhost:3000/users/${user.id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						langgananAktif: {
							...user.langgananAktif,
							pulsa:
								paymentMethod === "pulsa"
									? (user.langgananAktif?.pulsa || 0) - (product.itemPrice || 0)
									: user.langgananAktif?.pulsa || 0,
							data:
								paymentMethod === "data"
									? (user.langgananAktif?.data || 0) + (product.capacity || 0)
									: user.langgananAktif?.data || 0,
						},
						history: [
							...(user.history || []),
							{
								itemName: product.itemName,
								itemType: product.itemType,
								price: product.itemPrice,
								date: new Date().toISOString(),
								duration: product.duration ? parseInt(product.duration) : null,
								capacity: product.capacity,
								idItem: product.id,
							} as HistoryPurchaseProps,
						],
					}),
				});

				if (response.ok) {
					navigate("/profile");
				} else {
					console.error("Gagal melakukan pembelian pulsa.");
				}
			} catch (error) {
				console.error("Error during pulsa purchase:", error);
				alert("Terjadi kesalahan saat melakukan pembelian pulsa.");
			}
		};

    return { handleBuyPulsa, handleBuyData };
}