import { Breadcrumbs, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import type { ProductProps } from "~/type";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        };

        fetchProduct();

        return () => {
            controller.abort();
        };
    }, [id]);

    if (!id) {
        return (
            <div className="flex flex-col justify-center mt-30 max-w-6xl mx-auto md:px-8 px-4">
                ID produk tidak ditemukan.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col h-[50vh] justify-center mt-30 max-w-6xl mx-auto md:px-8 px-4 gap-3">
                <p className="text-gray-500">Memuat detail produk...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col justify-center mt-30 max-w-6xl mx-auto md:px-8 px-4 gap-4">
                <p className="text-red-500">{error ?? "Produk tidak ditemukan."}</p>
                <Link
                    to="/products"
                    className="w-fit bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                    Kembali ke Produk
                </Link>
            </div>
        );
    }

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
                <Typography sx={{ color: 'text.primary' }}>Beli {product.itemType}</Typography>
            </Breadcrumbs>

            <div className="border rounded-xl p-6 shadow-md bg-white flex md:flex-row flex-col justify-between">
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl font-bold">{product.itemName}</h1>
                    <p className="text-gray-600">Tipe: {product.itemType}</p>
                    <p className="text-gray-600">Kapasitas: {product.capacity}</p>
                    <p className="text-gray-600">Durasi: {product.duration ?? "N/A"}</p>
                </div>

                <div className="flex flex-col gap-3 justify-end items-end">
                    <p className="text-xl font-semibold text-orange-600">
                        {formatter.format(product.itemPrice)}
                    </p>
                    <Link
                        to={`/payment-method/${product.id}`}
                        className="md:w-full h-fit text-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                    >
                        Beli
                    </Link>
                </div>
            </div>

        </div>
    );
}