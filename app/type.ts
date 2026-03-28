interface UserType {
    name: string;
    phoneNumber: string;
    email: string;
    history: HistoryPurchaseType[];
}

interface HistoryPurchaseType {
    itemName: string;
    itemType: "pulsa" | "data";
    price: number;
    date: string;
    duration: number | null;
    capacity: string;
}

interface PromoType {
    promoName: string,
    promoCode: string,
    description: string,
    discountPercentage: number,
    validUntil: string,
    image?: string
}

interface ProductType {
    id: string,
    itemName: string,
    itemPrice: number,
    itemType: "pulsa" | "data",
    purchaseDate: string,
    capacity: number,
    duration: string | null
}

export type {
    UserType ,
    HistoryPurchaseType,
    PromoType,
    ProductType
}