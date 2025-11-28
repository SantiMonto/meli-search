export interface CartItem {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail: string;
  quantity: number;
  free_shipping: boolean;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}
