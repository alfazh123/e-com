export interface UserProps {
	id?: string;
	name: string;
	phoneNumber: string;
	email: string;
	history: HistoryPurchaseProps[];
	langgananAktif: {
		pulsa: number;
		data: number;
		masaAktif: string;
	};
}

export interface HistoryPurchaseProps {
	itemName: string;
	itemType: "pulsa" | "data";
	price: number;
	date: string;
	duration: number | null;
	capacity: number;
	idItem: string;
}

export interface PromoProps {
	promoName: string;
	promoCode: string;
	description: string;
	discountPercentage: number;
	validUntil: string;
	image?: string;
}

export interface ProductProps {
	id: string;
	itemName: string;
	itemPrice: number;
	itemType: "pulsa" | "data";
	purchaseDate: string;
	capacity: number;
	duration: string | null;
}
