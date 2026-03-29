import { Breadcrumbs, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import type { ProductProps, UserProps } from "~/type";

export default function PaymentMethod() {
    const { id } = useParams();

    const [product, setProduct] = useState<ProductProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserProps | null>(null);

    const [paymentMethod, setPaymentMethod] = useState<string>("");

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod((event.target as HTMLInputElement).value);
    };

    const formatter = useMemo(
        () =>
            new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }),
        []
    );

    useEffect(() => {
        if (!id) {
            setError("ID produk tidak ditemukan.");
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:3000/items/${id}`, {
                    signal: controller.signal,
                });

                if (response.status === 404) {
                    setProduct(null);
                    setError("Produk tidak ditemukan.");
                    return;
                }

                if (!response.ok) {
                    setProduct(null);
                    setError("Gagal mengambil data produk.");
                    return;
                }

                const data = (await response.json()) as ProductProps;
                setProduct(data);
            } catch (fetchError) {
                if ((fetchError as Error).name !== "AbortError") {
                    setProduct(null);
                    setError("Terjadi kesalahan saat mengambil data produk.");
                }
            } finally {
                setIsLoading(false);
            }

            const userLocal = JSON.parse(localStorage.getItem("user") || "null") as UserProps | null;
            console.log("User localStorage:", userLocal);

            try {
                if (userLocal) {
                    const userResponse = await fetch(`http://localhost:3000/users/${userLocal.id}`, {
                        signal: controller.signal,
                    });

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
            controller.abort();
        };
    }, [id]);

    const paymentMethods = [
        { id: "pulsa", name: "Pulsa" },
        { id: "gopay", name: "GoPay" },
        { id: "dana", name: "Dana" },
        { id: "ovo", name: "OVO" },
        { id: "shopeepay", name: "ShopeePay" },
        { id: "qris", name: "QRIS" },
    ];

    return (
        <div className="flex flex-col justify-center min-h-[50vh] mt-30 max-w-6xl mx-auto md:px-8 px-4 gap-5">
            <Breadcrumbs aria-label="breadcrumb">
                <a href="/">
                    Home
                </a>
                <a
                    href="/products"
                >
                    Products
                </a>
                <a
                    href={`/product-detail/${product?.id}`}
                >
                    Beli
                </a>
                <Typography sx={{ color: 'text.primary' }}>Select Payment {product?.itemType}</Typography>
            </Breadcrumbs>


            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 mb-20">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Pilih Metode Pembayaran</h2>
                    <div className="flex- flex-col">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className={`flex items-center gap-4 mb-4 p-4 border rounded-lg hover:bg-gray-100 transition-colors ${method.id === "pulsa" && (!user?.langgananAktif || user.langgananAktif.pulsa <= 0) ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id={method.id}
                                    value={method.id}
                                    disabled={method.id === "pulsa" && (!user?.langgananAktif || user.langgananAktif.pulsa <= 0)}
                                    checked={paymentMethod === method.id}
                                    onChange={handlePaymentMethodChange}
                                    className={`form-radio h-5 w-5 text-orange-500`}
                                />
                                <label htmlFor={method.id} className="text-lg">
                                    {method.name}
                                </label>
                                {method.id === "pulsa" && product && (
                                    <span className="ml-auto font-bold text-orange-600">
                                        {formatter.format(user?.langgananAktif?.pulsa || 0)}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Ringkasan Pembayaran</h2>
                    <div className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between mb-2">
                            <span>{product?.itemName}</span>
                            <span className="font-bold">
                                {formatter.format(product?.itemPrice || 0)}
                            </span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="font-bold text-orange-600">
                                {formatter.format(product?.itemPrice || 0)}
                            </span>
                        </div>
                        <button type="submit" className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                            Bayar menggunakan {paymentMethod}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}