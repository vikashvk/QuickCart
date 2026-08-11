export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    /** price expressed in seconds — 1hr = 3600 */
    priceSeconds: number;
    imageUrl: string;
    inStock: boolean;
}

export interface InventoryStatus {
    productId: string;
    available: number;
}

export interface CartLine {
    product: Product;
    qty: number;
}
// old Order model
// export interface Order {
//     id?: string;
//     orderNumber?: string;
//     skuCode: string;
//     price: number;
//     quantity: number;
//     userDetails: UserDetails
// }
// export interface UserDetails {
//     email: string;
//     firstName: string;
//     lastName: string;
// }
export interface Order {
    id: string;
    lines: { productId: string; qty: number; priceSeconds: number }[];
    totalSeconds: number;
    createdAt: string;
}

export interface TimeCredit {
    /** seconds remaining today, resets to DAILY_ALLOWANCE at midnight */
    remainingSeconds: number;
    dailyAllowanceSeconds: number;
    resetsAt: string; // ISO timestamp of next reset
}