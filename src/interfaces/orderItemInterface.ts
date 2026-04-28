export interface OrderItem {
  created_at: string;
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  order_id: string;
}