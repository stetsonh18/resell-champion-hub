export interface Product {
  id: string;
  user_id: string;
  name: string;
  sku: string;
  category_id: string | null;
  categories?: {
    name: string;
  };
  purchase_price: number;
  target_price: number;
  quantity: number;
  condition: string;
  notes: string | null;
  created_at: string;
  last_updated: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  description: string;
}

export interface Platform {
  id: string;
  user_id: string;
  name: string;
  url: string;
  fees_percentage: number;
}

export interface Store {
  id: string;
  user_id: string;
  platform_id: string;
  name: string;
  url: string;
  api_key: string;
}

export interface Sale {
  id: string;
  user_id: string;
  product_id: string;
  platform_id: string;
  store_id: string;
  sale_price: number;
  fees: number;
  shipping_cost: number;
  net_profit: number;
  sale_date: string;
  order_number: string;
  tracking_number: string | null;
}

export interface Shipment {
  id: string;
  user_id: string;
  sale_id: string;
  tracking_number: string;
  carrier: string;
  status: string;
  shipped_date: string;
  estimated_delivery: string;
}

export interface Return {
  id: string;
  user_id: string;
  sale_id: string;
  reason: string;
  status: string;
  return_tracking: string;
  refund_amount: number;
  initiated_date: string;
  completed_date: string;
}

export interface Expense {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  receipt_url: string;
}