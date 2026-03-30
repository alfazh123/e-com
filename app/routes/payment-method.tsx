import { Breadcrumbs, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PaymentMethodsSelect, {
	PaymentResume,
} from "~/components/paymentMethodsSelect";
import { useFormat } from "~/func/useFormat";
import { usePayment } from "~/func/usePayment";
import type { ProductProps, UserProps } from "~/type";

export default function PaymentMethod() {
	const { id } = useParams();

	const [product, setProduct] = useState<ProductProps>({
		id: "",
		itemName: "",
		itemType: "pulsa",
		itemPrice: 0,
		purchaseDate: "",
		capacity: 0,
		duration: null,
	});
	const [user, setUser] = useState<UserProps>({
		id: "",
		name: "",
		phoneNumber: "",
		email: "",
		history: [],
		langgananAktif: {
			pulsa: 0,
			data: 0,
			masaAktif: "",
		},
	});

	const payment = usePayment();
	const formatter = useFormat();

	useEffect(() => {
		const controller = new AbortController();

		const fetchProduct = async () => {
			try {
				const response = await fetch(`http://localhost:3000/items/${id}`, {
					signal: controller.signal,
				});

				if (!response.ok) {
					console.error("Gagal mengambil data produk.");
					return;
				}

				const data = (await response.json()) as ProductProps;
				setProduct(data);
			} catch (fetchError) {
				if ((fetchError as Error).name !== "AbortError") {
					console.error("Terjadi kesalahan saat mengambil data produk.");
				}
			}

			const userLocal = JSON.parse(
				localStorage.getItem("user") || "null",
			) as UserProps | null;
			console.log("User localStorage:", userLocal);

			try {
				if (userLocal) {
					const userResponse = await fetch(
						`http://localhost:3000/users/${userLocal.id}`,
						{
							signal: controller.signal,
						},
					);

					if (userResponse.ok) {
						const userData = (await userResponse.json()) as UserProps;
						setUser(userData);
					} else {
						console.error("Gagal mengambil data pengguna.");
					}
				}
			} catch (fetchError) {
				if ((fetchError as Error).name !== "AbortError") {
					console.error("Terjadi kesalahan saat mengambil data pengguna.");
				}
			}
		};

		fetchProduct();

		return () => {
			setProduct({
				id: "",
				itemName: "",
				itemType: "pulsa",
				itemPrice: 0,
				purchaseDate: "",
				capacity: 0,
				duration: null,
			});
		};
	}, []);

	if (product.id === "") {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<Typography variant="h6" component="div">
					<CircularProgress size={100} color="inherit" />
				</Typography>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-center min-h-[50vh] mt-30 max-w-6xl mx-auto md:px-8 px-4 gap-5">
			<Breadcrumbs aria-label="breadcrumb">
				<a href="/">Home</a>
				<a href="/products">Products</a>
				<a href={`/product-detail/${product?.id}`}>Beli</a>
				<Typography sx={{ color: "text.primary" }}>
					Select Payment {product?.itemType}
				</Typography>
			</Breadcrumbs>

			<div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 mb-20">
				<PaymentMethodsSelect
					product={product}
					user={user}
					paymentMethod={formatter.paymentMethod}
					formatter={formatter}
				/>

				<PaymentResume
					product={product}
					formatter={formatter}
					payment={payment}
					user={user}
				/>
			</div>
		</div>
	);
}
