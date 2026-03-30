import { useState } from "react";
import type { useFormat } from "~/func/useFormat";
import type { usePayment } from "~/func/usePayment";
import type { ProductProps, UserProps } from "~/type";

export default function PaymentMethodsSelect({product, user, paymentMethod, formatter}: {product: ProductProps, user: UserProps, paymentMethod: string, formatter: ReturnType<typeof useFormat>}) {
    const paymentMethods =
		product?.itemType === "pulsa"
			? [
					{ id: "gopay", name: "GoPay" },
					{ id: "dana", name: "Dana" },
					{ id: "ovo", name: "OVO" },
					{ id: "shopeepay", name: "ShopeePay" },
					{ id: "qris", name: "QRIS" },
				]
			: [
					{ id: "pulsa", name: "Pulsa" },
					{ id: "gopay", name: "GoPay" },
					{ id: "dana", name: "Dana" },
					{ id: "ovo", name: "OVO" },
					{ id: "shopeepay", name: "ShopeePay" },
					{ id: "qris", name: "QRIS" },
				];

    const handlePaymentMethodChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		formatter.setPaymentMethod((event.target as HTMLInputElement).value);
	};

    return (
			<div className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">Pilih Metode Pembayaran</h2>
				<div className="flex- flex-col">
					{paymentMethods.map((method) => (
						<div
							key={method.id}
							className={`flex items-center gap-4 mb-4 p-4 border rounded-lg hover:bg-gray-100 transition-colors ${method.id === "pulsa" && (!user?.langgananAktif || user.langgananAktif.pulsa <= product.itemPrice) ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
							<input
								type="radio"
								name="paymentMethod"
								id={method.id}
								value={method.id}
								disabled={
									method.id === "pulsa" &&
									(!user?.langgananAktif ||
										user.langgananAktif.pulsa <= product.itemPrice)
								}
								checked={paymentMethod === method.id}
								onChange={handlePaymentMethodChange}
								className={`form-radio h-5 w-5 text-orange-500`}
							/>
							<label htmlFor={method.id} className="text-lg">
								{method.name}
							</label>
							{method.id === "pulsa" && product && (
								<span className="ml-auto font-bold text-orange-600">
									{formatter.formatter.format(user?.langgananAktif?.pulsa || 0)}
								</span>
							)}
						</div>
					))}
				</div>
			</div>
		);
}

export function PaymentResume({product, formatter, payment, user}: {product: ProductProps, formatter: ReturnType<typeof useFormat>, payment: ReturnType<typeof usePayment>, user: UserProps }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Ringkasan Pembayaran</h2>
            <div className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between mb-2">
                    <span>{product?.itemName}</span>
                    <span className="font-bold">
                        {formatter.formatter.format(product?.itemPrice || 0)}
                    </span>
                </div>
                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="font-bold text-orange-600">
                        {formatter.formatter.format(product?.itemPrice || 0)}
                    </span>
                </div>
                <button
                    type="submit"
                    onClick={() => {
                        product?.itemType === "pulsa"
                            ? payment.handleBuyPulsa(
                                    formatter.paymentMethod,
                                    user,
                                    product,
                                )
                            : payment.handleBuyData(
                                    formatter.paymentMethod,
                                    user,
                                    product,
                                );
                    }}
                    disabled={!formatter.paymentMethod || !user || !product}
                    className={`mt-4 text-white font-bold py-2 px-4 rounded ${formatter.paymentMethod === "" ? "cursor-not-allowed opacity-50 bg-orange-500" : "cursor-pointer bg-orange-500 hover:bg-orange-600"}`}>
                    Bayar menggunakan {formatter.paymentMethod}
                </button>
            </div>
        </div>
    )
}