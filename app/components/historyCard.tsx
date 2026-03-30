import { useState } from "react";
import type { useFormat } from "~/func/useFormat"
import type { HistoryPurchaseProps } from "~/type"

export default function HistoryCard({
    item, formatter
}: {
    item: HistoryPurchaseProps,
    formatter: ReturnType<typeof useFormat>
}) {

    return (
        <div
            className="border rounded-lg p-4 shadow flex justify-between items-center">
            <div>
                <p className="text-sm">Pembelian {item.itemType}</p>
                <h2 className="text-lg font-semibold">{item.itemName}</h2>
                <p className="text-gray-500">
                    {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}
                    {"-"}
                    {new Date(item.date).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
            <div>
                <p className="text-lg font-semibold">
                    {formatter.formatter.format(item.price)}
                </p>
            </div>
        </div>
    )
}