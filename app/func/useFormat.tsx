import { useMemo, useState } from "react";

export const useFormat = () => {
    const formatter = useMemo(
            () =>
                new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                }),
            [],
        );

    const [paymentMethod, setPaymentMethod] = useState<string>("");

    return {
        formatter,
        paymentMethod,
        setPaymentMethod,

    };
}